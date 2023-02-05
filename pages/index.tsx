//@ts-nocheck
import { signIn, useSession } from "next-auth/react";
import useSwr from "swr";
import { useRef } from "react";

export default function Home() {
  const user = useSession().data?.user;
  const { data: cars } = useSwr(user ? `/api/db/cars` : null, (url) =>
    fetch(url).then((res) => res.json())
  );
  const { data: maintainanceSchedule } = useSwr(
    user ? `/api/db/maintainence` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  const newCarName = useRef<HTMLInputElement>(null);
  const newMaintainanceItemDescription = useRef<HTMLInputElement>(null);
  const newMaintainanceItemDate = useRef<HTMLInputElement>(null);
  const newMaintainanceItemCost = useRef<HTMLInputElement>(null);
  const newMaintainanceItemCarId = useRef<HTMLInputElement>(null);

  if (user) {
    return (
      <main className="container px-2 sm:px-4 lg:px-8 space-y-6 py-20 min-h-[66.66vh] mx-auto">
        <h3 className="leading-loose space-y-4 !mb-0">
          <span>Welcome back, {user.name} 👋!</span>
        </h3>
        <div className="flex flex-row gap-4 flex-wrap my-8 w-full">
          <div className="grid sm:grid-rows-3 sm:grid-flow-col grid-flow-row gap-4 min-w-[50%]">
            {cars?.map((car) => (
              <div
                key={car.id}
                className="text-2xl font-bold rounded bg-slate-800 p-4"
              >
                {car.name}
              </div>
            ))}
          </div>

          <div className="flex flex-col bg-slate-800 p-4 space-y-4 rounded min-w-[33%]">
            <h4 className="text-2xl font-bold !my-0">Add a car</h4>
            <form
              className="flex flex-col space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                fetch("/api/db/cars", {
                  method: "POST",
                  body: JSON.stringify({ name: newCarName.current?.value }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then(() => {
                  window.location.reload();
                });
              }}
            >
              <div className="flex-col flex space-y-1 w-max">
                <label htmlFor="carName" className="text-sm">
                  What{"'"}s the name of your car?
                </label>
                <input
                  type="text"
                  id="carName"
                  ref={newCarName}
                  placeholder="Mercedes-Benz C-Class"
                  className="border-2 border-indigo-600 rounded p-2 text-black"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 border-2 border-indigo-600 bg-indigo-600 hover:bg-transparent rounded transition-all"
              >
                Add car
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-row gap-4 flex-wrap my-8 w-full">
          <div className="grid sm:grid-rows-3 sm:grid-flow-col grid-flow-row gap-4 min-w-[50%]">
            {maintainanceSchedule?.map((item) => (
              <div key={item.id} className="rounded bg-slate-800 p-4">
                <h3 className="text-2xl font-bold">{item.description}</h3>
                <p className="text-sm">
                  {new Intl.DateTimeFormat("en-in").format(new Date(item.date))}
                </p>
                <p className="text-sm">{item.cost}</p>
                <p className="text-sm">{item.car.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col bg-slate-800 p-4 space-y-4 rounded min-w-[33%]">
            <h4 className="text-2xl font-bold !my-0">
              Add a maintainance item
            </h4>
            <form
              className="flex flex-col space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                fetch("/api/db/maintainence", {
                  method: "POST",
                  body: JSON.stringify({
                    description: newMaintainanceItemDescription.current?.value,
                    date: newMaintainanceItemDate.current?.value,
                    cost: newMaintainanceItemCost.current?.value,
                    car: {
                      connect: {
                        id: newMaintainanceItemCarId.current?.value,
                      },
                    },
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then(() => {
                  window.location.reload();
                });
              }}
            >
              <div className="flex-col flex space-y-1 w-max">
                <label htmlFor="visitName" className="text-sm">
                  What{"'"}s the reason for the maintaince?
                </label>
                <input
                  type="text"
                  id="visitName"
                  ref={newMaintainanceItemDescription}
                  placeholder="Oil Change"
                  className="border-2 border-indigo-600 rounded p-2 text-black"
                />
              </div>
              <div className="flex-col flex space-y-1 w-max">
                <label htmlFor="date" className="text-sm">
                  When is the next maintaince?
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  ref={newMaintainanceItemDate}
                  placeholder="Date"
                  className="border-2 border-indigo-600 rounded p-2 text-black"
                />
              </div>
              <div className="flex-col flex space-y-1 w-max">
                <label htmlFor="cost" className="text-sm">
                  How much does it cost?
                </label>
                <input
                  type="text"
                  id="cost"
                  ref={newMaintainanceItemCost}
                  placeholder="25$"
                  className="border-2 border-indigo-600 rounded p-2 text-black"
                />
              </div>
              <div className="flex-col flex space-y-1 w-max">
                <label htmlFor="cars" className="text-sm">
                  Which car is it for?
                </label>
                <select
                  id="cars"
                  name="cars"
                  ref={newMaintainanceItemCarId}
                  title="cars"
                  className="border-2 border-indigo-600 rounded p-2 text-black"
                >
                  {cars?.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="py-2 px-4 border-2 border-indigo-600 bg-indigo-600 hover:bg-transparent rounded transition-all"
              >
                Add maintainance item
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container flex items-center justify-center space-y-6  text-center flex-col py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 min-h-[66.66vh]">
      <h1 className="leading-loose flex flex-col justify-center items-center space-y-4 !mb-0">
        <span>Remembering car maintainance schedules is hard.</span>
        <span className="text-4xl font-bold bg-indigo-600 w-max p-2">
          We get it.
        </span>
      </h1>
      <p>
        We help you keep track of your car{"'"}s maintenance schedule and remind
        you, so you don{"'"}t have to.
      </p>
      <div className="flex flex-wrap items-center justify-center">
        {[
          {
            name: "Help me remember!",
            onclick: () => signIn("auth0"),
            primary: true,
          },
          {
            name: "HELP ME REMEMBER BUT IN CAPS!",
            onclick: () => signIn("auth0"),
            primary: false,
          },
        ].map((item) => (
          <button
            type="button"
            className={`py-2 px-4 border-2 border-indigo-600 m-3 ${
              item.primary
                ? "bg-indigo-600 hover:bg-transparent"
                : "hover:bg-indigo-600"
            } rounded transition-all`}
            key={encodeURIComponent(item.name)}
            onClick={item.onclick}
          >
            {item.name}
          </button>
        ))}
      </div>
    </main>
  );
}

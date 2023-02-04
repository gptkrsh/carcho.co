"use client";

import Dashboard from "@/components/Dashboard";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const user = useSession().data?.user;

  if (user) return <Dashboard />;

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
            onclick: () => signIn('auth0'),
            primary: true,
          },
          {
            name: "HELP ME REMEMBER BUT IN CAPS!",
            onclick: () => signIn('auth0'),
            primary: false,
          },
        ].map((item) => (
            <button
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

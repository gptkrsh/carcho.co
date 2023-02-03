"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Team", href: "#" },
  { name: "Projects", href: "#" },
  { name: "Calendar", href: "#" },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "/api/auth/logout" },
];

export default function Navbar() {
  const { user } = useUser();

  return (
    <Disclosure as="nav" className="bg-slate-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <Link href="/" className="flex-shrink-0">
                  <TruckIcon className="h-8 w-8" />
                </Link>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name.toLowerCase()}
                        href={item.href}
                        className="rounded px-3 py-2 text-sm font-medium hover:bg-slate-700"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded border border-transparent bg-slate-700 py-2 pl-10 pr-3 leading-5 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded p-2 hover:bg-slate-700">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  {user ? (
                    <>
                      <button
                        type="button"
                        className="flex-shrink-0 rounded-full bg-slate-800 p-1"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full bg-slate-800 text-sm">
                            <span className="sr-only">Open user menu</span>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="rounded-full !my-0"
                              src={user.picture || `https://api.dicebear.com/5.x/thumbs/svg?flip=true&seed=${user.name ?? user.email ?? ''}`}
                              alt=""
                              height={32}
                              width={32}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-slate-800 py-1 shadow-lg">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name.toLowerCase()}>
                                {({ active }) => (
                                  <Link
                                    href={item.href}
                                    className={`${
                                      active ? "bg-slate-700" : ""
                                    } block px-4 py-2 text-sm`}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <Link
                      href="/api/auth/login"
                      className="flex justify-between items-center rounded px-3 py-2 text-sm font-medium hover:bg-slate-700"
                    >
                      Login
                      <ArrowLeftOnRectangleIcon className="h-8 w-8" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name.toLowerCase()}
                  as={Link}
                  href={item.href}
                  className="block rounded px-3 py-2 text-base font-medium hover:bg-slate-700"
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              <hr className="border-slate-700" />

              {user ? (
                <>
                  <div className="border-t border-slate-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <Image
                          className="rounded-full"
                          src={user.picture || `https://api.dicebear.com/5.x/thumbs/svg?flip=true&seed=${user.name ?? user.email ?? ''}`}
                          alt=""
                          height={40}
                          width={40}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium">Tom Cook</div>
                        <div className="text-sm font-medium">
                          tom@example.com
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-slate-800 p-1"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((items) => (
                        <Disclosure.Button
                          as={Link}
                          key={items.name.toLowerCase()}
                          href={items.href}
                          className="block rounded px-3 py-2 text-base font-medium hover:bg-slate-700"
                        >
                          {items.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Disclosure.Button
                  as={Link}
                  href="/api/auth/login"
                  className="flex justify-between items-center rounded px-3 py-2 text-base font-medium hover:bg-slate-700"
                >
                  <span>Login</span>
                  <ArrowLeftOnRectangleIcon className="h-8 w-8" />
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

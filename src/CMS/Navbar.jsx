import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/", current: false },
  { name: "Shop", to: "/shop", current: false },
  { name: "Categories", to: "/category", current: false },
  { name: "Cart", to: "/cart", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [searchData, setData] = useState("");
  const navigate = useNavigate();
  const Route = (e) => {
    e.preventDefault();
    if (searchData.trim() !== "") {
      navigate(`/search/${searchData.toLowerCase()}`);
      setData("");
    }
  };
  return (
    <Disclosure as="nav" className="bg-yellow-400 p-2 shadow-white">
      <div className="z-50 sticky top-0 mx-0 w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left section for logo */}
          <div className="flex w-full justify-between items-center">
            {/* Logo */}
            <div className="flex items-center pl-2">
              <Link
                to="/"
                className="group flex items-center gap-2 text-gray-900 hover:text-black transition-all"
              >
                <div className="bg-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-yellow-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
            14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 
            2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 
            14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 
            0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 
            .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                  Swegs
                </span>
              </Link>
            </div>



            {/* Mobile menu button */}
            <div className="flex  items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden bg-gray-600 text-white "
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block bg-gray-700"
                />
              </DisclosureButton>
            </div>
          </div>

          {/* Middle section for desktop: Navigation links and Search bar */}
          <div className="hidden sm:flex sm:ml-6 sm:items-center sm:justify-center">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-yellow-500 text-black"
                      : "text-black hover:bg-yellow-500",
                    "rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search bar */}
            <div className="ml-4 flex gap-1">
              <form onSubmit={Route}>
                <input
                  type="text"
                  value={searchData}
                  placeholder="Search..."
                  className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-600"
                  onChange={(e) => setData(e.target.value)}
                />
              </form>
              <button
                className="bg-white text-black p-1 rounded-lg"
                onClick={Route}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right section: Avatar, Login button */}
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3 z-50">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
                    className="h-10 w-10 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
            <Link to="/login">
              <button className="ml-4 bg-white text-red-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:text-gray-600">
                Login
              </button>
            </Link>
          </div> */}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              to={item.to}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-yellow-500 text-white"
                  : "text-white hover:bg-yellow-500",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}

          {/* Search bar for mobile view */}
          <div className="px-2 flex gap-2">
            <form onSubmit={Route} className="w-full">
              <input
                type="text"
                value={searchData}
                placeholder="Search..."
                className="rounded-md border border-gray-300 px-2 py-1 w-full focus:outline-none focus:border-gray-600"
                onChange={(e) => setData(e.target.value)}
              />
            </form>
            <button className="bg-white text-black p-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

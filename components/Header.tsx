import React from "react";
import Image from "next/image";
import { HomeIcon, ChevronDownIcon } from "@heroicons/react/solid";
import {
  GlobeIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
  BellIcon,
  ChatIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex bg-white px-4 py-2 shadow-sm sticky top-0 z-50 items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            src="https://links.papareact.com/fqy"
            layout="fill"
            objectFit="contain"
          />
        </Link>
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search box */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <SearchIcon className="w-6 h-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit..."
          className="outline-none flex-1 bg-transparent"
        />
        <button hidden type="submit" />
      </form>

      {/* Icons */}
      <div className="flex text-gray-500 space-x-2 mx-5 items-center hidden lg:inline-flex">
        <SparklesIcon className="icon lg:w-9 lg:p-1  lg:hover:bg-gray-100" />
        <GlobeIcon className="icon lg:w-9 lg:p-1 lg:hover:bg-gray-100" />
        <VideoCameraIcon className="icon lg:w-9 lg:p-1 lg:hover:bg-gray-100" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon lg:w-9 lg:p-1 lg:hover:bg-gray-100" />
        <BellIcon className="icon lg:w-9 lg:p-1 lg:hover:bg-gray-100" />
        <PlusIcon className="icon lg:w-9 lg:p-1 lg:hover:bg-gray-100" />
        <SpeakerphoneIcon className="icon lg:w-9 lg:p-1 lg:hover:bg-gray-100" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {/* Sign in / out button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden animate-pulse lg:flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 ring-2 rounded-full ring-green-300"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 karma</p>
          </div>
          <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400">Sign in</p>
        </div>
      )}
    </div>
  );
}

export default Header;

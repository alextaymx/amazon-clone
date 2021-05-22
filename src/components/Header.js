import React, { useState } from "react";
import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header({ products }) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const signOutPrompt = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut();
      console.log("You've signed out sucessfully.");
    } else {
      // Do nothing!
      console.log("You didn't sign out.");
    }
  };

  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 transform active:scale-90">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md flex-grow cursor-pointer">
          <div className="relative h-full w-6 flex-grow flex-shrink ">
            <input
              type="text"
              // placeholder="Search something"
              onFocus={(e) => setShowSearchResult(true)}
              onBlur={(e) => setShowSearchResult(false)}
              onChange={(e) => setSearchInput(e.target.value)}
              className="p-2 h-full w-full rounded-l-md focus:rounded-b-none focus:outline-none px-4"
            />
            {showSearchResult && (
              <div className="p-2 absolute w-full bg-white bottom-0 z-10 rounded-b-md transform translate-y-full max-h-96 h-auto overflow-auto my-scrollbar no-scrollbar">
                {products
                  .filter((product) => {
                    // return product.title.match(new RegExp(`\\b${searchInput}`, "i"));
                    return (
                      product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                      product.category.toLowerCase().includes(searchInput.toLowerCase())
                    );
                  })
                  .map((product, i) => (
                    <div className="p-2 border-b-2 w-full" key={i}>
                      <p className="font-medium">{product.title}</p>
                      <p className="offine text-gray-500 text-sm">{product.category}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <SearchIcon className="h-12 p-4 " />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={session ? signOutPrompt : signIn}
            className="link transform active:scale-90"
          >
            <p className="hover:underline">{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link transform active:scale-90">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center transform active:scale-90"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;

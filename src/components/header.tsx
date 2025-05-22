"use client";
import Image from "next/image";
import { User, Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("user-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

 if (!mounted) {
  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="animate-pulse h-6 w-1/2 bg-gray-200 rounded" />
    </nav>
  );
}

  return (
    <nav>
      <div className="bg-white flex gap-3 justify-around">
        <Image src="/images/sajilo.png" alt="ks" width={70} height={200} />

        <div className="text-center content-center">
          <ul className="text-black flex gap-4">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/products">
              <li>Products</li>
            </Link>
            <li>Categories</li>
          </ul>
        </div>

        <div className="items-center content-center text-black font-bold flex gap-4">
          <Search />
          <Link href="/wishlist">
            <Heart />
          </Link>
          <Link href="/cart">
            <ShoppingCart />
          </Link>

          <div className="relative" id="user-dropdown">
            <User
              className="cursor-pointer text-black"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black shadow-lg rounded-md border z-50">
                {isLoggedIn ? (
                  <>
                    <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">
                      My Account
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setIsLoggedIn(false);
                        setShowDropdown(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100">
                      Sign Up
                    </Link>
                    {/* <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Log Out</Link> */}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
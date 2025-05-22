"use client";
import Image from "next/image";
import { User, Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const [weather, setWeather] = useState<{ temp: number; icon: string; city:string; } | null>(null);
  
useEffect(() => {
  if (!navigator.geolocation) {
    console.error("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0c77bc37d498ea6079010021a6dde031`
        );
        const data = await res.json();
        const countryName = countries.getName(data.sys.country, "en"); 

        setWeather({
          temp: data.main.temp,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
         city: `${data.name}, ${countryName}`,
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    },
    (err) => {
      console.error("Geolocation error:", err);
    }
  );
}, []);

  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    setCurrentTime(now.toLocaleString("en-US", options));
  };

  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
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
<>
<div className="overflow-hidden whitespace-nowrap bg-gray-100 text-gray-700 text-sm">
  <div className="inline-block animate-marquee px-4">
    📅 {currentTime}
  </div>
</div>

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
  {weather && (
    <div className="flex items-center gap-1 text-sm">
      <Image src={weather.icon} alt="weather" width={30} height={30} />
       <span>{weather.temp.toFixed(1)}°C</span>
    </div>
  )}
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
    </>
  );
}
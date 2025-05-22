"use client";
import { products } from "@/lib/productData";
import { Heart, Search, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [sortOption, setSortOption] = useState("");

  const [showPopup, setShowPopup] = useState<string | false>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique category list from products
  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);
  // Filtered products based on search and category
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesSearch =
        searchQuery.trim() === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "LowToHigh") return a.price - b.price;
      if (sortOption === "HighToLow") return b.price - a.price;
      return 0; // Default: No sorting
    });

  // Category toggle handler
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Add to cart handler
  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const exists = cart.find((item: any) => item.id === product.id);

    const updatedCart = exists
      ? cart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowPopup(`${product.title} is added to cart!`);
  };

  function handleSearch(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white">
      <div className="bg-cyan-500 h-80 w-full flex items-center justify-center text-5xl font-bold">
        PRODUCTS
      </div>

      <h2 className="text-3xl text-red-600 text-bold mt-10">All Products</h2>
      <div className="flex gap-4 h-200">
        <div className="left w-[20%] border-gray-300 p-4 m-3">
          <div className="flex justify-between text-black ">
            <p>Filter</p>
            <button
              onClick={() => setSelectedCategories([])}
              className="text-blue-600 cursor-pointer"
            >
              Reset
            </button>
          </div>
          <p className="text-black p-2 text-xl">Search</p>
          <div className="flex text-black gap-2">
            <input
              className="text-black border-1 p-1 w-40 m-2"
              type="text"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="search hover:cursor-pointer"
              onClick={handleSearch}
            >
              <Search />
            </button>
          </div>

          <div className="categories text-black text-2xl font-medium">
            <p>Categories</p>
            <div>
              {categories.map((category) => (
                <div key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label>{category}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}

        <div className="right w-[80%] overflow-auto bg-amber-50 text-black p-5">
          <div className="flex justify-between ">
            <div>Showing {filteredProducts.length} Products</div>
            <div className="flex gap-1">
              <div className="p-2">Sort by:</div>
              <div>
                <select
                  className="w-full border border-gray-300 rounded p-2 text-black"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Featured</option>
                  <option value="LowToHigh">Price: Low to High</option>
                  <option value="HighToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-1">
              {filteredProducts.length === 0 ? (
                <div className="col-span-3 text-center text-red-600 text-6xl py-10">
                  No products found.
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-400 rounded-xl border-3 flex flex-col h-[500px] overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="upper-card relative w-full h-[350px] rounded-t-xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-3 left-3 flex justify-between w-full px-3">
                        <p className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          -25%
                        </p>
                        <Link href="/wishlist">
                          <Heart className="text-black bg-gray-300 p-2 w-10 h-10 rounded-full cursor-pointer" />
                        </Link>
                      </div>
                    </div>

                    {/* Lower Section */}
                    <div className="lower-card bg-amber-600 flex flex-col justify-between flex-grow">
                      <div className="Description flex justify-between px-4 pt-2">
                        <div className="text-black text-lg font-bold">
                          <p>{product.title}</p>
                          <p className="text-sm text-gray-600">
                            {product.brand}
                          </p>
                        </div>

                        <div className="text-red-600 text-right">
                          <p className="font-bold text-2xl">
                            Rs.{product.price.toFixed(2)}
                          </p>
                          <p className="text-gray-500 text-xs line-through">
                            Rs.{(product.price + 5).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {showPopup && (
                        <div className="fixed top-5 right-5 bg-green-500 w-[300px] text-center text-white px-4 py-2 rounded shadow-lg z-50">
                          {showPopup}
                        </div>
                      )}
                      <div className="cart px-4 pb-4 pt-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full cursor-pointer"
                        >
                          <div className="flex bg-orange-600 rounded-xl p-2 gap-2 text-white justify-center">
                            <ShoppingCart />
                            <span>Add To Cart</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

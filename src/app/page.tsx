"use client";
import Banner from "@/components/banner";
import Card from "@/components/card";
import { products } from "@/lib/productData";
import { useEffect, useState } from "react";


export default function Home() {
  const featuredProducts = products.slice(0, 3); // First 3 products

  const [showPopup, setShowPopup] = useState<string | false>(false);

useEffect(() => {
  if (showPopup) {
    const timer = setTimeout(() => setShowPopup(false), 5000);
    return () => clearTimeout(timer);
  }
}, [showPopup]);


  // Add to cart handler (same as in products/page.tsx)
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

  return (
    <>
      <div className="Banner">
        <Banner />
      </div>

      {showPopup && (
  <div className="fixed top-5 right-5 bg-green-500 w-[300px] text-center text-white px-4 py-2 rounded shadow-lg z-50">
    {showPopup}
  </div>
)}
      <div className="Featured bg-white">
        <h2 className="Title text-6xl text-red-600 p-4">Featured Products</h2>
        <div className="gap-4 gap-y-20 grid grid-cols-3 p-20">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}
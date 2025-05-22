// components/Card.tsx
"use client";

import { Product } from "@/lib/productData";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function Card({ product, onAddToCart }: CardProps) {
  return (
    <div className="bg-gray-400 rounded-xl border-3 flex flex-col h-[500px] overflow-hidden">
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
          <p className="bg-red-500 text-white text-xs px-2 py-1 rounded">-25%</p>
          <Link href="/wishlist">
            <Heart className="text-black bg-gray-300 p-2 w-10 h-10 rounded-full cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Lower Section */}
      <div className="lower-card bg-blue-100 flex flex-col justify-between flex-grow">
        <div className="Description flex justify-between px-4 pt-2">
          <div className="text-black text-lg font-bold">
            <p>{product.title}</p>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>

          <div className="text-red-600 text-right">
            <p className="font-bold text-2xl">Rs.{product.price.toFixed(2)}</p>
            <p className="text-gray-500 text-xs line-through">
              Rs.{(product.price + 5).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="cart px-4 pb-4 pt-2">
          <button
            onClick={() => onAddToCart?.(product)}
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
  );
}

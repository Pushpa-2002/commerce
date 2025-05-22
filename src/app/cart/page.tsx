"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/productData";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface CartProduct extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        let newQuantity = item.quantity + delta;

        // Enforce min 1 and max 200
        if (newQuantity < 1) newQuantity = 1;
        if (newQuantity > 200) newQuantity = 200;

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
const tax = cart.reduce((total, item) => total + 3 * item.quantity, 0); // $3 per item
const total = subTotal + tax;

  return (
    <>
      <div className="flex bg-white">
        <div className="p-8 text-black bg-white w-[60%]">
          <h1 className="text-4xl font-bold mb-6">🛒 Your Cart</h1>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="border-1">
              <div className="space-y-6 grid grid-cols-6 gap-4 text-center bg-gray-200 p-9 border-1 border-gray-400 font-bold text-xl">
                {/* <div className="grid grid-cols-6 gap-4 mb-6 text-center font-semibold bg-gray-300 py-10"> */}
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
                <div>Remove</div>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-4 items-center border-b py-4"
                >
                  <div className="flex items-center gap-4 ">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={60}
                    />
                    <span>{item.title}</span>
                  </div>
                  <span className="ml-16">${item.price.toFixed(2)}</span>
                  {/* <input
                type="number"
                value={item.quantity}
                min="1"
                className="border p-2 rounded text-center"
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              /> */}
                  <div className="flex items-center justify-center gap-2 ">
                    <button
                      className="px-2 py-1 bg-gray-400 rounded-full w-7 h-7 text-white"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-400 rounded-full w-7 h-7 text-white"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-10">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="pl-10"
                  >
                    <div>
                      {" "}
                      <Trash2 />
                    </div>
                  </button>
                </div>
              ))}
              <div className="text-right text-2xl font-bold mt-6 mr-5">
                <p>Total: ${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-2 ml-80 w-[60%]">
            <div className="w-40  bg-gray-300 p-2 border-1 rounded-l">
              <Link href="/products">Continue Shopping</Link>
            </div>
          </div>
        </div>
        <div className="text-black w-[40%]">
         <div className="border-1 mt-25 w-150 rounded-xl py-5 pl-8">
    <h2 className="font-bold text-3xl p-4">Order Summary:</h2>
    <div className="grid gap-y-4 gap-x-10 grid-cols-2">
      <p>Sub Total:</p>
      <span>${subTotal.toFixed(2)}</span>

      <p>Shipping:</p>
      <p>Free</p>

      <p className="border-b-1 w-130">Tax:</p>
      <p>${tax.toFixed(2)}</p>

      <p className="font-bold text-3xl p-4">Total:</p>
      <p className="pt-6">${total.toFixed(2)}</p>

      <button className="bg-orange-600 rounded-xl p-2 gap-2 w-120 text-white content-center justify-center">
        <div>Proceed To Checkout</div>
      </button>
    </div>
  </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import {Heart,Star,ShoppingCart} from "lucide-react";
export default function Card(){
    return(
         <div className="bg-gray-400 w-90 h-120 rounded-xl border-6">
        <div className="bg-amber-100 w-88 h-118 shadow rounded-xl">
          <div className="relative">
            <Image
              src="/images/shadow.jpg"
              alt="photo"
              width={500}
              height={500}
            />
            <div className="absolute top-3 left-3 flex gap-65">
              <p className="bg-red-500 w-10 h-5">-25%</p>
              <p className="cursor-pointer">
                <button>
                <Heart className="text-black text-xs bg-gray-300 p-2 w-10 h-10 rounded-full" />
              </button>
              </p>
            </div>
          </div>
          <div className="Description flex justify-around">
            <div className="text-black pt-2 text-lg font-bold">
              <p>
                Blazure Two piece <br /> Set Dress
              </p>
            </div>
            <div className="text-red-600 pt-2">
              <p className="font-bold text-2xl">$3.99</p>
              <p className="text-gray-500 text-xs">$5.99</p>
            </div>
          </div>

          <div className="icon flex justify-between">
            <div className="flex gap-4 p-4">
              <div className="w-6 h-6 border-4 border-gray-400 rounded-full"></div>
              <div className="w-6 h-6 border-4 border-red-500 rounded-full"></div>
              <div className="w-6 h-6 border-4 border-sky-400 rounded-full"></div>
            </div>

            <div className="flex gap-4 p-4">
              <div>
                <Heart className="text-black text-2xl" />
              </div>
              <div>
                <Star className="text-black text-2xl" />
              </div>
            </div>
            
          </div>
          <div className="flex bg-orange-600 rounded-xl p-2 gap-2 w-80 ml-5 mt-20 text-white content-center justify-center"> 
                        <div><ShoppingCart /></div>
                        <span>Add To Cart</span> 
                      </div>
        </div>
      </div>
    )
}
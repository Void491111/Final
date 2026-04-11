"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SPECIAL_OFFERS } from "@/lib/data/menuData";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store";
import CartBottomSheet from "@/app/components/Cart/cartBottomSheet";
import CartFAB from "@/app/components/Cart/CartFAB";

export default function SpecialOffersPage() {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleTap(item: (typeof SPECIAL_OFFERS)[0]) {
    const defaultSweetness =
      item.category === "coffee" || item.category === "non-coffee"
        ? "normal-sweet"
        : "none";
    addItem(item, defaultSweetness, "", 1);
    openCart();
  }

  return (
    <div className="relative flex flex-col bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-mooiste">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-gray-900">Special Offers</h1>
      </div>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-2 gap-3 px-4 pt-5">
        {SPECIAL_OFFERS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTap(item)}
            className="flex flex-col rounded-sm border border-gray-200 bg-white shadow-sm overflow-hidden text-left active:scale-[0.97] transition-transform"
          >
            <div className="flex items-center justify-center pt-5 px-4 pb-2 bg-gray-50">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={100}
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="px-3 pb-3 pt-2">
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {item.name}
              </p>
              <p className="text-[10px] text-gray-500 leading-snug line-clamp-2 mt-1">
                {item.description}
              </p>
              <p className="text-[10px] text-gray-600 mt-1">
                mulai dari{" "}
                <span className="text-[#C17C3F] font-bold">
                  {formatCurrency(item.price)}
                </span>
              </p>
            </div>
          </button>
        ))}
      </div>

      <CartFAB />
      <CartBottomSheet />
    </div>
  );
}
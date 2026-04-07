"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CategoryTabs from "@/app/components/Menu/CategoryTabs";
import MenuItemCard from "@/app/components/Menu/MenuItemCard";
import CartBottomSheet from "./components/Cart/cartBottomSheet";
import CartFAB from "./components/Cart/CartFAB";
import {
  MENU_ITEMS,
  SPECIAL_OFFERS,
  TODAY_PICKS,
  HERO_IMAGE,
} from "@/lib/data/menuData";
import { MenuCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "semua">(
    "semua"
  );

  const filteredMenu =
    activeCategory === "semua"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col bg-white min-h-screen pb-32">
      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="De-Mooiste Cafe"
          fill
          className="object-cover"
          priority
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-5">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-widest">
              Selamat datang di
            </p>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Mooiste Cafe
            </h1>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <section className="pt-8">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar px-5 pb-4">
          <h2 className="text-xl font-bold text-gray-900 flex-shrink-0">
            Special Offers
          </h2>

          {SPECIAL_OFFERS.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="relative h-20 w-16">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain drop-shadow-md"
                  sizes="64px"
                />
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 flex items-center justify-center pl-2 pr-4">
            <span className="text-gray-800 text-lg font-medium">--&gt;</span>
          </div>
        </div>
      </section>

      {/* Today Picks */}
      <section className="px-4 pt-6">
        <h2 className="text-sm font-bold text-gray-900 text-center mb-5">
          Today Picks
        </h2>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {TODAY_PICKS.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[140px] flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="relative h-32 w-full bg-white flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              </div>

              <div className="p-3 flex flex-col gap-1 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  {item.name}
                </p>
                <p className="text-[10px] text-gray-500 line-clamp-2 leading-snug">
                  {item.description}
                </p>
                <p className="text-[11px] font-medium text-gray-600 mt-1">
                  mulai dari{" "}
                  <span className="text-[#C17C3F] font-bold">
                    {formatCurrency(item.price)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Menu */}
      <section className="px-4 pt-8">
        <h2 className="text-sm font-bold text-gray-900 text-center mb-5">
          Our Menu
        </h2>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div className="mt-5 space-y-4">
          {filteredMenu.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Yeay, kamu sudah melihat semua menu kami! 🎉
        </p>
      </section>

      {/* Cart */}
      <CartFAB />
      <CartBottomSheet />
    </div>
  );
}
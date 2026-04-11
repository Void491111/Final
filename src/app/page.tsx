"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CategoryTabs from "@/app/components/Menu/CategoryTabs";
import MenuItemCard from "@/app/components/Menu/MenuItemCard";
import CartBottomSheet from "./components/Cart/cartBottomSheet";
import CartFAB from "./components/Cart/CartFAB";
import Link from "next/link";
import { useCartStore } from "@/store";
import {
  MENU_ITEMS,
  SPECIAL_OFFERS,
  TODAY_PICKS,
  HERO_IMAGES,
} from "@/lib/data/menuData";
import { MenuCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import InfoMejaModal from "./components/modals/InfoMejamodal";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "semua">(
    "semua"
  );
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function handleTodayPicks(item: typeof MENU_ITEMS[0]) {
    const defaultSweetness =
      item.category === "coffee" || item.category === "non-coffee"
        ? "normal-sweet"
        : "none";
    addItem(item, defaultSweetness, "", 1);
    openCart();
  }

  const filteredMenu =
    activeCategory === "semua"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="relative flex flex-col bg-white min-h-screen pb-32">
      <Navbar />

      {/* Hero Banner Carousel */}
      <div className="relative w-full aspect-video overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`De-Mooiste Cafe ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-700 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
            sizes="430px"
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-5">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-widest">
              Selamat datang di
            </p>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Mooiste Cafe
            </h1>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <section className="pt-8">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar px-5 pb-4">
          <h2 className="text-xl font-bold text-gray-900 shrink-0">
            Special Offers
          </h2>

          {SPECIAL_OFFERS.map((item) => (
            <div
              key={item.id}
              className="shrink-0 flex items-center justify-center"
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

          <Link
            href="/special-offers"
            className="shrink-0 flex items-center justify-center pl-2 pr-4"
          >
            <span className="text-gray-800 text-lg font-medium">--&gt;</span>
          </Link>
        </div>
      </section>

      <hr className="mx-5 border-mooiste" />

      {/* Today Picks */}
      <section className="px-4 pt-6">
        <h2 className="text-sm font-bold text-gray-900 text-center mb-5">
          Today Picks
        </h2>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
          {TODAY_PICKS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTodayPicks(item)}
              className="shrink-0 w-35 flex flex-col rounded-sm border border-gray-200 bg-white shadow-sm overflow-hidden text-left active:scale-[0.97] transition-transform"
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
      </section>

      <hr className="mx-5 border-mooiste" />

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

      <CartFAB />
      <CartBottomSheet />
      <InfoMejaModal />
    </div>
  );
}
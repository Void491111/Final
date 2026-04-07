"use client";

import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartFAB } from "./useCartFAB";
import { useEffect, useState } from "react";

export default function CartFAB() {
  const { count, total, openCart } = useCartFAB();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (count === 0) return null;

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3.5 shadow-xl active:scale-95 transition-transform"
      style={{ maxWidth: "calc(430px - 2rem)", width: "calc(100% - 2rem)" }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
        {count}
      </span>
      <span className="flex-1 text-left text-sm font-semibold text-white">
        Lihat Keranjang
      </span>
      <span className="text-sm font-bold text-primary">
        {formatCurrency(total())}
      </span>
      <ShoppingCart size={18} className="text-white" />
    </button>
  );
}
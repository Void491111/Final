"use client";

import Image from "next/image";
import { Star, Plus } from "lucide-react";
import { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useMenuItemCard } from "./useMenuItemCard";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { handleQuickAdd } = useMenuItemCard(item);

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-3 border border-mooiste">
      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface-2">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold text-gray-900 leading-tight">
            {item.name}
          </span>
          <span className="flex items-center gap-0.5 rounded-full bg-gray-900 px-1.5 py-0.5 text-[10px] font-medium text-white flex-shrink-0">
            <Star size={9} className="fill-yellow-400 text-yellow-400" />
            {item.rating}
          </span>
        </div>

        {/* Price */}
        <span className="text-base font-bold text-primary">
          {formatCurrency(item.price)}
        </span>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={handleQuickAdd}
        className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm active:scale-95 transition-transform"
        aria-label={`Tambah ${item.name}`}
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
"use client";

import { MenuCategory, MENU_CATEGORY_LABELS } from "@/types";

const ALL_CATEGORIES: (MenuCategory | "semua")[] = [
  "semua",
  "coffee",
  "non-coffee",
  "snack",
  "dessert",
];

const LABELS: Record<MenuCategory | "semua", string> = {
  semua: "Semua", // <-- Gw ubah kapital depannya biar sejajar sama yang lain
  ...MENU_CATEGORY_LABELS,
};

interface CategoryTabsProps {
  active: MenuCategory | "semua";
  onChange: (cat: MenuCategory | "semua") => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    // typo np-scrollbar udah gw fix jadi no-scrollbar
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {ALL_CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 shadow-sm"
            }`}
          >
            {LABELS[cat]}
          </button>
        );
      })}
    </div>
  );
}
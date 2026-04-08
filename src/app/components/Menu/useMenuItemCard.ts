import { MenuItem } from "@/types";
import { useCartStore } from "@/store";

export function useMenuItemCard(item: MenuItem) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleQuickAdd() {
    const defaultSweetness =
      (item.category === "coffee" || item.category === "non-coffee")
        ? "normal-sweet"
        : "none";

    addItem(item, defaultSweetness, "", 1);
    openCart();
  }

  return { handleQuickAdd };
}
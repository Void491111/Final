import { useCartStore } from "@/store";

export function useCartFAB() {
  const openCart = useCartStore((s) => s.openCart);
  const items = useCartStore((s) => s.items);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return {
    count,
    total,
    openCart,
  };
}
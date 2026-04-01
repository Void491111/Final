import { MenuItem } from "@/types";
import { useCartStore } from "@/store";

export function useMenuItemCard(item: MenuItem) {
    const addItem = useCartStore((s) => s.addItem);
    const openCart = useCartStore((s) => s.openCart);

    function handleQuickAdd() {
        addItem(item, "normal-sweet", "", 1);
        openCart();
    }

    return { handleQuickAdd };
}
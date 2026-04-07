import { useCartStore } from "@/store";

export function useCartFAB() {
    const openCart = useCartStore((s) => s.openCart);
    const totalItems = useCartStore((s) => s.totalItems);
    const total = useCartStore((s) => s.total);

    return{
        count: totalItems(),
        total,
        openCart,
    };
}
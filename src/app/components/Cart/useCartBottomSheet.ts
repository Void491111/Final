import React, { useEffect } from "react";
import { useCartStore } from "@/store";

export function UseCartBottomSheet() {
    const items = useCartStore((s) => s.items);
    const isOpen = useCartStore((s) => s.isOpen);
    const closeCart = useCartStore((s) => s.closeCart);
    const clearCart = useCartStore((s) => s.clearCart);
    const subtotal = useCartStore((s) => s.subtotal);
    const tax = useCartStore((s) => s.tax);
    const total = useCartStore((s) => s.total);
    const totalItems = useCartStore((s) => s.totalItems);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateItem = useCartStore((s) => s.updateItem);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    function handleBackdropClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) closeCart();
    }

    function handleCheckout() {
        alert("Order Placed! (comming soon)");
        closeCart();
        closeCart();
    }

    return {
        items, 
        isOpen, 
        closeCart,
        clearCart,
        subtotal,
        tax,
        total,
        totalItems,
        updateQuantity,
        removeItem,
        updateItem,
        handleCheckout,
        handleBackdropClick,
    };
}
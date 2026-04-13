import React, { useEffect, useState } from "react";
import { useCartStore, useTableStore } from "@/store";
import { createOrder } from "@/lib/api";

export function useCartScrollLock() {
  const isOpen = useCartStore((s) => s.isOpen);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);
}

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

  const tableInfo = useTableStore((s) => s.tableInfo);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) closeCart();
  }

  async function handleCheckout() {
    // Validasi: pastikan table info udah diisi
    if (!tableInfo) {
      setOrderError("Silahkan scan QR meja terlebih dahulu!");
      return;
    }

    if (!tableInfo.customerName || tableInfo.customerName.trim() === "") {
      setOrderError("Silahkan isi nama kamu di Info Meja terlebih dahulu!");
      return;
    }

    if (items.length === 0) {
      setOrderError("Keranjang masih kosong!");
      return;
    }

    setIsSubmitting(true);
    setOrderError(null);

    try {
      const tableRes = await fetch (`http://localhost:8000/api/tables/${tableInfo.tableNumber}`);
      if (!tableRes.ok) {
        setOrderError("Nomor meja tidak ditemukan");
        setIsSubmitting(false);
        return;
      }
      const tableData = await tableRes.json()

      const orderData = {
        table_id: tableData.id,
        customer_name: tableInfo.customerName,
        items: items.map((item) => ({
          menu_item_id: Number(item.menuItem.id),
          quantity: item.quantity,
          sweetness_level: item.sweetness,
          note: item.note || "",
          price: item.menuItem.price,
        })),
      };

      await createOrder(orderData);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Order failed:", err);
      setOrderError("Gagal mengirim pesanan. Coba lagi ya!");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetOrderState() {
    setOrderError(null);
    setOrderSuccess(false);
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
    isSubmitting,
    orderError,
    orderSuccess,
    resetOrderState,
  };
}
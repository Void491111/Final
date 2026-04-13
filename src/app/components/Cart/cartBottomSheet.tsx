"use client";

import Image from "next/image";
import { X, ShoppingCart, Minus, Plus, Trash2, Pencil, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { CartItem, SWEETNESS_LABELS, SWEETNESS_OPTIONS, SweetnessLevel } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { UseCartBottomSheet, useCartScrollLock } from "./useCartBottomSheet";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DeleteModal from "@/app/components/modals/DeleteModal";
import ConfirmationModal from "@/app/components/modals/ConfirmationModal";


// edit modal
interface EditModalProps {
  item: CartItem;
  onSave: (sweetness: SweetnessLevel, note: string) => void;
  onClose: () => void;
}

function EditModal({ item, onSave, onClose }: EditModalProps) {
  const [sweetness, setSweetness] = useState<SweetnessLevel>(item.sweetness);
  const [note, setNote] = useState(item.note);
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-60 flex items-end justify-center transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div
        className={`relative z-10 w-full max-w-107.5 rounded-t-3xl bg-white p-5 pb-8 transition-transform duration-200 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h3 className="mb-4 text-base font-bold text-gray-900">
          Edit — {item.menuItem.name}
        </h3>
        <p className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Tingkat Manis
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {SWEETNESS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setSweetness(opt)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                sweetness === opt
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-mooiste bg-surface text-gray-700"
              }`}
            >
              {SWEETNESS_LABELS[opt]}
            </button>
          ))}
        </div>
        <p className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Catatan ke Koki (opsional)
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Berikan Pesan Mu..."
          rows={4}
          className="mb-5 w-full resize-none rounded-2xl border border-mooiste bg-white p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          onClick={() => { onSave(sweetness, note); handleClose(); }}
          className="w-full rounded-2xl bg-primary py-3 text-sm font-bold text-white active:scale-95 transition-transform"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

// CartItemRow
interface CartItemRowProps {
  item: CartItem;
}

function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem, updateItem } = UseCartBottomSheet();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl border border-mooiste bg-surface p-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
          <Image
            src={item.menuItem.image}
            alt={item.menuItem.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <span className="text-sm font-semibold text-gray-900 truncate">
            {item.menuItem.name}
          </span>
          <span className="text-sm font-bold text-primary">
            {formatCurrency(item.menuItem.price)}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 rounded-full border border-mooiste bg-white px-1">
              <button
                onClick={() => {
                  if (item.quantity > 1) updateQuantity(item.cartItemId, item.quantity - 1);
                }}
                disabled={item.quantity <= 1}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  item.quantity <= 1 ? "text-gray-300" : "text-gray-700 active:bg-gray-100"
                }`}
              >
                <Minus size={12} strokeWidth={2.5} />
              </button>
              <span className="w-5 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                className="flex h-6 w-6 items-center justify-center text-gray-700 active:bg-gray-100 rounded-full"
              >
                <Plus size={12} strokeWidth={2.5} />
              </button>
            </div>
            <span className="rounded-full border border-mooiste bg-white px-2 py-0.5 text-xs text-gray-600">
              {SWEETNESS_LABELS[item.sweetness]}
            </span>
          </div>
          {item.note && (
            <p className="text-[11px] text-gray-400 truncate">📝 {item.note}</p>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setShowEdit(true)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-gray-600"
            aria-label="Edit item"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500"
            aria-label="Hapus item"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {showEdit && createPortal(
        <EditModal
          item={item}
          onSave={(sw, n) => updateItem(item.cartItemId, sw, n)}
          onClose={() => setShowEdit(false)}
        />,
        document.body
      )}
      {showDelete && createPortal(
        <DeleteModal
          onCancel={() => setShowDelete(false)}
          onConfirm={() => { removeItem(item.cartItemId); setShowDelete(false); }}
        />,
        document.body
      )}
    </>
  );
}

// CartBottomSheet
export default function CartBottomSheet() {
  useCartScrollLock();
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    tax,
    total,
    totalItems,
    handleCheckout,
    isSubmitting,
    orderError,
    orderSuccess,
    resetOrderState,
  } = UseCartBottomSheet();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      requestAnimationFrame(() => setShow(false));
    }
  }, [isOpen]);

  // Auto close cart after successful order
  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        resetOrderState();
        closeCart();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess, resetOrderState, closeCart]);

  if (!isOpen && !show) return null;

  function handleClose() {
    setShow(false);
    resetOrderState();
    setTimeout(closeCart, 250);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-250 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`w-full max-w-107.5 rounded-t-3xl bg-white flex flex-col transition-transform duration-250 ease-out ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-mooiste shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-gray-800" />
            <span className="text-base font-bold text-gray-900">
              Keranjang ({totalItems()})
            </span>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2"
          >
            <X size={16} />
          </button>
        </div>

        {/* Success State */}
        {orderSuccess ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Pesanan Berhasil!</h3>
            <p className="text-sm text-gray-500 text-center">
              Pesanan kamu sedang diproses. Silahkan tunggu ya!
            </p>
          </div>
        ) : (
          <>
            {/* Error Banner */}
            {orderError && (
              <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm text-red-600">{orderError}</p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <ShoppingCart size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Keranjang masih kosong</p>
                </div>
              ) : (
                items.map((item) => (
                  <CartItemRow key={item.cartItemId} item={item} />
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="shrink-0 border-t border-mooiste bg-white px-5 py-4 pb-8">
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pajak (11%)</span>
                    <span>{formatCurrency(tax())}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-1 border-t border-mooiste">
                    <span>Total</span>
                    <span>{formatCurrency(total())}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfirmation(true)}
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-white active:scale-95 transition-transform shadow-md disabled:opacity-50 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Memproses...
                    </span>
                  ) : (
                    "Pesan Sekarang"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showConfirmation && createPortal(
        <ConfirmationModal
          onCancel={() => setShowConfirmation(false)}
          onConfirm={async () => {
            setShowConfirmation(false);
            await handleCheckout();
          }}
        />,
        document.body
      )}
    </div>
  );
}
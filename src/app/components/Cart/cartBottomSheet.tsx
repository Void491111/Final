"use client";

import Image from "next/image";
import { X, ShoppingCart, Minus, Plus, Trash2, Pencil } from "lucide-react";
import { CartItem, SWEETNESS_LABELS, SWEETNESS_OPTIONS, SweetnessLevel } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { UseCartBottomSheet } from "./useCartBottomSheet";
import { useState } from "react";
import DeleteModal from "@/app/components/modals/DeleteModal";
import ConfirmationModal from "@/app/components/modals/ConfirmationModal";
import { useCartStore } from "@/store";

// ============================================================
// EDIT MODAL (sweetness + note)
// ============================================================
interface EditModalProps {
  item: CartItem;
  onSave: (sweetness: SweetnessLevel, note: string) => void;
  onClose: () => void;
}

function EditModal({ item, onSave, onClose }: EditModalProps) {
  const [sweetness, setSweetness] = useState<SweetnessLevel>(item.sweetness);
  const [note, setNote] = useState(item.note);

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[430px] rounded-t-3xl bg-white p-5 pb-8">
        <h3 className="mb-4 text-base font-bold text-gray-900">
          Edit — {item.menuItem.name}
        </h3>

        {/* Sweetness */}
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

        {/* Note */}
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
          onClick={() => { onSave(sweetness, note); onClose(); }}
          className="w-full rounded-2xl bg-primary py-3 text-sm font-bold bg-[#1073BA] text-white active:scale-95 transition-transform"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

// ============================================================
// CART ITEM ROW
// ============================================================
interface CartItemRowProps {
  item: CartItem;
}

function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem, updateItem } = useCartStore();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl border border-mooiste bg-surface p-3">
        {/* Image */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
          <Image
            src={item.menuItem.image}
            alt={item.menuItem.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <span className="text-sm font-semibold text-gray-900 truncate">
            {item.menuItem.name}
          </span>
          <span className="text-sm font-bold text-primary">
            {formatCurrency(item.menuItem.price)}
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quantity */}
            <div className="flex items-center gap-1 rounded-full border border-mooiste bg-white px-1">
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                className="flex h-6 w-6 items-center justify-center text-gray-700 active:bg-gray-100 rounded-full"
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

            {/* Sweetness badge */}
            <span className="rounded-full border border-mooiste bg-white px-2 py-0.5 text-xs text-gray-600">
              {SWEETNESS_LABELS[item.sweetness]}
            </span>
          </div>

          {/* Note preview */}
          {item.note && (
            <p className="text-[11px] text-gray-400 truncate">📝 {item.note}</p>
          )}
        </div>

        {/* Edit + Delete */}
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

      {showEdit && (
        <EditModal
          item={item}
          onSave={(sw, n) => updateItem(item.cartItemId, sw, n)}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showDelete && (
        <DeleteModal
          onCancel={() => setShowDelete(false)}
          onConfirm={() => { removeItem(item.cartItemId); setShowDelete(false); }}
        />
      )}
    </>
  );
}

// ============================================================
// CART BOTTOM SHEET
// ============================================================
export default function CartBottomSheet() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    tax,
    total,
    totalItems,
    handleBackdropClick,
  } = UseCartBottomSheet();

  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overlay-enter"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={handleBackdropClick}
    >
      <div
        className="bottom-sheet-enter w-full max-w-[430px] rounded-t-3xl bg-white flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-mooiste shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-gray-800" />
            <span className="text-base font-bold text-gray-900">
              Keranjang ({totalItems()})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
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

        {/* Footer */}
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
              className="w-full rounded-2xl bg-primary py-3.5 bg-[#1073BA] text-sm font-bold text-white active:scale-95 transition-transform shadow-md"
            >
              Pesan Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            setShowConfirmation(false);
            alert("Order placed! (coming soon)");
          }}
        />
      )}
    </div>
  );
}
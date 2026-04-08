"use client";
import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative z-10 rounded-[2rem] border-2 border-white bg-[#d2d2d2]/45 p-2">
        <div className="w-full max-w-[320px] rounded-3xl bg-white p-6 flex flex-col items-center text-center shadow-xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            Hapus Pesanan Ini?
          </h2>
          <p className="mb-6 text-sm text-gray-500 leading-relaxed">
            Apakah anda yakin ingin menghapus pesanan ini dari keranjang pesanan?
          </p>
          <div className="flex w-full gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-2xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 active:scale-95 transition-transform"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-2xl bg-red-600 py-3 text-sm font-semibold text-white active:scale-95 transition-transform"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
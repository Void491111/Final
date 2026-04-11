"use client";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

interface ConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onCancel, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center px-6 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div
        className={`relative z-10 rounded-4xl border-2 border-white bg-[#d2d2d2]/45 p-2 transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="w-full max-w-[320px] rounded-3xl bg-white p-6 flex flex-col items-center text-center shadow-xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <Info size={28} className="text-blue-500" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            Konfirmasi Pesanan
          </h2>
          <p className="mb-6 text-sm text-gray-500 leading-relaxed">
            Silahkan cek kembali keranjang anda. Pastikan semua pesanan sudah
            sesuai sebelum di proses.
          </p>
          <div className="flex w-full gap-3">
            <button
              onClick={handleClose}
              className="flex-1 rounded-2xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 active:scale-95 transition-transform"
            >
              Cek Lagi
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-2xl bg-blue-500 py-3 text-sm font-semibold text-white active:scale-95 transition-transform"
            >
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
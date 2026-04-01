"use client"

import { ShoppingBag } from "lucide-react"

interface ConfirmationModalProps {
    onBack: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({
    onBack,
    onConfirm,
}: ConfirmationModalProps) {
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40" onClick={onBack}>

            <div className="relative z-10 w-full max-w-[320px] rounded-3xl bg-white p-6 flex-col items-center text-center shadow-xl">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                    <ShoppingBag size={28} className="text-blue-500" />
                </div>

                <h2 className="mb-2 text-lg font-bold text-gray-900">
                    Konfirmasi pesanan
                </h2>
                <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                    Silahkan cek kembali keranjang anda. pastikam semua pesanan sudah sesuai sebelum diproses.
                </p>

                <div className="flex w-full gap-3">
                    <button
                        onClick={onBack}
                        className="flex-1 rounded-2xl border border-mooiste bg-white py-3 text-sm font-semibold text-gray-700 active:scale-95 transition-transform"
                    >
                        Cek Lagi
                    </button>
                    <button
                        onClick={onBack}
                        className="flex-1 rounded-xl border border-mooiste bg-white py-3 text-sm font-semibold text-white active:scale-05 transition-transform"
                    >
                        Lanjut
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}
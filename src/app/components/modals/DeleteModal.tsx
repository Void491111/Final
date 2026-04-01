"use client"

import { TriangleAlert } from "lucide-react";

interface DeleteModalProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({ onCancel, onConfirm }: DeleteModalProps) {
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40" onClick={onCancel}>
                <div className="relative z-10 w-full max-w-[320px] rounded-3xl bg-white p-6 flex flex-col items-center text-center shadow-xl">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                        <TriangleAlert size={28} classname="text-red-500" />
                    </div>

                    <h2 className="mb-2 text-lg font-bold text-gray-900">
                        Hapus Pesanan ini?
                    </h2>
                    <p className="mb-2 text-lg font-bold text-gray-900">
                        Apakah anda yakin ini menghapus pesanan ini dari keranjang pesanan?
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 rounded-2xl border border-mooiste bg-white py-3 text-sm font-semibold text-gray-700 active:scale-95 transition-transform"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 rounded bg-red-500 py-3 txt-sm font-semibold text-white active:scale-95 transition-transform"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
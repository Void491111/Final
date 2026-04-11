"use client";

import { X, Wifi, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useInfoMejaModal } from "./useInfoMeja";

const TABLE_NUMBER = "93";
const WIFI_PASSWORD = "PPPPPPP";

export default function InfoMejaModal() {
  const { isOpen, customerName, setCustomerName, handleSave, closeInfo } =
    useInfoMejaModal();
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      requestAnimationFrame(() => setShow(false));
    }
  }, [isOpen]);

  if (!isOpen && !show) return null!


  
  function handleClose() {
    if (!show) return;
    setShow(false);
    setTimeout(() => {
      closeInfo();
    }, 200);
  }

  function handleCopyWifi() {
    navigator.clipboard.writeText(WIFI_PASSWORD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  



  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div
        className={`relative z-10 rounded-4xl border-2 border-white bg-[#d2d2d2]/45 p-2 transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="w-full max-w-[320px] rounded-3xl bg-white p-5 shadow-xl">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Informasi Meja</h2>
              <p className="text-xs text-gray-500">
                Silahkan Lengkapi Data kamu
              </p>
            </div>
            <button
              onClick={handleClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-gray-500"
            >
              <X size={14} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-sm font-bold text-white">
              {TABLE_NUMBER}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">Nomor Meja</p>
              <p className="text-[11px] text-gray-500">Terverifikasi (Scan QR)</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-xs font-semibold text-gray-700">
              Nama Kamu
            </p>
            <div className="flex items-center gap-2 rounded-2xl border border-mooiste bg-white px-3 py-2.5">
              <span className="text-gray-400">👤</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ketik Nama Kamu..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-xs font-semibold text-gray-700">
              Sambil nunggu pesanan, yuk pakai Wi-Fi kami!
            </p>
            <div className="flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3">
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-white" />
                <div>
                  <p className="text-[10px] text-gray-400">Hicalypse</p>
                  <p className="text-sm font-bold text-white">{WIFI_PASSWORD}</p>
                </div>
              </div>
              <button
                onClick={handleCopyWifi}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              handleSave();
              handleClose();
            }}          
            className="mt-5 w-full rounded-2xl bg-primary py-3 text-sm font-bold text-white active:scale-95 transition-transform"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
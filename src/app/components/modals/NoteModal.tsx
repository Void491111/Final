"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface NoteModalProps {
  initialNote: string;
  onClose: () => void;
  onSave: (note: string) => void;
}

export default function NoteModal({
  initialNote,
  onClose,
  onSave,
}: NoteModalProps) {
  const [note, setNote] = useState(initialNote);

  function handleSave() {
    onSave(note);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[320px] rounded-3xl bg-white p-5 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Catatan</h2>
            <p className="text-xs text-gray-500">Berikan Pesan Ke Koki Yuk!!</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-gray-500"
          >
            <X size={14} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Berikan Pesan Mu"
          rows={5}
          className="mt-4 w-full resize-none rounded-2xl border border-mooiste bg-white p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Save */}
        <button
          onClick={handleSave}
          className="mt-4 w-full rounded-2xl bg-blue-500 py-3 text-sm font-bold text-white active:scale-95 transition-transform"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
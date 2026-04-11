"use client";

import { X, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store";

export default function NotificationsPage() {
  const router = useRouter();
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);

  return (
    <div className="flex flex-col min-h-screen bg-">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-gray-800" />
          <span className="text-base font-bold text-gray-900">
            Notifikasi ({notifications.length})
          </span>
        </div>
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
        >
          <X size={16} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            className={`px-5 py-4 border-b border-gray-100 ${
              notif.isRead ? "bg-white" : "bg-amber-50"
            }`}
          >
            <p className="text-sm font-medium text-gray-900 leading-snug">
              {notif.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
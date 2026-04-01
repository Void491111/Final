"use client"

import Link from "next/link";
import { Bell, Info } from "lucide-react";
import { useNavbar } from "./useNavbar";

export default function Navbar() {
    const { unread, OpenInfo } = useNavbar();

    return (
        <nav className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-mooiste">
            <span className="text-lg font-bold tracking-tight text-gray-900">
                De-mooiste-Cafe
            </span>

            <div className="flex items-center gap-3">
                <Link href="/notifications" className="relative p-1">
                    <Bell size={23} className="text-gray-700"/>
                    {unread > 0 && (
                        <span className="badge-pulse absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                            {unread > 9 ? "9" : unread}
                        </span>
                    )}
                </Link> 

                <button 
                    onClick={OpenInfo}
                    className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white"
                >
                    <Info size={13} />
                    Info
                </button>
            </div>
        </nav>
    );
}
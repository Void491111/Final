import { CURRENCY_SYMBOL } from "@/types";

export function formatCurrency(amount: number): string {
    return `${CURRENCY_SYMBOL} ${amount.toLocaleString("id-ID")}`;
}

export function formatRelative(isoString: string): string {
    const now = Date.now();
    const diff = now - new Date(isoString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Baru saja";
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `&{days} hari yang lalu`;
    return `${days} hari yang lalu`
}

export function generateCartItemId(): string {
    return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
};
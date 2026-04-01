import { useNotificationStore, useTableStore } from "@/store";

export function useNavbar() {
    const unreadCount = useNotificationStore((s) => s.unreadCount);
    const OpenInfo = useTableStore((s) => s.openInfo);

    return {
        unread: unreadCount(),
        OpenInfo,
    };
}
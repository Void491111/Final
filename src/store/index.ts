import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CartItem,
  MenuItem,
  SweetnessLevel,
  TableInfo,
  Notification,
  TAX_RATE,
} from "@/types";
import { generateCartItemId } from "@/lib/utils";
import { DUMMY_NOTIFICATIONS } from "@/lib/data/menuData";

// ============================================================
// CART STORE
// ============================================================

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // actions
  addItem: (
    menuItem: MenuItem,
    sweetness: SweetnessLevel,
    note: string,
    quantity?: number
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateItem: (
    cartItemId: string,
    sweetness: SweetnessLevel,
    note: string
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // computed (derived)
  subtotal: () => number;
  tax: () => number;
  total: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (menuItem, sweetness, note, quantity = 1) => {
        set((state) => ({
          items: [
            ...state.items,
            {
              cartItemId: generateCartItemId(),
              menuItem,
              quantity,
              sweetness,
              note,
            },
          ],
        }));
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        }));
      },

      updateItem: (cartItemId, sweetness, note) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, sweetness, note } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.menuItem.price * item.quantity,
          0
        ),

      tax: () => get().subtotal() * TAX_RATE,

      total: () => get().subtotal() + get().tax(),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "mooiste-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ============================================================
// TABLE INFO STORE
// ============================================================

interface TableStore {
  tableInfo: TableInfo | null;
  isInfoOpen: boolean;
  setTableInfo: (info: TableInfo) => void;
  openInfo: () => void;
  closeInfo: () => void;
}

export const useTableStore = create<TableStore>()(
  persist(
    (set) => ({
      tableInfo: null,
      isInfoOpen: false,
      setTableInfo: (info) => set({ tableInfo: info }),
      openInfo: () => set({ isInfoOpen: true }),
      closeInfo: () => set({ isInfoOpen: false }),
    }),
    {
      name: "mooiste-table",
      partialize: (state) => ({ tableInfo: state.tableInfo }),
    }
  )
);

// ============================================================
// NOTIFICATION STORE
// ============================================================

interface NotificationStore {
  notifications: Notification[];
  markAllRead: () => void;
  markRead: (id: string) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: DUMMY_NOTIFICATIONS,

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  unreadCount: () => get().notifications.filter((n) => !n.isRead).length,
}));
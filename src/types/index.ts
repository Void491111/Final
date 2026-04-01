// ============================================================
// MENU & PRODUCT
// ============================================================

export type MenuCategory =
  | "coffee"
  | "non-coffee"
  | "snack"
  | "dessert";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  rating: number;
  isSpecialOffer?: boolean;
  isTodayPick?: boolean;
}

// ============================================================
// SWEETNESS / NOTE OPTIONS
// ============================================================

export type SweetnessLevel =
  | "normal-sweet"
  | "less-sweet"
  | "no-sugar"
  | "extra-sweet";

export const SWEETNESS_LABELS: Record<SweetnessLevel, string> = {
  "normal-sweet": "Normal Sweet",
  "less-sweet": "Less Sweet",
  "no-sugar": "No Sugar",
  "extra-sweet": "Extra Sweet",
};

export const SWEETNESS_OPTIONS: SweetnessLevel[] = [
  "normal-sweet",
  "less-sweet",
  "no-sugar",
  "extra-sweet",
];

// ============================================================
// CART
// ============================================================

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  sweetness: SweetnessLevel;
  note: string;
}

// ============================================================
// TABLE / INFO MEJA
// ============================================================

export interface TableInfo {
  tableNumber: string;
  customerName: string;
  wifiPassword: string;
}

// ============================================================
// NOTIFICATION
// ============================================================

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// ============================================================
// ORDER
// ============================================================

export type OrderStatus = "pending" | "preparing" | "ready" | "done";

export interface Order {
  id: string;
  tableInfo: TableInfo;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// ============================================================
// CONSTANTS
// ============================================================

export const TAX_RATE = 0.11; // 11%

export const CURRENCY_SYMBOL = "Rp";

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  coffee: "Coffee",
  "non-coffee": "Non-Coffee",
  snack: "Snack",
  dessert: "Dessert",
};
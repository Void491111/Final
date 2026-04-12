import { MenuItem, MenuCategory } from "@/types";

const API_URL = "http://localhost:8000/api";

// Transform API response ke frontend type
interface ApiMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: string;
  is_special_offer: number;
  is_today_pick: number;
  is_available: number;
  category: { id: number; name: string; slug: string };
}

function transformMenuItem(item: ApiMenuItem): MenuItem {
  return {
    id: String(item.id),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.category?.slug as MenuCategory,
    rating: parseFloat(item.rating),
    isSpecialOffer: Boolean(item.is_special_offer),
    isTodayPick: Boolean(item.is_today_pick),
  };
}

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);
  const data = await res.json();
  return data.map(transformMenuItem);
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}

export async function fetchSpecialOffers(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu/special-offers`);
  const data = await res.json();
  return data.map(transformMenuItem);
}

export async function fetchTodayPicks(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu/today-picks`);
  const data = await res.json();
  return data.map(transformMenuItem);
}

export async function fetchTable(tableNumber: string) {
  const res = await fetch(`${API_URL}/tables/${tableNumber}`);
  return res.json();
}

export async function fetchNotifications() {
  const res = await fetch(`${API_URL}/notifications`);
  return res.json();
}

export async function createOrder(data: {
  table_id: number;
  customer_name: string;
  items: {
    menu_item_id: number;
    quantity: number;
    sweetness_level: string;
    note: string;
    price: number;
  }[];
}) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
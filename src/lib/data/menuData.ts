import { MenuItem, Notification } from "@/types";

// ============================================================
// my images
// ============================================================

const COFFEE_IMAGES = [
  "/images/menuImages/putih.png",
  "/images/menuImages/kuning.png",
  "/images/menuImages/merah.png",
  "/images/menuImages/biru.png",
  "/images/menuImages/kuning.png",
];

const NON_COFFEE_IMAGES = [
  "/images/menuImages/putih.png",
  "/images/menuImages/kuning.png",
  "/images/menuImages/biru.png",
  "/images/menuImages/merah.png",
  "/images/menuImages/putih.png",
];

const SNACK_IMAGES = [
  "/images/menuImages/putih.png",
  "/images/menuImages/kuning.png",
  "/images/menuImages/merah.png",
  "/images/menuImages/biru.png",
  "/images/menuImages/putih.png",
];

const DESSERT_IMAGES = [
  "/images/menuImages/biru.png",
  "/images/menuImages/biru.png",
  "/images/menuImages/biru.png",
  "/images/menuImages/biru.png",
  "/images/menuImages/biru.png",
];

export const HERO_IMAGES = [
  "/images/CarouselImages/carousel.png",
  "/images/CarouselImages/mesinkopi.png",
  "/images/CarouselImages/spesial.png",
]

// ============================================================
// MENU ITEMS
// ============================================================

export const MENU_ITEMS: MenuItem[] = [
  // --- COFFEE ---
  {
    id: "c1",
    name: "Espresso Classic",
    description: "Kopi espresso murni dengan cita rasa bold dan aroma yang kuat.",
    price: 28000,
    image: COFFEE_IMAGES[0],
    category: "coffee",
    rating: 4.8,
    isSpecialOffer: true,
    isTodayPick: true,
  },
  {
    id: "c2",
    name: "Cappuccino",
    description: "Perpaduan sempurna espresso, susu panas, dan foam lembut di atasnya.",
    price: 35000,
    image: COFFEE_IMAGES[1],
    category: "coffee",
    rating: 4.7,
    isTodayPick: true,
  },
  {
    id: "c3",
    name: "Ice Shaken Black Peach",
    description: "Ledakan rasa buah persik yang cerah dalam pelukan kopi hitam yang pekat—dingin, berbusa, dan sangat menyegarkan.",
    price: 42000,
    image: COFFEE_IMAGES[2],
    category: "coffee",
    rating: 4.7,
    isSpecialOffer: true,
    isTodayPick: true,
  },
  {
    id: "c4",
    name: "Caramel Macchiato",
    description: "Espresso lembut dengan lapisan susu manis dan siraman karamel emas.",
    price: 38000,
    image: COFFEE_IMAGES[3],
    category: "coffee",
    rating: 4.6,
    isTodayPick: true,
  },
  {
    id: "c5",
    name: "V60 Pour Over",
    description: "Metode seduh manual yang menghasilkan kopi bersih dengan kompleksitas rasa tinggi.",
    price: 45000,
    image: COFFEE_IMAGES[4],
    category: "coffee",
    rating: 4.9,
  },
  // --- NON-COFFEE ---
  {
    id: "nc1",
    name: "Matcha Latte",
    description: "Matcha premium Jepang yang creamy, dipadukan dengan susu segar berkualitas tinggi.",
    price: 38000,
    image: NON_COFFEE_IMAGES[0],
    category: "non-coffee",
    rating: 4.7,
    isSpecialOffer: true,
  },
  {
    id: "nc2",
    name: "Taro Milk Tea",
    description: "Teh susu dengan ubi ungu yang kaya, manis alami, dan warna cantik memanjakan mata.",
    price: 35000,
    image: NON_COFFEE_IMAGES[1],
    category: "non-coffee",
    rating: 4.5,
  },
  {
    id: "nc3",
    name: "Chocolate Hazelnut",
    description: "Coklat belgia yang kaya dengan sentuhan hazelnut, hangat dan memeluk jiwa.",
    price: 36000,
    image: NON_COFFEE_IMAGES[2],
    category: "non-coffee",
    rating: 4.6,
  },
  {
    id: "nc4",
    name: "Strawberry Lemonade",
    description: "Perpaduan segar stroberi lokal dan lemon segar, es melimpah dan menyegarkan.",
    price: 32000,
    image: NON_COFFEE_IMAGES[3],
    category: "non-coffee",
    rating: 4.4,
  },

  // --- SNACK ---
  {
    id: "s1",
    name: "Grilled Toast",
    description: "Roti panggang tebal dengan mentega, madu, atau selai pilihan. Renyah di luar, lembut di dalam.",
    price: 22000,
    image: SNACK_IMAGES[0],
    category: "snack",
    rating: 4.5,
    isSpecialOffer: true,
  },
  {
    id: "s2",
    name: "Beef Burger",
    description: "Burger daging sapi juicy dengan sayuran segar dan saus spesial rumahan.",
    price: 55000,
    image: SNACK_IMAGES[1],
    category: "snack",
    rating: 4.7,
  },
  {
    id: "s3",
    name: "Margherita Pizza",
    description: "Pizza tipis klasik dengan tomat segar, mozzarella, dan basil aromatik.",
    price: 65000,
    image: SNACK_IMAGES[2],
    category: "snack",
    rating: 4.6,
  },
  {
    id: "s4",
    name: "French Fries",
    description: "Kentang goreng renyah dengan garam laut, disajikan dengan saus pilihan.",
    price: 28000,
    image: SNACK_IMAGES[3],
    category: "snack",
    rating: 4.3,
  },

  // --- DESSERT ---
  {
    id: "d1",
    name: "Tiramisu",
    description: "Dessert Italia klasik dengan lapisan krim mascarpone dan biskuit espresso yang menggoda.",
    price: 45000,
    image: DESSERT_IMAGES[0],
    category: "dessert",
    rating: 4.9,
    isSpecialOffer: true,
  },
  {
    id: "d2",
    name: "Cheesecake New York",
    description: "Cheesecake creamy gaya New York dengan topping buah segar pilihan.",
    price: 42000,
    image: DESSERT_IMAGES[1],
    category: "dessert",
    rating: 4.8,
  },
  {
    id: "d3",
    name: "Croissant",
    description: "Croissant butter berlapis-lapis yang renyah dan buttery, dipanggang segar setiap hari.",
    price: 32000,
    image: DESSERT_IMAGES[2],
    category: "dessert",
    rating: 4.6,
  },
  {
    id: "d4",
    name: "Chocolate Lava Cake",
    description: "Kue coklat hangat dengan inti lelehan coklat yang meledak di mulut saat dipotong.",
    price: 48000,
    image: DESSERT_IMAGES[3],
    category: "dessert",
    rating: 4.9,
  },
];

// ============================================================
// SPECIAL OFFERS (subset)
// ============================================================

export const SPECIAL_OFFERS = MENU_ITEMS.filter((item) => item.isSpecialOffer);

// ============================================================
// TODAY PICKS (subset)
// ============================================================

export const TODAY_PICKS = MENU_ITEMS.filter((item) => item.isTodayPick);

// ============================================================
// NOTIFICATIONS
// ============================================================

export const DUMMY_NOTIFICATIONS: Notification[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `notif-${i + 1}`,
    title: "Promo Spesial Hari Ini!",
    message:
      i % 3 === 0
        ? "Dapatkan Grilled Toast + Ice Shaken Black Peach hanya Rp47.000!"
        : i % 3 === 1
        ? "Buy 1 Get 1 semua minuman Coffee setiap Senin-Rabu. Yuk order sekarang!"
        : "Diskon 20% untuk semua dessert hari ini. Jangan sampai kehabisan!",
    isRead: true,
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  })
);
import phoneSamsung from "@/assets/items/phone-samsung.jpg";
import laptopHp from "@/assets/items/laptop-hp.jpg";
import keys from "@/assets/items/keys.jpg";
import wallet from "@/assets/items/wallet.jpg";
import idCard from "@/assets/items/id-card.jpg";
import backpack from "@/assets/items/backpack.jpg";
import phoneIphone from "@/assets/items/phone-iphone.jpg";
import laptopThinkpad from "@/assets/items/laptop-thinkpad.jpg";

export type ItemStatus = "lost" | "found";
export type ItemCategory = "phone" | "laptop" | "keys" | "wallet" | "id-card" | "bag" | "other";

export interface Item {
  id: string;
  title: string;
  category: ItemCategory;
  description: string;
  location: string;
  date: string;
  status: ItemStatus;
  imageUrl: string;
  contactName: string;
  isRecent: boolean;
}

export const CAMPUS_LOCATIONS = [
  "Main Library",
  "Freedom Square",
  "Mary Stuart Hall",
  "Guild Canteen",
  "College of Computing (CoCIS)",
  "School of Law",
  "Senate Building",
  "Lumumba Hall",
  "Mitchell Hall",
  "MUBS Main Campus",
  "Kyambogo Main Gate",
  "Faculty of Technology",
];

export const CATEGORIES: { value: ItemCategory; label: string; icon: string }[] = [
  { value: "phone", label: "Phone", icon: "📱" },
  { value: "laptop", label: "Laptop", icon: "💻" },
  { value: "keys", label: "Keys", icon: "🔑" },
  { value: "wallet", label: "Wallet", icon: "👛" },
  { value: "id-card", label: "ID Card", icon: "🪪" },
  { value: "bag", label: "Bag", icon: "🎒" },
  { value: "other", label: "Other", icon: "📦" },
];

export const mockItems: Item[] = [
  {
    id: "1",
    title: "Samsung Galaxy A54",
    category: "phone",
    description: "Black Samsung phone with a cracked screen protector. Found near the benches.",
    location: "Freedom Square",
    date: "2026-03-15",
    status: "found",
    imageUrl: phoneSamsung,
    contactName: "Aisha N.",
    isRecent: true,
  },
  {
    id: "2",
    title: "HP EliteBook Laptop",
    category: "laptop",
    description: "Silver HP laptop in a black sleeve. Has stickers on the back cover.",
    location: "Main Library",
    date: "2026-03-15",
    status: "lost",
    imageUrl: laptopHp,
    contactName: "Brian K.",
    isRecent: true,
  },
  {
    id: "3",
    title: "Car & House Keys",
    category: "keys",
    description: "Set of 4 keys on a blue Toyota keychain.",
    location: "Guild Canteen",
    date: "2026-03-14",
    status: "found",
    imageUrl: keys,
    contactName: "Gloria M.",
    isRecent: false,
  },
  {
    id: "4",
    title: "Brown Leather Wallet",
    category: "wallet",
    description: "Contains Stanbic bank card and a student ID for Makerere.",
    location: "College of Computing (CoCIS)",
    date: "2026-03-14",
    status: "lost",
    imageUrl: wallet,
    contactName: "Dennis O.",
    isRecent: false,
  },
  {
    id: "5",
    title: "Student ID Card",
    category: "id-card",
    description: "Makerere University student ID. Name partially visible.",
    location: "Senate Building",
    date: "2026-03-13",
    status: "found",
    imageUrl: idCard,
    contactName: "Faith A.",
    isRecent: false,
  },
  {
    id: "6",
    title: "Nike Backpack",
    category: "bag",
    description: "Grey Nike backpack with textbooks and a water bottle inside.",
    location: "Lumumba Hall",
    date: "2026-03-13",
    status: "lost",
    imageUrl: backpack,
    contactName: "Joel T.",
    isRecent: false,
  },
  {
    id: "7",
    title: "iPhone 13 Pro",
    category: "phone",
    description: "Space grey iPhone with a clear case. Lock screen has a sunset photo.",
    location: "Mary Stuart Hall",
    date: "2026-03-15",
    status: "lost",
    imageUrl: phoneIphone,
    contactName: "Mercy W.",
    isRecent: true,
  },
  {
    id: "8",
    title: "Lenovo ThinkPad",
    category: "laptop",
    description: "Black ThinkPad with a red trackpoint. Found unattended.",
    location: "Faculty of Technology",
    date: "2026-03-14",
    status: "found",
    imageUrl: laptopThinkpad,
    contactName: "Patrick S.",
    isRecent: false,
  },
];

export function getTimeAgo(dateStr: string): string {
  const now = new Date("2026-03-15T14:00:00");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function getCategoryIcon(category: ItemCategory): string {
  return CATEGORIES.find((c) => c.value === category)?.icon ?? "📦";
}

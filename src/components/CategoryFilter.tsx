import { CATEGORIES, type ItemCategory } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  selected: ItemCategory | "all";
  onSelect: (cat: ItemCategory | "all") => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const all = [{ value: "all" as const, label: "All", icon: "🔍" }, ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {all.map((cat) => (
        <motion.button
          key={cat.value}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.value)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            selected === cat.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}

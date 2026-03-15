import { useState } from "react";
import { mockItems, type ItemCategory } from "@/lib/mock-data";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ItemCard from "@/components/ItemCard";

export default function LostItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ItemCategory | "all">("all");

  const items = mockItems
    .filter((item) => item.status === "lost")
    .filter((item) => category === "all" || item.category === category)
    .filter(
      (item) =>
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container py-8">
      <h1 className="text-display text-3xl text-foreground mb-2">Lost Items</h1>
      <p className="text-muted-foreground mb-6">Help the community find what they've lost.</p>

      <div className="space-y-4 mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="Search lost items..." />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <ItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl mb-1">🔍</p>
          <p className="text-muted-foreground">No lost items found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

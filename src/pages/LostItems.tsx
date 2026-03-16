import { useState } from "react";
import { mockItems, type ItemCategory } from "@/lib/mock-data";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ItemCard from "@/components/ItemCard";
import { ugandaUniversities, universityDepartments, universityLocations } from "@/lib/university-data";
import { School, Building2, MapPin } from "lucide-react";

export default function LostItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ItemCategory | "all">("all");
  const [university, setUniversity] = useState<string>("all");
  const [department, setDepartment] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");

  const items = mockItems
    .filter((item) => item.status === "lost")
    .filter((item) => category === "all" || item.category === category)
    .filter((item) => university === "all" || item.university === university)
    .filter((item) => department === "all" || item.department === department)
    .filter((item) => location === "all" || item.location === location)
    .filter(
      (item) =>
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

  const filterSelectClass = "w-full h-10 px-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <div className="container py-8">
      <h1 className="text-display text-3xl text-foreground mb-2">Lost Items</h1>
      <p className="text-muted-foreground mb-6">Help the community find what they've lost.</p>

      <div className="space-y-4 mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="Search lost items..." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              className={`${filterSelectClass} pl-10`}
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="all">All Universities</option>
              {ugandaUniversities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              className={`${filterSelectClass} pl-10`}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {universityDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              className={`${filterSelectClass} pl-10`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {universityLocations.map(cat => (
                <optgroup key={cat.category} label={cat.category}>
                  {cat.locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

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

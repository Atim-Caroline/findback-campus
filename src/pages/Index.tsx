import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Users, Search, CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ItemCard from "@/components/ItemCard";
import { mockItems, CATEGORIES } from "@/lib/mock-data";
import { useState } from "react";
import heroCampus from "@/assets/hero-campus.jpg";

const stats = [
  { icon: Shield, value: "94%", label: "Recovery rate with photos" },
  { icon: Clock, value: "48h", label: "Average return time" },
  { icon: Users, value: "3,200+", label: "Campus community members" },
];

export default function HomePage() {
  const [searchName, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const recentItems = mockItems.slice(0, 4);

  const filtered = searchName
    ? mockItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchName.toLowerCase()) ||
          item.location.toLowerCase().includes(searchName.toLowerCase())
      )
    : recentItems;

  return (
    <div className="min-h-screen">
      {/* Hero – fullscreen with background */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src={heroCampus}
          alt="Campus environment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Large faded background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[18vw] font-black tracking-tight text-white/[0.04] leading-none">
            RECOVER
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 text-balance font-extrabold tracking-tighter">
              Find What Matters{" "}
              <span className="text-primary">Campus</span>
              <span className="text-search-btn">Find</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-12 max-w-2xl mx-auto">
              Lost something? Found something? CampusFind helps students reconnect
              with their belongings across Kampala campuses.
            </p>
          </motion.div>

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 30 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-elevated">
              <p className="text-white/90 text-sm font-semibold mb-4 text-left">
                Search for Lost or Found Items
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Item name */}
                <div className="lg:col-span-1">
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Phone, Keys, Backpack…"
                    className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                  />
                </div>

                {/* Category */}
                <div className="relative lg:col-span-1">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                  >
                    <option value="" className="text-foreground">Category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value} className="text-foreground">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>

                {/* Location */}
                <div className="lg:col-span-1">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Specific Location…"
                    className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                  />
                </div>

                {/* Date */}
                <div className="relative lg:col-span-1">
                  <input
                    type="date"
                    className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 text-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                  />
                  <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>

                {/* Search button */}
                <button className="h-12 rounded-xl bg-search-btn text-search-btn-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-display text-2xl text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Items */}
      <section className="container pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-display text-2xl text-foreground">
            {searchName ? "Search Results" : "Recent Items"}
          </h2>
          {!searchName && (
            <Link to="/lost" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No items match your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}

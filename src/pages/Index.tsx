import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import ItemCard from "@/components/ItemCard";
import { mockItems } from "@/lib/mock-data";
import { useState } from "react";

const stats = [
  { icon: Shield, value: "94%", label: "Recovery rate with photos" },
  { icon: Clock, value: "48h", label: "Average return time" },
  { icon: Users, value: "3,200+", label: "Campus community members" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const recentItems = mockItems.slice(0, 4);
  const filtered = search
    ? mockItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase())
      )
    : recentItems;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container pt-20 pb-16 md:pt-32 md:pb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-display text-4xl md:text-7xl text-foreground text-balance mb-6">
              Lost it? Found it?{" "}
              <span className="text-primary">Bring it home.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              The trusted recovery platform for the student community in Kampala. Report, search, and reunite with your belongings.
            </p>

            <div className="mb-8">
              <SearchBar value={search} onChange={setSearch} placeholder="Search by item or location..." />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/upload">
                <Button variant="hero" size="xl">
                  Report Lost Item
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/upload">
                <Button variant="hero-outline" size="xl">
                  Post Found Item
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-16">
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
            {search ? "Search Results" : "Recent Items"}
          </h2>
          {!search && (
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

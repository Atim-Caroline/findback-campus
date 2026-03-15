import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CAMPUS_LOCATIONS } from "@/lib/mock-data";
import { toast } from "sonner";

export default function UploadItemPage() {
  const [status, setStatus] = useState<"lost" | "found">("lost");
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.location) {
      toast.error("Please fill in the required fields.");
      return;
    }
    toast.success("Item reported successfully! The community will help.");
    setForm({ title: "", category: "", description: "", location: "", date: "", contact: "" });
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-shadow";

  return (
    <div className="container py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h1 className="text-display text-3xl text-foreground mb-2">Report an Item</h1>
        <p className="text-muted-foreground mb-8">Help someone recover their belongings.</p>

        {/* Status toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setStatus("lost")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              status === "lost"
                ? "bg-status-lost-bg text-status-lost-fg shadow-sm"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            🔍 I Lost Something
          </button>
          <button
            onClick={() => setStatus("found")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              status === "found"
                ? "bg-status-found-bg text-status-found-fg shadow-sm"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            📦 I Found Something
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">Item Name *</label>
            <input
              type="text"
              placeholder="e.g., Samsung Galaxy A54"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">Description</label>
            <textarea
              placeholder="Describe the item (color, brand, distinguishing features)..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className={`${inputClass} h-auto py-3`}
            />
          </div>

          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">
              <MapPin className="w-3 h-3 inline mr-1" />
              Location *
            </label>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={inputClass}
            >
              <option value="">Where was it {status === "lost" ? "lost" : "found"}?</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">
              <Calendar className="w-3 h-3 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">Contact Info</label>
            <input
              type="text"
              placeholder="Phone number or email"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Image upload placeholder */}
          <div>
            <label className="text-ui-label text-muted-foreground mb-2 block">Photo</label>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Tap to add a photo</p>
              <p className="text-xs text-muted-foreground mt-1">Items with photos have 94% higher recovery</p>
            </div>
          </div>

          <Button variant="hero" size="xl" type="submit" className="w-full">
            <Upload className="w-5 h-5" />
            Submit Report
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, MapPin, Calendar, School, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/mock-data";
import { ugandaUniversities, universityDepartments, universityLocations } from "@/lib/university-data";
import { toast } from "sonner";

export default function UploadItemPage() {
  const [status, setStatus] = useState<"lost" | "found">("lost");
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    university: "",
    department: "",
    location: "",
    month: "",
    day: "",
    year: "",
    countryCode: "+256",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.location || !form.university) {
      toast.error("Please fill in the required fields.");
      return;
    }
    toast.success("Item reported successfully! The community will help.");
    setForm({ title: "", category: "", description: "", university: "", department: "", location: "", month: "", day: "", year: "", countryCode: "+256", phone: "" });
  };

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const countryCodes = [
    { code: "+256", label: "🇺🇬 +256 (Uganda)" },
    { code: "+254", label: "🇰🇪 +254 (Kenya)" },
    { code: "+255", label: "🇹🇿 +255 (Tanzania)" },
    { code: "+250", label: "🇷🇼 +250 (Rwanda)" },
    { code: "+251", label: "🇪🇹 +251 (Ethiopia)" },
    { code: "+1",   label: "🇺🇸 +1 (USA/Canada)" },
    { code: "+44",  label: "🇬🇧 +44 (UK)" },
  ];

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-shadow";

  const labelClass = "text-sm font-bold text-foreground mb-2 block tracking-wide";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-search-btn/5 py-10">
      <div className="container max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary/20">
            <Upload className="w-3 h-3" /> Report an Item
          </div>
          <h1 className="text-display text-4xl text-foreground mb-2">Lost or Found?</h1>
          <p className="text-muted-foreground italic font-medium tracking-wide text-base" style={{ fontFamily: "Georgia, serif" }}>Help someone recover their belongings — every report counts.</p>
        </div>

        {/* Status toggle */}
        <div className="flex gap-3 mb-8 p-1.5 bg-secondary rounded-2xl">
          <button
            onClick={() => setStatus("lost")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              status === "lost"
                ? "bg-search-btn text-white shadow-md scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🔍 I Lost Something
          </button>
          <button
            onClick={() => setStatus("found")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              status === "found"
                ? "bg-primary text-white shadow-md scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📦 I Found Something
          </button>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Item Name *</label>
            <input
              type="text"
              placeholder="e.g., Samsung Galaxy A54"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Category *</label>
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
            <label className={labelClass}>Description</label>
            <textarea
              placeholder="Describe the item (color, brand, distinguishing features)..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className={`${inputClass} h-auto py-3`}
            />
          </div>

          <div>
            <label className={labelClass}>
              <School className="w-3 h-3 inline mr-1 text-primary" />
              University *
            </label>
            <select
              value={form.university}
              onChange={(e) => setForm({ ...form, university: e.target.value })}
              className={inputClass}
              required
            >
              <option value="">Select University</option>
              {ugandaUniversities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <Building2 className="w-3 h-3 inline mr-1 text-primary" />
                Department
              </label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className={inputClass}
              >
                <option value="">Select Department</option>
                {universityDepartments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                <MapPin className="w-3 h-3 inline mr-1 text-search-btn" />
                Location *
              </label>
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
                required
              >
                <option value="">Where was it {status === "lost" ? "lost" : "found"}?</option>
                {universityLocations.map((cat) => (
                  <optgroup key={cat.category} label={cat.category}>
                    {cat.locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              <Calendar className="w-3 h-3 inline mr-1 text-search-btn" />
              Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className={inputClass}
              >
                <option value="">Month</option>
                {months.map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                ))}
              </select>
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className={inputClass}
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d).padStart(2, "0")}>{d}</option>
                ))}
              </select>
              <select
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className={inputClass}
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <div className="flex gap-2">
              <select
                value={form.countryCode}
                onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                className="h-12 px-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="700 000 000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`${inputClass} flex-1`}
              />
            </div>
          </div>

          {/* Image upload placeholder */}
          <div>
            <label className={labelClass}>Photo</label>
            <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 hover:bg-primary/5 transition-colors cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Tap to add a photo</p>
              <p className="text-xs text-muted-foreground mt-1">Items with photos have <span className="text-search-btn font-semibold">94% higher recovery</span></p>
            </div>
          </div>

          <Button
            variant="hero"
            size="xl"
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            <Upload className="w-5 h-5" />
            Submit Report
          </Button>
        </form>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

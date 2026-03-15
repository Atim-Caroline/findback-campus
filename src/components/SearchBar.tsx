import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search for lost items..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border shadow-elevated text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base transition-shadow"
      />
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, MapPin, User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/lost", label: "Lost Items" },
  { to: "/found", label: "Found Items" },
  { to: "/upload", label: "Report Item" },
  { to: "/chat", label: "Chat" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.png" 
              alt="CampusFind Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex items-center gap-0.5 text-xl font-extrabold tracking-tighter">
            <span className="text-primary">Campus</span>
            <span className="text-search-btn">Find</span>
          </div>
        </Link>

        {/* Center nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-white bg-white/15"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search button & Auth */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-search-btn flex items-center justify-center hover:opacity-90 transition-opacity">
            <Search className="w-5 h-5 text-search-btn-foreground" />
          </button>
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-navy border-t border-white/10"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

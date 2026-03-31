import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, MapPin, User, Bell } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mockItems } from "@/lib/mock-data";

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
  const { isAuthenticated, logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm border border-white/10 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="CampusFind Logo" 
              className="w-full h-full object-contain mix-blend-multiply" 
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

        {/* Auth button */}
        <div className="hidden lg:flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-navy" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-card border-border shadow-xl" align="end">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {/* Simulated Notification 1: Match */}
                <Link to="/item/1">
                  <div className="p-4 border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">New Match Found!</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          A "Samsung Galaxy" has been reported found at Freedom Square. This might be your lost item!
                        </p>
                        <span className="text-[10px] text-primary font-medium mt-1 inline-block">View Details</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Simulated Notification 2: Message */}
                <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Message from Patrick S.</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        "Hey, I think I found your laptop. Can we meet at the library?"
                      </p>
                      <span className="text-[10px] text-primary font-medium mt-1 inline-block">Reply Now</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 text-center border-t border-border">
                <Button variant="ghost" size="sm" className="text-[11px] h-8 w-full">View all notifications</Button>
              </div>
            </PopoverContent>
          </Popover>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                <User className="w-4 h-4" />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white/20 hover:bg-white/10 h-9"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors mr-1">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-navy" />
          </button>
          <button
            className="p-2 rounded-lg text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
              <div className="pt-2 px-4 pb-4">
                {isAuthenticated ? (
                  <Button 
                    className="w-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

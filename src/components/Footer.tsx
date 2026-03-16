import { Link } from "react-router-dom";
import { Search, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="CampusFind Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-display text-xl font-extrabold tracking-tighter">
                <span className="text-primary">Campus</span>
                <span className="text-search-btn">Find</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Reconnecting the campus community with their belongings. 94% of items with photos are returned within 48 hours.
            </p>
          </div>

          <div>
            <h4 className="text-ui-label text-muted-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/lost" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Lost Items</Link>
              <Link to="/found" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Found Items</Link>
              <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Report an Item</Link>
              <Link to="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Messages</Link>
            </div>
          </div>

          <div>
            <h4 className="text-ui-label text-muted-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Kampala, Uganda
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                hello@campusfind.ug
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 CampusFind. Built for the campus community.
          </p>
        </div>
      </div>
    </footer>
  );
}

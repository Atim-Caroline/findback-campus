import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle, School, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Item } from "@/lib/mock-data";
import { getTimeAgo, getCategoryIcon } from "@/lib/mock-data";
import { Link } from "react-router-dom";

interface ItemCardProps {
  item: Item;
  index?: number;
}

export default function ItemCard({ item, index = 0 }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card rounded-[20px] shadow-card border border-border overflow-hidden group h-full flex flex-col"
    >
      {/* Image area */}
      <div className="aspect-[4/3] rounded-[12px] m-3 relative overflow-hidden bg-secondary flex-shrink-0">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">{getCategoryIcon(item.category)}</span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {item.status === "lost" ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-status-lost-bg text-status-lost-fg uppercase tracking-wider shadow-sm">
              Lost
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-status-found-bg text-status-found-fg uppercase tracking-wider shadow-sm">
              Found
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <Link to={`/item/${item.id}`} className="px-4 pb-4 flex flex-col flex-1 cursor-pointer">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground text-base mb-1 truncate group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">{item.description}</p>
        </div>

        {/* University & Department */}
        <div className="space-y-1.5 mb-3 border-t border-border pt-3">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-tight">
            <School className="w-3 h-3 text-primary/70" />
            <span className="truncate font-medium text-foreground/80">{item.university}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-tight">
            <Building2 className="w-3 h-3 text-primary/70" />
            <span className="truncate">{item.department}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-4 mt-auto">
          <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
            <MapPin className="w-3 h-3 text-primary/60" />
            <span className="truncate max-w-[90px]">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
            <Clock className="w-3 h-3 text-primary/60" />
            {getTimeAgo(item.date)}
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="px-4 pb-4 mt-auto">
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
              {item.contactName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-foreground">{item.contactName}</span>
              <span className="text-[9px] text-muted-foreground">Contact Owner</span>
            </div>
          </div>
          <Link to="/chat">
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary/10 hover:text-primary h-8 w-8 p-0">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle } from "lucide-react";
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
      className="bg-card rounded-[20px] shadow-card border border-border overflow-hidden group"
    >
      {/* Image area */}
      <div className="aspect-[4/3] rounded-[12px] m-3 relative overflow-hidden bg-secondary">
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
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-status-lost-bg text-status-lost-fg uppercase tracking-wider">
              Lost
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-status-found-bg text-status-found-fg uppercase tracking-wider">
              Found
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h3 className="font-semibold text-foreground text-base mb-1 truncate">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{item.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate max-w-[120px]">{item.location}</span>
            {item.isRecent && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot ml-1" />
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {getTimeAgo(item.date)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
              {item.contactName.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground">{item.contactName}</span>
          </div>
          <Link to="/chat">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

import { useParams, Link } from "react-router-dom";
import { mockItems, getTimeAgo } from "@/lib/mock-data";
import { findPotentialMatches } from "@/lib/match-engine";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, School, Building2, MessageCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import ItemCard from "@/components/ItemCard";

export default function ItemDetailPage() {
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <Link to="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  const potentialMatches = findPotentialMatches(item, mockItems);

  return (
    <div className="container py-8">
      <Link to={item.status === "lost" ? "/lost" : "/found"} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to {item.status === "lost" ? "Lost Items" : "Found Items"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="aspect-video bg-secondary relative">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
                  {item.category === "phone" ? "📱" : item.category === "laptop" ? "💻" : "📦"}
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md ${
                  item.status === "lost" ? "bg-status-lost-bg text-status-lost-fg" : "bg-status-found-bg text-status-found-fg"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <School className="w-4 h-4 text-primary" />
                      {item.university}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      {getTimeAgo(item.date)}
                    </div>
                  </div>
                </div>
                <Link to="/chat">
                  <Button className="rounded-full px-6">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact {item.contactName}
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Department</p>
                      <p className="text-sm font-medium">{item.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Location</p>
                      <p className="text-sm font-medium">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rule-Based Matches Section */}
          {potentialMatches.length > 0 && (
            <div className="pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Potential Matches</h2>
                  <p className="text-sm text-muted-foreground">Our smart engine found items that might be a match.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {potentialMatches.map((match, i) => (
                  <div key={match.item.id} className="relative group">
                    <ItemCard item={match.item} index={i} />
                    <div className="absolute -top-2 -right-2 z-10 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                      {match.score}% Match
                    </div>
                    <div className="mt-2 p-3 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-[10px] font-bold text-green-700 uppercase mb-1">Why it matches:</p>
                      <ul className="text-[10px] text-green-600 space-y-0.5">
                        {match.matchedReasons.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Safety Tips & Community */}
        <div className="space-y-6">
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Safety Tips
            </h3>
            <ul className="text-sm space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                Always meet in a public place on campus.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                Verify the item details before handing it over.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                Don't share personal financial information.
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-bold mb-4">Report Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">{item.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Posted by</span>
                <span className="font-medium">{item.contactName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Report ID</span>
                <span className="font-mono text-[10px] bg-secondary px-1.5 py-0.5 rounded">CF-{item.id}00{item.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

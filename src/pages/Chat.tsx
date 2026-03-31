import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  itemRef: string;
  isNew?: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

const defaultConversations: Conversation[] = [
  { id: "1", name: "Aisha N.", lastMessage: "I think that's my phone!", time: "2m ago", unread: 2, itemRef: "Samsung Galaxy A54" },
  { id: "2", name: "Gloria M.", lastMessage: "Can we meet at the guild?", time: "1h ago", unread: 0, itemRef: "Car & House Keys" },
  { id: "3", name: "Faith A.", lastMessage: "My student number is 21/U/...", time: "3h ago", unread: 1, itemRef: "Student ID Card" },
];

const defaultMessages: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Hi! I saw your post about the Samsung phone found at Freedom Square.", sender: "other", time: "2:30 PM" },
    { id: "2", text: "Yes! Can you describe it to verify ownership?", sender: "me", time: "2:31 PM" },
    { id: "3", text: "It has a cracked screen protector and the lock screen is a photo of a cat 🐱", sender: "other", time: "2:32 PM" },
    { id: "4", text: "That matches! Let's arrange a meetup. Are you free at the Guild Canteen around 4 PM?", sender: "me", time: "2:33 PM" },
    { id: "5", text: "I think that's my phone!", sender: "other", time: "2:34 PM" },
  ],
  "2": [
    { id: "1", text: "Hi Gloria, I found your keys at the library.", sender: "me", time: "1:00 PM" },
    { id: "2", text: "Can we meet at the guild?", sender: "other", time: "1:05 PM" },
  ],
  "3": [
    { id: "1", text: "Hi, I think I found your student ID.", sender: "me", time: "10:00 AM" },
    { id: "2", text: "My student number is 21/U/...", sender: "other", time: "10:05 AM" },
  ],
};

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(defaultConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(defaultMessages);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const contactName = searchParams.get("contact");
    const itemRef = searchParams.get("item");
    const id = searchParams.get("id");
    if (!contactName || !id) return;

    setConversations((prev) => {
      const exists = prev.find((c) => c.id === id);
      if (exists) return prev;
      return [
        { id, name: contactName, lastMessage: "Tap to start chatting", time: "Now", unread: 0, itemRef: itemRef ?? "", isNew: true },
        ...prev,
      ];
    });

    setMessages((prev) => ({
      ...prev,
      [id]: prev[id] ?? [],
    }));

    setActiveConvo(id);
  }, [searchParams]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const active = conversations.find((c) => c.id === activeConvo);
  const activeMessages = activeConvo ? (messages[activeConvo] ?? []) : [];

  return (
    <div className="container py-4 md:py-8">
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden h-[calc(100vh-10rem)] flex">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r border-border flex flex-col ${activeConvo ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <h2 className="text-display text-lg text-foreground">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActiveConvo(convo.id)}
                className={`w-full text-left p-4 border-b border-border hover:bg-secondary/50 transition-colors ${
                  activeConvo === convo.id ? "bg-secondary/70" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {convo.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-foreground">{convo.name}</span>
                      <span className="text-xs text-muted-foreground">{convo.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                    <p className="text-ui-label text-primary mt-1">RE: {convo.itemRef}</p>
                  </div>
                  {convo.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!activeConvo ? "hidden md:flex" : "flex"}`}>
          {active ? (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <button onClick={() => setActiveConvo(null)} className="md:hidden p-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold border border-primary/20">
                  {active.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{active.name}</div>
                  <div className="text-xs text-muted-foreground">RE: {active.itemRef}</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                      {active.name.charAt(0)}
                    </div>
                    <p className="font-semibold text-foreground">{active.name}</p>
                    <p className="text-xs text-muted-foreground">RE: {active.itemRef}</p>
                    <p className="text-sm text-muted-foreground mt-2">Send an image to start the conversation.</p>
                  </div>
                ) : (
                  activeMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender === "me"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary text-secondary-foreground rounded-bl-md"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-border">
                {imagePreview && (
                  <div className="relative inline-block mb-2">
                    <img src={imagePreview} alt="preview" className="h-20 w-20 object-cover rounded-xl border border-border" />
                    <button
                      onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-12 w-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors shrink-0"
                  >
                    <ImagePlus className="w-5 h-5" />
                  </button>
                  <Button variant="default" size="icon" className="h-12 w-12 rounded-xl shrink-0">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl mb-3">💬</p>
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

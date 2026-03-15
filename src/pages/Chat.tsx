import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  itemRef: string;
}

const mockConversations: Conversation[] = [
  { id: "1", name: "Aisha N.", lastMessage: "I think that's my phone!", time: "2m ago", unread: 2, itemRef: "Samsung Galaxy A54" },
  { id: "2", name: "Gloria M.", lastMessage: "Can we meet at the guild?", time: "1h ago", unread: 0, itemRef: "Car & House Keys" },
  { id: "3", name: "Faith A.", lastMessage: "My student number is 21/U/...", time: "3h ago", unread: 1, itemRef: "Student ID Card" },
];

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

const mockMessages: Message[] = [
  { id: "1", text: "Hi! I saw your post about the Samsung phone found at Freedom Square.", sender: "other", time: "2:30 PM" },
  { id: "2", text: "Yes! Can you describe it to verify ownership?", sender: "me", time: "2:31 PM" },
  { id: "3", text: "It has a cracked screen protector and the lock screen is a photo of a cat 🐱", sender: "other", time: "2:32 PM" },
  { id: "4", text: "That matches! Let's arrange a meetup. Are you free at the Guild Canteen around 4 PM?", sender: "me", time: "2:33 PM" },
  { id: "5", text: "I think that's my phone!", sender: "other", time: "2:34 PM" },
];

export default function ChatPage() {
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const active = mockConversations.find((c) => c.id === activeConvo);

  return (
    <div className="container py-4 md:py-8">
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden h-[calc(100vh-10rem)] flex">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r border-border flex flex-col ${activeConvo ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <h2 className="text-display text-lg text-foreground">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((convo) => (
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
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {active.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{active.name}</div>
                  <div className="text-xs text-muted-foreground">RE: {active.itemRef}</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockMessages.map((msg) => (
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
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 h-12 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  <Button variant="default" size="icon" className="h-12 w-12 rounded-xl">
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

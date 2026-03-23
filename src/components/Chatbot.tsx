import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight, Info, HelpCircle, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: { label: string; action: () => void }[];
  isFeedbackInput?: boolean;
}

const BOT_AVATAR = "https://api.dicebear.com/7.x/bottts/svg?seed=CampusBot&backgroundColor=b6e3f4";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! 👋 Welcome to CampusFind. I'm your campus guide. How can I help you today?",
          isBot: true,
          options: [
            { label: "I lost an item", action: () => handleAction("lost") },
            { label: "I found an item", action: () => handleAction("found") },
            { label: "How do matches work?", action: () => handleAction("matches") },
            { label: "Sign Up / Login", action: () => handleAction("auth") },
            { label: "Send Feedback", action: () => handleAction("feedback_start") },
          ],
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAction = (type: string) => {
    let response = "";
    let nextOptions: any[] = [];
    let isFeedback = false;

    switch (type) {
      case "lost":
        response = "I'm sorry to hear that! You should first check the 'Found Items' page to see if someone has already reported it. If not, click 'Report Item' to let the community know.";
        nextOptions = [
          { label: "View Found Items", action: () => navigate("/found") },
          { label: "Report Lost Item", action: () => navigate("/upload") },
        ];
        break;
      case "found":
        response = "That's very kind of you! Please go to the 'Report Item' page and fill in the details. You can also check the 'Lost Items' page to see if anyone is looking for it.";
        nextOptions = [
          { label: "Report Found Item", action: () => navigate("/upload") },
          { label: "View Lost Items", action: () => navigate("/lost") },
        ];
        break;
      case "matches":
        response = "Our smart matching engine automatically compares lost and found reports based on category, university, and keywords. If a match is found, you'll see a red badge on your notification bell! 🔔";
        nextOptions = [
          { label: "Got it, thanks!", action: () => setIsOpen(false) },
        ];
        break;
      case "auth":
        response = "Creating an account allows you to chat with other users and get instant match alerts. Click below to get started!";
        nextOptions = [
          { label: "Go to Sign In / Up", action: () => navigate("/auth") },
        ];
        break;
      case "feedback_start":
        response = "We'd love to hear your thoughts! Please type your feedback below and click send.";
        isFeedback = true;
        break;
    }

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: response, isBot: true, options: nextOptions, isFeedbackInput: isFeedback },
    ]);
  };

  const submitFeedback = () => {
    if (!feedbackText.trim()) return;
    
    setIsSendingFeedback(true);
    // Simulate API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() - 1, text: feedbackText, isBot: false },
        { 
          id: Date.now(), 
          text: "Thank you for your feedback! ❤️ We've received it and our team will look into it to improve CampusFind.", 
          isBot: true,
          options: [{ label: "Back to Main Menu", action: () => setMessages([]) }]
        },
      ]);
      setFeedbackText("");
      setIsSendingFeedback(false);
      toast.success("Feedback sent successfully!");
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] sm:w-[380px] bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-sm">
                  <img src={BOT_AVATAR} alt="Bot Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold">Campus Guide</p>
                  <p className="text-[10px] opacity-80">Online • Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 max-h-[400px] overflow-y-auto space-y-4 bg-slate-50/50"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.isBot ? "justify-start" : "justify-end flex-row-reverse"}`}>
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                      <img src={BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? "bg-white border border-border text-foreground shadow-sm rounded-bl-none" 
                      : "bg-primary text-white rounded-br-none"
                  }`}>
                    {msg.text}
                    
                    {msg.options && (
                      <div className="mt-3 space-y-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={opt.action}
                            className="w-full text-left p-2 rounded-xl border border-primary/20 bg-primary/5 text-primary text-[11px] font-medium hover:bg-primary hover:text-white transition-all flex items-center justify-between group"
                          >
                            {opt.label}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-white flex items-center gap-2">
              {messages[messages.length - 1]?.isFeedbackInput ? (
                <>
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Type feedback..."
                    className="flex-1 h-10 px-4 rounded-full bg-secondary/50 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                    onKeyDown={(e) => e.key === "Enter" && submitFeedback()}
                  />
                  <Button 
                    size="icon" 
                    className="rounded-full w-10 h-10 shrink-0"
                    onClick={submitFeedback}
                    disabled={isSendingFeedback || !feedbackText.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex-1 h-10 px-4 rounded-full bg-secondary/50 border border-border flex items-center text-xs text-muted-foreground italic">
                    Choose an option above to continue...
                  </div>
                  <Button size="icon" className="rounded-full w-10 h-10 shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isOpen ? "bg-slate-200 text-foreground" : "bg-primary text-white"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white animate-bounce">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useStratagemStore } from '@/store/stratagemStore';
import { chatService } from '@/lib/chat';
import { Message } from '../../../worker/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
export function AnalystChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const setAnalystContext = useStratagemStore(s => s.setAnalystContext);
  const inventory = useStratagemStore(s => s.inventory);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    // Mock response logic for simulation speed (would normally call chatService)
    setTimeout(() => {
      // Simulate SKU context detection
      const foundSku = inventory.find(item => input.toUpperCase().includes(item.sku));
      if (foundSku) {
        setAnalystContext({ activeSku: foundSku.sku });
      }
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: foundSku 
          ? `I've analyzed ${foundSku.sku}. Its sales velocity is ${foundSku.velocity} units/day. At current stock levels (${foundSku.stock}), you have ${foundSku.daysOfSupply} days of supply remaining. I recommend monitoring the replenishment order closely.`
          : "I've reviewed the general metrics. Revenue is trending upwards, but inventory turnover is slowing in the Home Decor category. Would you like a breakdown of specific SKUs in that category?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-60">
            <Bot className="h-12 w-12 text-indigo-500" />
            <div>
              <p className="font-semibold">Stratagem Analyst Ready</p>
              <p className="text-sm text-muted-foreground">Ask me about SKU performance, stock risks, or pricing simulations.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Why is SKU-1002 low?', 'Simulate a 10% price drop', 'Inventory summary'].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full border bg-muted hover:bg-accent transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-start gap-3 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                m.role === 'user' ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white border-border"
              )}>
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-indigo-600" />}
              </div>
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                m.role === 'user' ? "bg-indigo-600 text-white" : "bg-card border"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex items-start gap-3 mr-auto animate-pulse">
            <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
              <Bot className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-card border text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>
      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
          <Input 
            placeholder="Type your question..." 
            className="flex-1 pr-12 h-12 rounded-xl focus-visible:ring-indigo-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            className="absolute right-1.5 h-9 w-9 p-0 bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          Agent utilizes real-time store metrics for recommendations. AI usage is capped.
        </p>
      </div>
    </div>
  );
}
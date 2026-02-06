import React, { useState, useRef, useEffect } from 'react';
import { useStratagemStore } from '@/store/stratagemStore';
import { chatService } from '@/lib/chat';
import { Message } from '../../../worker/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Loader2, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
export function AnalystChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const setAnalystContext = useStratagemStore(s => s.setAnalystContext);
  const inventory = useStratagemStore(s => s.inventory);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent, isTyping]);
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
    setStreamingContent('');
    try {
      let fullResponse = '';
      await chatService.sendMessage(input, undefined, (chunk) => {
        fullResponse += chunk;
        setStreamingContent(prev => prev + chunk);
      });
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fullResponse || "I've analyzed the request, but I couldn't generate a specific response at this time.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
      // Detect SKU context from response or input
      const combinedText = (input + " " + fullResponse).toUpperCase();
      const foundSku = inventory.find(item => combinedText.includes(item.sku));
      if (foundSku) {
        setAnalystContext({ activeSku: foundSku.sku });
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
      setStreamingContent('');
    }
  };
  const clearHistory = async () => {
    await chatService.clearMessages();
    setMessages([]);
    setAnalystContext(null);
  };
  return (
    <div className="flex flex-col h-full bg-background">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 && !isTyping && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-60">
            <div className="p-4 rounded-full bg-indigo-50 border border-indigo-100">
              <Sparkles className="h-8 w-8 text-indigo-500 animate-pulse" />
            </div>
            <div>
              <p className="font-semibold text-lg">E-commerce Decision Intelligence</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                I can analyze stockouts, simulate price changes, or audit your ad spend efficiency.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Audit SKU-1002 risk', 'Simulate high growth', 'Inventory turnover report'].map(s => (
                <button key={s} onClick={() => setInput(s)} className="text-xs px-3 py-1.5 rounded-full border bg-muted hover:bg-accent transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex items-start gap-3 max-w-[90%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}
            >
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm", m.role === 'user' ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white border-border")}>
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-indigo-600" />}
              </div>
              <div className={cn("px-4 py-3 rounded-2xl text-sm leading-relaxed", m.role === 'user' ? "bg-indigo-600 text-white shadow-indigo-100" : "bg-card border shadow-sm")}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex items-start gap-3 mr-auto">
            <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
              <Bot className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-card border text-sm text-muted-foreground shadow-sm">
              {streamingContent || <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
        <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" onClick={clearHistory} className="h-10 w-10 text-muted-foreground hover:text-rose-500 transition-colors">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Interrogate your store data..."
            className="flex-1 pr-12 h-12 rounded-xl focus-visible:ring-indigo-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button className="absolute right-1.5 h-9 w-9 p-0 bg-indigo-600 hover:bg-indigo-700" onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
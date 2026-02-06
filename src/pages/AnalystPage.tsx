import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AnalystChat } from '@/components/analyst/AnalystChat';
import { DataWidget } from '@/components/analyst/DataWidget';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Info, Network, BarChart2, Lightbulb } from 'lucide-react';
import { useStratagemStore } from '@/store/stratagemStore';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
export function AnalystPage() {
  const [viewMode, setViewMode] = useState<'stats' | 'reasoning'>('stats');
  const activeSku = useStratagemStore(s => s.analystContext?.activeSku);
  const inventory = useStratagemStore(s => s.inventory);
  const currentItem = inventory.find(i => i.sku === activeSku);
  const suggestions = [
    "Why is revenue projecting down?",
    "Which SKU has highest turnover?",
    "Simulate 5% price hike on Furniture"
  ];
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-12rem)] min-h-[600px]">
        {/* Chat Interface - 7 columns */}
        <div className="lg:col-span-7 flex flex-col min-h-0 border border-border/60 rounded-3xl overflow-hidden bg-card shadow-xl shadow-slate-200/50">
          <div className="p-5 border-b bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-sm tracking-tight">Stratagem Senior Analyst</h2>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Decision Engine Active</p>
              </div>
            </div>
            <div className="flex p-1 bg-muted rounded-lg border">
              <Button
                variant={viewMode === 'stats' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('stats')}
                className="h-8 text-xs font-bold rounded-md"
              >
                <BarChart2 className="h-3.5 w-3.5 mr-1" /> INSIGHTS
              </Button>
              <Button
                variant={viewMode === 'reasoning' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('reasoning')}
                className="h-8 text-xs font-bold rounded-md"
              >
                <Network className="h-3.5 w-3.5 mr-1" /> LOGIC
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-card via-card/80 to-transparent p-3 overflow-hidden">
               <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-700">
                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {suggestions.map(s => (
                    <span key={s} className="text-[10px] whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                      {s}
                    </span>
                  ))}
                </div>
               </div>
            </div>
            <AnalystChat />
          </div>
        </div>
        {/* Context Panel - 5 columns */}
        <div className="lg:col-span-5 hidden lg:flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              {viewMode === 'stats' ? (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {currentItem ? (
                    <>
                      <motion.div layoutId="context-card">
                        <DataWidget type="sku-summary" data={currentItem} />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <DataWidget type="trend-chart" data={currentItem} />
                      </motion.div>
                    </>
                  ) : (
                    <Card className="p-16 text-center flex flex-col items-center justify-center space-y-6 bg-slate-50 border-dashed border-2">
                      <div className="p-6 bg-white rounded-full shadow-lg">
                        <Info className="h-10 w-10 text-slate-300" />
                      </div>
                      <div className="max-w-xs">
                        <h3 className="font-bold text-xl">Waiting for Context</h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          Mention a specific SKU or click 'Analyze' on a decision feed item to populate this panel with real-time health metrics.
                        </p>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="reasoning"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-8 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                      <Network className="h-5 w-5 text-indigo-500" />
                      Causal Reasoning Map
                    </h3>
                    <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                      {[
                        { t: 'Observation', d: `Velocity for ${currentItem?.sku || 'SKU'} is trending up 12%.`, c: 'text-indigo-600', bg: 'bg-indigo-500' },
                        { t: 'Constraint', d: 'Inventory safety threshold set at 14 days of supply.', c: 'text-amber-600', bg: 'bg-amber-500' },
                        { t: 'Risk Detection', d: 'Current velocity will deplete stock in 4.2 days.', c: 'text-rose-600', bg: 'bg-rose-500' },
                        { t: 'Intervention', d: 'Proposed: Pause Meta/TikTok campaigns immediately.', c: 'text-emerald-600', bg: 'bg-emerald-500' }
                      ].map((step, i) => (
                        <div key={i} className="pl-10 relative">
                          <div className={cn("absolute left-1 top-1 h-6 w-6 rounded-full border-4 border-white shadow-md", step.bg)} />
                          <h4 className={cn("text-[10px] font-black uppercase tracking-widest mb-1", step.c)}>{step.t}</h4>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">{step.d}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </AppLayout>
  );
}
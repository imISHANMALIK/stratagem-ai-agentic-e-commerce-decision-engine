import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AnalystChat } from '@/components/analyst/AnalystChat';
import { DataWidget } from '@/components/analyst/DataWidget';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Info, Network, BarChart2 } from 'lucide-react';
import { useStratagemStore } from '@/store/stratagemStore';
import { motion, AnimatePresence } from 'framer-motion';
export function AnalystPage() {
  const [viewMode, setViewMode] = useState<'stats' | 'reasoning'>('stats');
  const activeSku = useStratagemStore(s => s.analystContext?.activeSku);
  const inventory = useStratagemStore(s => s.inventory);
  const currentItem = inventory.find(i => i.sku === activeSku);
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-10rem)]">
        {/* Chat Interface - 7 columns */}
        <div className="lg:col-span-7 flex flex-col min-h-0 border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              <h2 className="font-semibold">AI Strategy Analyst</h2>
            </div>
            <div className="flex gap-1">
              <Button 
                variant={viewMode === 'stats' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('stats')}
                className="h-8 text-xs"
              >
                <BarChart2 className="h-3.5 w-3.5 mr-1" /> Insights
              </Button>
              <Button 
                variant={viewMode === 'reasoning' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('reasoning')}
                className="h-8 text-xs"
              >
                <Network className="h-3.5 w-3.5 mr-1" /> Reasoning
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <AnalystChat />
          </div>
        </div>
        {/* Context Panel - 5 columns */}
        <div className="lg:col-span-5 hidden lg:flex flex-col gap-6 overflow-y-auto">
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
                    <DataWidget type="sku-summary" data={currentItem} />
                    <DataWidget type="trend-chart" data={currentItem} />
                  </>
                ) : (
                  <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4 bg-muted/20 border-dashed">
                    <div className="p-3 bg-background rounded-full shadow-sm">
                      <Info className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">No Item Context</h3>
                      <p className="text-sm text-muted-foreground">
                        Ask about a specific SKU or category to see detailed performance analytics here.
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
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Network className="h-4 w-4 text-indigo-500" />
                    Strategy Reasoning Chain
                  </h3>
                  <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                    {[
                      { t: 'Observation', d: 'Inventory velocity for SKU-1002 increased by 40% over the weekend.' },
                      { t: 'Constraint Check', d: 'Safety stock limit is set to 7 days of supply.' },
                      { t: 'Risk Analysis', d: 'Current velocity suggests stockout in 3.2 days.' },
                      { t: 'Intervention', d: 'Proposed: Pause Meta Ad Campaigns for SKU-1002 immediately.' }
                    ].map((step, i) => (
                      <div key={i} className="pl-8 relative">
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm" />
                        <h4 className="text-xs font-bold uppercase text-indigo-600 mb-1">{step.t}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.d}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}
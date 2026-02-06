import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, TrendingUp, TrendingDown, Percent, Zap } from 'lucide-react';
import { useStratagemStore } from '@/store/stratagemStore';
import { cn } from '@/lib/utils';
export function StrategySimulator() {
  const isSimulating = useStratagemStore(s => s.isSimulating);
  const growthWeight = useStratagemStore(s => s.growthWeight);
  // Derived mock deltas for visual effect
  const revenueDelta = (growthWeight * 0.15).toFixed(1);
  const marginDelta = (growthWeight * -0.05).toFixed(1);
  return (
    <AnimatePresence>
      {isSimulating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 w-72"
        >
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <Loader2 className="h-5 w-5 text-indigo-400 animate-spin" />
              <span className="text-sm font-semibold">Recalculating Projections...</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-white/60">Revenue Boost</span>
                </div>
                <span className="text-xs font-bold text-emerald-400">+{revenueDelta}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-rose-400" />
                  <span className="text-xs text-white/60">Margin Shift</span>
                </div>
                <span className="text-xs font-bold text-rose-400">{marginDelta}%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
              <Zap className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">
                Stratagem AI v2.5
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
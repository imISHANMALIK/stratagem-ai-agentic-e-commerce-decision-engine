import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ReasoningGraphProps {
  reasoning: string[];
}
export function ReasoningGraph({ reasoning }: ReasoningGraphProps) {
  const getStepType = (index: number, total: number) => {
    if (index === 0) return { label: 'Observation', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' };
    if (index === total - 1) return { label: 'Decision', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (index === 1) return { label: 'Constraint', icon: Search, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Risk Analysis', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' };
  };
  return (
    <div className="relative py-4">
      {reasoning.map((text, i) => {
        const type = getStepType(i, reasoning.length);
        const Icon = type.icon;
        return (
          <div key={i} className="relative mb-6 last:mb-0">
            {i < reasoning.length - 1 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                className="absolute left-[19px] top-10 w-0.5 bg-slate-200"
                transition={{ delay: i * 0.2, duration: 0.5 }}
              />
            )}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className={cn(
                "z-10 h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0",
                type.bg, type.border
              )}>
                <Icon className={cn("h-5 w-5", type.color)} />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", type.color)}>
                    {type.label}
                  </span>
                  <ArrowRight className="h-3 w-3 text-slate-300" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
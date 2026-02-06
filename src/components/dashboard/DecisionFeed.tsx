import React, { useState } from 'react';
import { useStratagemStore } from '@/store/stratagemStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfidenceBadge, ImpactBadge } from '@/components/ui/custom-badges';
import { ChevronDown, ChevronUp, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
export function DecisionFeed() {
  const decisions = useStratagemStore(s => s.decisions);
  const handleDecision = useStratagemStore(s => s.handleDecision);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pendingDecisions = decisions.filter(d => d.status === 'pending');
  if (pendingDecisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed">
        <div className="bg-slate-100 p-3 rounded-full mb-3">
          <Check className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-600">No pending interventions</p>
        <p className="text-xs text-muted-foreground mt-1">System is operating within target constraints.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {pendingDecisions.map((decision) => (
        <Card key={decision.id} className="overflow-hidden border-l-4 border-l-indigo-500 shadow-sm transition-all hover:shadow-md">
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <ImpactBadge impact={decision.impact} />
              <ConfidenceBadge confidence={decision.confidence} />
            </div>
            <h3 className="font-semibold text-sm leading-tight mb-1">{decision.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {decision.description}
            </p>
            <div className="flex items-center justify-between gap-2 mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-[10px] px-2"
                onClick={() => setExpandedId(expandedId === decision.id ? null : decision.id)}
              >
                {expandedId === decision.id ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                Reasoning
              </Button>
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 hover:bg-rose-50 hover:text-rose-600 border-rose-100"
                  onClick={() => handleDecision(decision.id, 'rejected')}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => handleDecision(decision.id, 'accepted')}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {expandedId === decision.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-50 border-t"
              >
                <div className="p-4 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> 
                    Evidence Chain
                  </p>
                  <ul className="space-y-2">
                    {decision.reasoning.map((r, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
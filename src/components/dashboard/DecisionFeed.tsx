import React, { useState } from 'react';
import { useStratagemStore } from '@/store/stratagemStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfidenceBadge, ImpactBadge } from '@/components/ui/custom-badges';
import { ChevronDown, ChevronUp, Check, X, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReasoningGraph } from './ReasoningGraph';
import { useNavigate } from 'react-router-dom';
export function DecisionFeed() {
  const decisions = useStratagemStore(s => s.decisions);
  const handleDecision = useStratagemStore(s => s.handleDecision);
  const setAnalystContext = useStratagemStore(s => s.setAnalystContext);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const pendingDecisions = decisions.filter(d => d.status === 'pending');
  const handleDeepAnalyze = (decision: any) => {
    setAnalystContext({ activeSku: decision.title.split(' ').pop() });
    navigate('/analyst');
  };
  if (pendingDecisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed bg-muted/20">
        <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
          <Check className="h-6 w-6 text-emerald-500" />
        </div>
        <p className="text-sm font-medium text-slate-600">Interventions Complete</p>
        <p className="text-xs text-muted-foreground mt-1">Operational constraints are satisfied.</p>
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
                className="h-8 text-[10px] px-2 text-indigo-600 font-bold hover:bg-indigo-50"
                onClick={() => setExpandedId(expandedId === decision.id ? null : decision.id)}
              >
                {expandedId === decision.id ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                VIEW EVIDENCE
              </Button>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleDecision(decision.id, 'rejected')}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" className="h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-700" onClick={() => handleDecision(decision.id, 'accepted')}>
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
                <div className="p-4">
                  <ReasoningGraph reasoning={decision.reasoning} />
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 h-9 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 group"
                    onClick={() => handleDeepAnalyze(decision)}
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform" />
                    Discuss Reasoning with Analyst
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
interface ConfidenceBadgeProps {
  confidence: number;
}
export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  let colorClass = "bg-rose-50 text-rose-700 border-rose-200";
  let label = "Low";
  if (confidence >= 90) {
    colorClass = "bg-indigo-50 text-indigo-700 border-indigo-200";
    label = "High";
  } else if (confidence >= 70) {
    colorClass = "bg-amber-50 text-amber-700 border-amber-200";
    label = "Medium";
  }
  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase py-0 px-1.5", colorClass)}>
      {label} Confidence ({confidence}%)
    </Badge>
  );
}
interface ImpactBadgeProps {
  impact: 'High' | 'Medium' | 'Low';
}
export function ImpactBadge({ impact }: ImpactBadgeProps) {
  const styles = {
    High: "bg-rose-600 text-white",
    Medium: "bg-amber-500 text-white",
    Low: "bg-slate-500 text-white",
  };
  return (
    <Badge className={cn("text-[10px] font-bold rounded-sm h-5", styles[impact])}>
      {impact} Impact
    </Badge>
  );
}
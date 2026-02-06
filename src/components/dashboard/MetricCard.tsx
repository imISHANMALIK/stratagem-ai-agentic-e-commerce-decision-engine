import React from 'react';
import { Card } from '@/components/ui/card';
import { Metric } from '@/store/stratagemStore';
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
interface MetricCardProps {
  metric: Metric;
}
export function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.trend >= 0;
  const getIcon = () => {
    switch (metric.unit) {
      case 'currency': return <DollarSign className="h-4 w-4" />;
      case 'percent': return <Percent className="h-4 w-4" />;
      default: return <BarChart2 className="h-4 w-4" />;
    }
  };
  const formatValue = (val: number) => {
    if (metric.unit === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    }
    if (metric.unit === 'percent') {
      return `${val}%`;
    }
    return val.toLocaleString();
  };
  return (
    <Card className="p-6 transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-accent text-accent-foreground">
          {getIcon()}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(metric.trend)}%
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
        <h3 className="text-2xl font-bold mt-1 tracking-tight">{formatValue(metric.value)}</h3>
      </div>
    </Card>
  );
}
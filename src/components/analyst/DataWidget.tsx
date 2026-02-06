import React from 'react';
import { Card } from '@/components/ui/card';
import { InventoryItem } from '@/store/stratagemStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Package, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
interface DataWidgetProps {
  type: 'trend-chart' | 'sku-summary';
  data: InventoryItem;
}
export function DataWidget({ type, data }: DataWidgetProps) {
  if (type === 'sku-summary') {
    return (
      <Card className="p-6 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute -right-8 -top-8 opacity-10">
          <Package className="h-32 w-32 rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="text-white/60 border-white/20 mb-1">{data.sku}</Badge>
              <h3 className="text-xl font-bold">{data.name}</h3>
            </div>
            <Badge className={cn(
              "font-bold",
              data.status === 'Critical' ? "bg-rose-500" : data.status === 'Low' ? "bg-amber-500" : "bg-emerald-500"
            )}>
              {data.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Current Stock</p>
              <p className="text-2xl font-mono font-bold">{data.stock} <span className="text-sm font-normal text-white/40">units</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Sales Velocity</p>
              <p className="text-2xl font-mono font-bold text-indigo-400">{data.velocity} <span className="text-sm font-normal text-white/40">p/day</span></p>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  // Trend Chart
  const chartData = [
    { name: 'W1', sales: Math.floor(data.velocity * 0.8) },
    { name: 'W2', sales: Math.floor(data.velocity * 1.2) },
    { name: 'W3', sales: Math.floor(data.velocity * 0.9) },
    { name: 'W4', sales: data.velocity },
  ];
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          4-Week Velocity Trend
        </h4>
        <span className="text-xs font-medium text-emerald-600 flex items-center">
          +12.4% <Zap className="h-3 w-3 ml-1 fill-emerald-600" />
        </span>
      </div>
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" hide />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 3 ? '#6366f1' : '#e2e8f0'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
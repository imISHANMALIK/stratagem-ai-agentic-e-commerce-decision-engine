import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useStratagemStore } from '@/store/stratagemStore';
export function SalesChart() {
  const data = useStratagemStore(s => s.salesHistory);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#64748b' }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#64748b' }}
          tickFormatter={(val) => `$${val/1000}k`}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            padding: '12px'
          }}
          formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#4f46e5" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorRev)" 
          name="Actual Revenue"
          animationDuration={1500}
        />
        <Area 
          type="monotone" 
          dataKey="projected" 
          stroke="#f59e0b" 
          strokeWidth={2}
          strokeDasharray="5 5"
          fillOpacity={1} 
          fill="url(#colorProj)" 
          name="AI Projection"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
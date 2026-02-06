import React from 'react';
import { useStratagemStore } from '@/store/stratagemStore';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
export function StockHeatmap() {
  const inventory = useStratagemStore(s => s.inventory);
  const data = inventory.map(item => ({
    x: item.daysOfSupply,
    y: item.velocity,
    z: 10,
    name: item.name,
    sku: item.sku,
    status: item.status
  }));
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-white/10 text-xs">
          <p className="font-bold mb-1">{d.name}</p>
          <p className="opacity-70 mb-2">{d.sku}</p>
          <div className="space-y-1">
            <p><span className="opacity-50">Supply:</span> {d.x} days</p>
            <p><span className="opacity-50">Velocity:</span> {d.y} units/day</p>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Days of Supply" 
          stroke="#94a3b8" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        >
          <Label value="Days of Supply" position="insideBottom" offset={-10} fill="#64748b" fontSize={12} />
        </XAxis>
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Velocity" 
          stroke="#94a3b8" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        >
          <Label value="Daily Velocity" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#64748b" fontSize={12} />
        </YAxis>
        <ZAxis type="number" range={[100, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Scatter name="SKUs" data={data}>
          {data.map((entry, index) => (
            <circle
              key={`cell-${index}`}
              cx={0}
              cy={0}
              r={6}
              fill={
                entry.status === 'Critical' ? '#f43f5e' : 
                entry.status === 'Low' ? '#f59e0b' : '#10b981'
              }
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
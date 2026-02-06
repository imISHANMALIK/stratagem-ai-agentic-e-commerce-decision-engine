import { create } from 'zustand';
import { addDays, subDays, format } from 'date-fns';
export interface Metric {
  id: string;
  label: string;
  value: number;
  trend: number;
  unit: 'currency' | 'percent' | 'number';
}
export interface Decision {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
  type: 'Inventory' | 'Marketing' | 'Pricing';
  status: 'pending' | 'accepted' | 'rejected';
  reasoning: string[];
}
export interface SalesData {
  date: string;
  revenue: number;
  projected: number;
}
export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  stock: number;
  velocity: number; // daily sales
  daysOfSupply: number;
  status: 'Healthy' | 'Low' | 'Critical';
}
interface StratagemState {
  metrics: Metric[];
  decisions: Decision[];
  salesHistory: SalesData[];
  inventory: InventoryItem[];
  riskTolerance: number;
  growthWeight: number;
  adSpendCap: number;
  analystContext: {
    activeSku?: string;
    activeCategory?: string;
  } | null;
  // Actions
  setRiskTolerance: (val: number) => void;
  setGrowthWeight: (val: number) => void;
  setAdSpendCap: (val: number) => void;
  setAnalystContext: (ctx: { activeSku?: string; activeCategory?: string } | null) => void;
  handleDecision: (id: string, status: 'accepted' | 'rejected') => void;
  generateInitialData: () => void;
}
export const useStratagemStore = create<StratagemState>((set) => ({
  metrics: [],
  decisions: [],
  salesHistory: [],
  inventory: [],
  riskTolerance: 40,
  growthWeight: 60,
  adSpendCap: 5000,
  analystContext: null,
  setRiskTolerance: (riskTolerance) => set({ riskTolerance }),
  setGrowthWeight: (growthWeight) => set({ growthWeight }),
  setAdSpendCap: (adSpendCap) => set({ adSpendCap }),
  setAnalystContext: (analystContext) => set({ analystContext }),
  handleDecision: (id, status) => set((state) => ({
    decisions: state.decisions.map(d => d.id === id ? { ...d, status } : d)
  })),
  generateInitialData: () => {
    const metrics: Metric[] = [
      { id: '1', label: 'Revenue', value: 124500, trend: 12.5, unit: 'currency' },
      { id: '2', label: 'Gross Margin', value: 32.4, trend: -2.1, unit: 'percent' },
      { id: '3', label: 'ROAS', value: 4.2, trend: 0.8, unit: 'number' },
      { id: '4', label: 'Inventory Health', value: 88, trend: 5.4, unit: 'percent' },
    ];
    const decisions: Decision[] = [
      {
        id: 'd1',
        title: 'Pause Ads for SKU-X402',
        description: 'Inventory levels dropping below safety threshold (3 days remaining).',
        impact: 'High',
        confidence: 94,
        type: 'Marketing',
        status: 'pending',
        reasoning: [
          'High sales velocity detected in last 48h',
          'Current stock: 42 units',
          'Supplier lead time: 14 days',
          'ROAS remains high but out-of-stock risk is critical'
        ]
      },
      {
        id: 'd2',
        title: 'Increase Price by 5% on "Premium Sofa"',
        description: 'Low price elasticity detected. Competitor stockouts in region.',
        impact: 'Medium',
        confidence: 82,
        type: 'Pricing',
        status: 'pending',
        reasoning: [
          'Competitor A and B currently out of stock',
          'Search volume for category up 15%',
          'Historical data suggests <2% drop in volume for 5% price hike'
        ]
      }
    ];
    const salesHistory: SalesData[] = Array.from({ length: 14 }).map((_, i) => {
      const date = format(subDays(new Date(), 13 - i), 'MMM dd');
      const base = 8000 + Math.random() * 2000;
      return {
        date,
        revenue: i < 11 ? base : 0,
        projected: base + (Math.random() * 1000)
      };
    });
    const categories = ['Furniture', 'Electronics', 'Home Decor', 'Kitchen'];
    const inventory: InventoryItem[] = Array.from({ length: 24 }).map((_, i) => {
      const velocity = Math.floor(Math.random() * 20) + 1;
      const stock = Math.floor(Math.random() * 200);
      const dos = Math.floor(stock / velocity);
      let status: 'Healthy' | 'Low' | 'Critical' = 'Healthy';
      if (dos < 7) status = 'Critical';
      else if (dos < 15) status = 'Low';
      return {
        sku: `SKU-${1000 + i}`,
        name: `${categories[i % categories.length]} Item ${i + 1}`,
        category: categories[i % categories.length],
        stock,
        velocity,
        daysOfSupply: dos,
        status
      };
    });
    set({ metrics, decisions, salesHistory, inventory });
  }
}));
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
interface StratagemState {
  metrics: Metric[];
  decisions: Decision[];
  salesHistory: SalesData[];
  riskTolerance: number;
  growthWeight: number;
  adSpendCap: number;
  // Actions
  setRiskTolerance: (val: number) => void;
  setGrowthWeight: (val: number) => void;
  setAdSpendCap: (val: number) => void;
  handleDecision: (id: string, status: 'accepted' | 'rejected') => void;
  generateInitialData: () => void;
}
export const useStratagemStore = create<StratagemState>((set) => ({
  metrics: [],
  decisions: [],
  salesHistory: [],
  riskTolerance: 40,
  growthWeight: 60,
  adSpendCap: 5000,
  setRiskTolerance: (riskTolerance) => set({ riskTolerance }),
  setGrowthWeight: (growthWeight) => set({ growthWeight }),
  setAdSpendCap: (adSpendCap) => set({ adSpendCap }),
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
    set({ metrics, decisions, salesHistory });
  }
}));
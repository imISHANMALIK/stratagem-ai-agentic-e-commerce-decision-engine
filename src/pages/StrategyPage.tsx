import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useStratagemStore } from '@/store/stratagemStore';
import { Shield, TrendingUp, DollarSign, Target } from 'lucide-react';
export function StrategyPage() {
  const riskTolerance = useStratagemStore(s => s.riskTolerance);
  const growthWeight = useStratagemStore(s => s.growthWeight);
  const adSpendCap = useStratagemStore(s => s.adSpendCap);
  const setRiskTolerance = useStratagemStore(s => s.setRiskTolerance);
  const setGrowthWeight = useStratagemStore(s => s.setGrowthWeight);
  const setAdSpendCap = useStratagemStore(s => s.setAdSpendCap);
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategy Hub</h1>
          <p className="text-muted-foreground mt-2">
            Program the decision engine with your business constraints and objectives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="font-semibold">Risk & Safety</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Stockout Risk Tolerance</Label>
                <span className="text-sm font-bold text-indigo-600">{riskTolerance}%</span>
              </div>
              <Slider 
                value={[riskTolerance]} 
                max={100} 
                step={1} 
                onValueChange={(vals) => setRiskTolerance(vals[0])}
              />
              <p className="text-xs text-muted-foreground">
                Higher values allow the engine to maintain leaner inventory levels, increasing ROI but raising out-of-stock risks.
              </p>
            </div>
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Automatic Intervention</Label>
                <p className="text-xs text-muted-foreground">Allow engine to pause low-stock ads</p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-semibold">Objective Alignment</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Growth vs. Profit</Label>
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  {growthWeight > 50 ? 'Aggressive Growth' : 'Margin Focused'}
                </span>
              </div>
              <Slider 
                value={[growthWeight]} 
                max={100} 
                step={1} 
                onValueChange={(vals) => setGrowthWeight(vals[0])}
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Max Profit</span>
                <span>Max Growth</span>
              </div>
            </div>
            <div className="pt-4 border-t space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Monthly Ad Spend Cap
                </Label>
                <span className="text-sm font-bold">${adSpendCap.toLocaleString()}</span>
              </div>
              <Slider 
                value={[adSpendCap]} 
                max={25000} 
                step={500} 
                onValueChange={(vals) => setAdSpendCap(vals[0])}
              />
            </div>
          </Card>
        </div>
        <Card className="p-12 border-dashed flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50">
          <div className="p-4 rounded-full bg-white shadow-sm">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Simulate Strategy Shift</h3>
            <p className="text-muted-foreground max-w-sm mt-1">
              Run a Monte Carlo simulation to see how these constraints affect your Q3 projections.
            </p>
          </div>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
            Run Simulation
          </button>
        </Card>
      </div>
    </AppLayout>
  );
}
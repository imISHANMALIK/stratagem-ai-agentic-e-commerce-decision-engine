import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useStratagemStore } from '@/store/stratagemStore';
import { StrategySimulator } from '@/components/strategy/StrategySimulator';
import { Shield, TrendingUp, DollarSign, Target, Save, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export function StrategyPage() {
  const riskTolerance = useStratagemStore(s => s.riskTolerance);
  const growthWeight = useStratagemStore(s => s.growthWeight);
  const adSpendCap = useStratagemStore(s => s.adSpendCap);
  const setRiskTolerance = useStratagemStore(s => s.setRiskTolerance);
  const setGrowthWeight = useStratagemStore(s => s.setGrowthWeight);
  const setAdSpendCap = useStratagemStore(s => s.setAdSpendCap);
  const runSimulation = useStratagemStore(s => s.runSimulation);
  const handleSliderCommit = () => {
    runSimulation();
  };
  const commitStrategy = () => {
    toast.success("Strategy Parameters Persisted", {
      description: "Engine constraints updated across all operational nodes.",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    });
  };
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Strategy Hub</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Program the decision engine with your core business constraints.
            </p>
          </div>
          <button 
            onClick={commitStrategy}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Save className="h-4 w-4" />
            Commit Strategy
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 space-y-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Risk & Stability Controls</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold uppercase text-slate-500 tracking-wider">Stockout Risk Tolerance</Label>
                  <span className="text-lg font-mono font-bold text-indigo-600">{riskTolerance}%</span>
                </div>
                <Slider
                  value={[riskTolerance]}
                  max={100}
                  step={5}
                  onValueChange={(vals) => setRiskTolerance(vals[0])}
                  onValueCommit={handleSliderCommit}
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Lower tolerance (conservative) increases safety stock buffers but ties up more capital.
                </p>
              </div>
              <div className="pt-6 border-t flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-bold">Autonomous Correction</Label>
                  <p className="text-xs text-muted-foreground">Allow AI to pause Meta/Google ads automatically</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
              </div>
            </div>
          </Card>
          <Card className="p-8 space-y-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Objective Weighting</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold uppercase text-slate-500 tracking-wider">Growth vs. Margin</Label>
                  <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded uppercase">
                    {growthWeight > 50 ? 'Scale Focused' : 'Profit First'}
                  </span>
                </div>
                <Slider
                  value={[growthWeight]}
                  max={100}
                  step={5}
                  onValueChange={(vals) => setGrowthWeight(vals[0])}
                  onValueCommit={handleSliderCommit}
                />
                <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase">
                  <span>Maximize Margin</span>
                  <span>Maximize Revenue</span>
                </div>
              </div>
              <div className="pt-6 border-t space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-500" /> Total Monthly Ad Cap
                  </Label>
                  <span className="text-lg font-mono font-bold">${adSpendCap.toLocaleString()}</span>
                </div>
                <Slider
                  value={[adSpendCap]}
                  max={50000}
                  step={1000}
                  onValueChange={(vals) => setAdSpendCap(vals[0])}
                  onValueCommit={handleSliderCommit}
                />
              </div>
            </div>
          </Card>
        </div>
        <Card className="p-16 border-dashed bg-slate-50/50 flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-white shadow-xl flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="max-w-md">
            <h3 className="text-2xl font-bold">Simulation Playground</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Run a complete Q4 market simulation using your current strategy weights to identify potential liquidity bottlenecks.
            </p>
          </div>
          <button 
            onClick={runSimulation}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          >
            Start Stress Test
          </button>
        </Card>
        <StrategySimulator />
      </div>
    </AppLayout>
  );
}
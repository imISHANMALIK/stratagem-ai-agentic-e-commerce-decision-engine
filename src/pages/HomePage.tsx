import React, { useEffect } from 'react';
import { useStratagemStore } from '@/store/stratagemStore';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DecisionFeed } from '@/components/dashboard/DecisionFeed';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { AppLayout } from '@/components/layout/AppLayout';
import { Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
export function HomePage() {
  const generateInitialData = useStratagemStore(s => s.generateInitialData);
  const metrics = useStratagemStore(s => s.metrics);
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 md:p-12 text-white">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Zap className="h-32 w-32 text-indigo-500 blur-xl animate-pulse" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-sm font-medium text-indigo-300 border border-indigo-500/30">
              <Activity className="h-4 w-4" />
              Engine Status: High Fidelity
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Operational <span className="text-indigo-400">Command Center</span>
            </h1>
            <p className="text-lg text-slate-400">
              Your autonomous decision engine has analyzed 4,203 data points today.
              2 critical interventions required to maintain projected margin.
            </p>
          </div>
        </section>
        {/* KPI Grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </section>
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Charts & Performance */}
          <div className="lg:col-span-8 space-y-8">
            <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Sales Velocity & Projection</h2>
                  <p className="text-sm text-muted-foreground">Historical vs AI Predicted Revenue</p>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <SalesChart />
              </div>
            </section>
          </div>
          {/* Right: Action Feed */}
          <div className="lg:col-span-4 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Decision Feed
                  <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                </h2>
                <button className="text-xs text-indigo-600 font-medium hover:underline">View All</button>
              </div>
              <DecisionFeed />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
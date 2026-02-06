import React, { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StockHeatmap } from '@/components/inventory/StockHeatmap';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { useStratagemStore } from '@/store/stratagemStore';
import { Card } from '@/components/ui/card';
import { Package, AlertCircle, TrendingDown, DollarSign } from 'lucide-react';
export function InventoryPage() {
  const inventory = useStratagemStore(s => s.inventory);
  const generateInitialData = useStratagemStore(s => s.generateInitialData);
  useEffect(() => {
    if (inventory.length === 0) {
      generateInitialData();
    }
  }, [inventory, generateInitialData]);
  const criticalCount = inventory.filter(i => i.status === 'Critical').length;
  const totalValue = inventory.reduce((acc, curr) => acc + (curr.stock * 45), 0); // Mock cost
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Intelligence</h1>
          <p className="text-muted-foreground mt-2">Deep analytics into SKU health and stockout risks.</p>
        </div>
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex items-center gap-4 border-l-4 border-l-rose-500">
            <div className="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Stockouts</p>
              <h3 className="text-2xl font-bold">{criticalCount} SKUs</h3>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 border-l-4 border-l-indigo-500">
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active SKUs</p>
              <h3 className="text-2xl font-bold">{inventory.length}</h3>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 border-l-4 border-l-emerald-500">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Est. Inventory Value</p>
              <h3 className="text-2xl font-bold">${(totalValue / 1000).toFixed(1)}k</h3>
            </div>
          </Card>
        </div>
        {/* Heatmap Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Stock vs. Velocity Risk Matrix
            </h2>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Healthy</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Warning</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Critical</span>
            </div>
          </div>
          <Card className="p-6 bg-card/50 backdrop-blur h-[400px]">
            <StockHeatmap />
          </Card>
        </section>
        {/* Table Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold">SKU Level Intelligence</h2>
          </div>
          <Card>
            <InventoryTable />
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
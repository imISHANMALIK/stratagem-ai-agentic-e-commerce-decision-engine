import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStratagemStore } from '@/store/stratagemStore';
import { Search, MessageSquare, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
export function InventoryTable() {
  const inventory = useStratagemStore(s => s.inventory);
  const setAnalystContext = useStratagemStore(s => s.setAnalystContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filtered = inventory.filter(item => 
    item.sku.toLowerCase().includes(search.toLowerCase()) || 
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleAnalyze = (sku: string) => {
    setAnalystContext({ activeSku: sku });
    navigate('/analyst');
  };
  return (
    <div className="space-y-4">
      <div className="p-4 border-b">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search SKUs or item names..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Velocity</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.sku} className="group transition-colors">
                <TableCell className="font-mono text-xs font-bold text-muted-foreground">{item.sku}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] font-normal">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{item.stock}</TableCell>
                <TableCell className="text-right font-mono text-indigo-600">{item.velocity}</TableCell>
                <TableCell className="text-center">
                  <Badge className={cn(
                    "text-[10px] font-bold",
                    item.status === 'Critical' ? "bg-rose-100 text-rose-700 hover:bg-rose-100" : 
                    item.status === 'Low' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : 
                    "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  )}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleAnalyze(item.sku)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
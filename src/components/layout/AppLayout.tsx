import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Home, 
  Settings2, 
  BarChart3, 
  Package, 
  BrainCircuit,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const navItems = [
    { name: "Command Center", path: "/", icon: Home },
    { name: "Strategy Hub", path: "/strategy", icon: Settings2 },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Analyst Console", path: "/analyst", icon: MessageSquare },
  ];
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Stratagem AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  className={cn(
                    "h-10 transition-all duration-200",
                    location.pathname === item.path ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                  )}
                >
                  <Link to={item.path}>
                    <item.icon className="size-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex flex-col gap-2">
          <SidebarMenuButton className="h-9">
            <HelpCircle className="size-4" />
            <span>Support</span>
          </SidebarMenuButton>
          <p className="text-[10px] text-muted-foreground px-2">
            AI Requests are limited based on system capacity.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
export function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="relative flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-30 w-full h-16 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center px-4 md:px-6">
          <SidebarTrigger className="-ml-1 mr-4" />
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-xs font-bold">JD</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
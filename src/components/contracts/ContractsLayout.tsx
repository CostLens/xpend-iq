
import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useSidebarState } from "@/hooks/useSidebarState";

interface ContractsLayoutProps {
  children: ReactNode;
}

export const ContractsLayout = ({ children }: ContractsLayoutProps) => {
  const { sidebarCollapsed } = useSidebarState();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[240px]'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};


import React from "react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Gauge,
  UserCog,
  FileSearch
} from "lucide-react";
import { NavSection } from "./NavSection";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
}

export const SidebarNavigation = ({ 
  isCollapsed, 
  showUsageFeatures, 
  showBoardingFeatures, 
  showNegotiationFeatures 
}: SidebarNavigationProps) => {
  
  // Build navigation items based on feature flags
  const getPrimaryNavItems = () => {
    const items = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Spend Analytics", href: "/spend-trends", icon: TrendingUp },
    ];
    
    if (showUsageFeatures) {
      items.push({ name: "Usage Analytics", href: "/usage", icon: Gauge });
    }
    
    if (showBoardingFeatures) {
      items.push({ name: "User Boarding", href: "/user-boarding", icon: UserCog });
    }
    
    // Contract negotiation now comes before repository
    if (showNegotiationFeatures) {
      items.push({ name: "Contract Negotiation", href: "/contract-negotiation", icon: FileSearch });
    }
    
    items.push({ name: "Repository", href: "/contracts", icon: FileText });
    
    return items;
  };

  const secondaryNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ];

  return (
    <div className="flex-1 overflow-auto py-4 bg-background">
      <NavSection 
        items={getPrimaryNavItems()} 
        isCollapsed={isCollapsed} 
      />
      
      <NavSection 
        title="SUPPORT & SETTINGS"
        items={secondaryNavigation} 
        isCollapsed={isCollapsed} 
      />
    </div>
  );
};

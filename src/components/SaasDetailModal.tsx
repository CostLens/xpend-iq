
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SaaSData, generateUsageTrendData, generatePaymentTrendData } from "@/lib/mockData";
import { TrendChart } from "@/components/ui/trend-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  DollarSign,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRightLeft
} from "lucide-react";

interface SaasDetailModalProps {
  saas: SaaSData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaasDetailModal({ saas, open, onOpenChange }: SaasDetailModalProps) {
  if (!saas) return null;

  // Generate chart data
  const usageData = generateUsageTrendData(saas.id);
  const paymentData = generatePaymentTrendData(saas.id);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const utilizationStatus = (status: string) => {
    switch (status) {
      case "Underutilized":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case "Optimal":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case "Overutilized":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto glass-panel animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">{saas.name}</DialogTitle>
          <DialogDescription>
            View detailed information and analytics about this SaaS application.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4">
          {/* Key Information Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Renewal Date
              </div>
              <div className="font-medium">
                {saas.renewalDate === "N/A" 
                  ? "N/A" 
                  : format(new Date(saas.renewalDate), "MMMM d, yyyy")}
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                Annual Cost
              </div>
              <div className="font-medium">{formatCurrency(saas.price)}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <Users className="h-3 w-3 mr-1" />
                User Utilization
              </div>
              <div className="font-medium flex items-center gap-2">
                {saas.usage.activeUsers}
                {saas.usage.totalLicenses ? `/${saas.usage.totalLicenses}` : ""} users
                <span className="text-xs ml-1">({saas.usage.utilizationRate}%)</span>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <ArrowRightLeft className="h-3 w-3 mr-1" />
                Status
              </div>
              <div className="font-medium">
                {utilizationStatus(saas.usage.status)}
              </div>
            </div>
          </div>

          {/* Tabs for different data views */}
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="contract">Contract Details</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TrendChart
                  title="User Activity"
                  description="Monthly active user count over time"
                  data={usageData}
                  dataKey="name"
                  categories={["users"]}
                  colors={["hsl(var(--primary))"]}
                  valueFormatter={(value) => `${value} users`}
                  height={240}
                />
                
                <TrendChart
                  title="Payment History"
                  description="Monthly payment amounts over time"
                  data={paymentData}
                  dataKey="name"
                  categories={["amount"]}
                  colors={["hsl(var(--primary))"]}
                  valueFormatter={(value) => `$${value.toFixed(2)}`}
                  height={240}
                />
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Optimization Insights</h3>
                <ul className="space-y-3">
                  {saas.usage.status === "Underutilized" && (
                    <>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="font-medium">License Reduction Opportunity</p>
                          <p className="text-sm text-muted-foreground">
                            This application is underutilized at {saas.usage.utilizationRate}%. 
                            Consider reducing licenses from {saas.usage.totalLicenses} to {saas.usage.activeUsers + 5} to save approximately 
                            {formatCurrency((saas.price / (saas.usage.totalLicenses || 1)) * ((saas.usage.totalLicenses || 0) - saas.usage.activeUsers - 5))} annually.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Renewal Negotiation</p>
                          <p className="text-sm text-muted-foreground">
                            Prepare for renewal discussion {saas.renewalDate !== "N/A" ? format(new Date(saas.renewalDate), "MMMM d, yyyy") : ""} with usage data to negotiate better terms.
                          </p>
                        </div>
                      </li>
                    </>
                  )}
                  {saas.usage.status === "Optimal" && (
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Optimal Usage</p>
                        <p className="text-sm text-muted-foreground">
                          This application is being utilized efficiently at {saas.usage.utilizationRate}%. 
                          Continue monitoring usage patterns to maintain optimal efficiency.
                        </p>
                      </div>
                    </li>
                  )}
                  {saas.usage.status === "Overutilized" && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">License Expansion Needed</p>
                        <p className="text-sm text-muted-foreground">
                          This application is overutilized. Consider adding more licenses to prevent service disruptions and improve user experience.
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="contract" className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Contract Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Contract Signed</h4>
                    <p className="font-medium">{format(new Date(saas.contract.signedDate), "MMMM d, yyyy")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
                    <p className="font-medium">{saas.contract.term}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Auto-Renewal</h4>
                    <p className="font-medium">{saas.contract.autoRenewal ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Cancellation Deadline</h4>
                    <p className="font-medium">
                      {saas.contract.cancellationDeadline 
                        ? format(new Date(saas.contract.cancellationDeadline), "MMMM d, yyyy")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Associated Documents</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{saas.name} Contract</p>
                        <p className="text-xs text-muted-foreground">PDF • 1.2MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Latest Invoice</p>
                        <p className="text-xs text-muted-foreground">PDF • 450KB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              <TrendChart
                title="Payment History"
                description="Monthly payment amounts over time"
                data={paymentData}
                dataKey="name"
                categories={["amount"]}
                colors={["hsl(var(--primary))"]}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                height={300}
              />
              
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
                <div className="space-y-4">
                  {paymentData.slice(-5).reverse().map((payment, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-md bg-background/50 border"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">${payment.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{payment.name} payment</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-500">Paid</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

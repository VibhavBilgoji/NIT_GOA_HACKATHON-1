"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SLAAlertsTable } from "@/components/sla-alerts-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  TrendingUp,
  AlertTriangle,
  Activity,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function Page() {
  // Show toast notification for critical SLA alerts
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.error("Critical SLA Alert!", {
        description:
          "Traffic signal malfunction at Panjim City Center - 2 hours remaining",
        action: {
          label: "View Details",
          onClick: () => console.log("View alert details"),
        },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Dashboard Header */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      OurStreet - Issue Tracking Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                      Real-time civic issue reporting, tracking, and resolution
                      management for urban communities
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
                    >
                      <Activity className="h-3 w-3 mr-1" />
                      System Active
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
                    >
                      <Bell className="h-3 w-3 mr-1" />5 Critical Issues
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Key Performance Metrics */}
              <SectionCards />

              {/* Hotspot Trend Projection & Resource Demand Charts */}
              <div className="px-4 lg:px-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold tracking-tight mb-2">
                    Hotspot Trend Projection & Resource Demand
                  </h2>
                  <p className="text-muted-foreground">
                    AI-powered predictions for issue hotspots and resource
                    allocation optimization
                  </p>
                </div>
                <ChartAreaInteractive />
              </div>

              {/* SLA Alert System - At-Risk Tickets */}
              <div className="px-4 lg:px-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    SLA Alert System - At-Risk Tickets
                  </h2>
                  <p className="text-muted-foreground">
                    Critical civic issues requiring immediate attention with
                    automated alerts
                  </p>
                </div>
                <SLAAlertsTable />
              </div>

              {/* Additional Insights Grid */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Real-time Activity Feed */}
                  <NeonGradientCard className="transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <Activity className="h-5 w-5 text-blue-500" />
                        Recent Activity
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        Latest system updates and resolved issues
                      </div>
                      <div className="space-y-3 text-black dark:text-white">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">
                              Pothole Repaired
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              FC Road, Panjim • 15 mins ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">SLA Warning</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Water pipeline • 2h remaining
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">
                              Critical Escalation
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Traffic light malfunction • 30 mins ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">
                              New Report Submitted
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Drainage issue • Citizen reported
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">
                              Citizen Feedback
                            </p>
                            <p className="text-xs text-muted-foreground">
                              5-star rating • Street light repair
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeonGradientCard>

                  {/* Predictive Insights */}
                  <NeonGradientCard className="transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                        Predictive Insights
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        AI-powered recommendations and forecasts
                      </div>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-1 text-black dark:text-white">
                            Hotspot Prediction
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            28 new civic issues predicted for next week in
                            Panjim area
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-1 text-black dark:text-white">
                            Resource Allocation
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Deploy 3 additional teams to Panjim City Center
                            based on demand
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-1 text-black dark:text-white">
                            Citizen Engagement
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Mondays & Fridays show 40% higher citizen reports
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-1 text-black dark:text-white">
                            Preventive Maintenance
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Schedule infrastructure checks before monsoon season
                          </p>
                        </div>
                      </div>
                    </div>
                  </NeonGradientCard>

                  {/* Community Impact Assessment */}
                  <NeonGradientCard className="transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        Community Impact Assessment
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        High-impact areas requiring urgent civic attention
                      </div>
                      <div className="space-y-3 text-black dark:text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm text-black dark:text-white">
                              Panjim City Center
                            </p>
                            <p className="text-xs text-muted-foreground">
                              34 active issues
                            </p>
                          </div>
                          <Badge className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200">
                            High Risk
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm text-black dark:text-white">
                              Margao Station Area
                            </p>
                            <p className="text-xs text-muted-foreground">
                              31 active issues
                            </p>
                          </div>
                          <Badge className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200">
                            High Risk
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm text-black dark:text-white">
                              Mapusa Market
                            </p>
                            <p className="text-xs text-muted-foreground">
                              28 active issues
                            </p>
                          </div>
                          <Badge className="bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200">
                            Medium Risk
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm text-black dark:text-white">
                              Vasco da Gama
                            </p>
                            <p className="text-xs text-muted-foreground">
                              19 active issues
                            </p>
                          </div>
                          <Badge className="bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200">
                            Medium Risk
                          </Badge>
                        </div>
                        <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                          <p className="text-xs font-medium text-orange-800 dark:text-orange-200">
                            Recommendation: Increase municipal response teams in
                            high-impact areas and improve citizen communication
                            channels.
                          </p>
                        </div>
                      </div>
                    </div>
                  </NeonGradientCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

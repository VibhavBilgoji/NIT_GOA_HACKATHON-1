"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SLAAlertsTable } from "@/components/sla-alerts-table";
import { SectionCards } from "@/components/section-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  TrendingUp,
  AlertTriangle,
  Activity,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { RotatingText } from "@/components/magicui/rotating-text";
import { useDashboard } from "@/contexts/dashboard-context";

export default function Page() {
  const {
    stats,
    slaAlerts,
    recentActivity,
    predictiveInsights,
    geospatialData,
    isLoading,
    refreshDashboard,
  } = useDashboard();

  // Show toast notification for critical SLA alerts
  useEffect(() => {
    if (slaAlerts.length > 0 && stats.criticalIssuesPending > 0) {
      const timer = setTimeout(() => {
        const criticalAlert = slaAlerts.find(
          (alert) => alert.priority === "Critical",
        );
        if (criticalAlert) {
          toast.error("Critical SLA Alert!", {
            description: `${criticalAlert.title} at ${criticalAlert.location} - ${criticalAlert.timeRemaining} remaining`,
            action: {
              label: "View Details",
              onClick: () => console.log("View alert details"),
            },
          });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [slaAlerts, stats.criticalIssuesPending]);

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "resolved":
        return "🟢";
      case "critical":
        return "🔴";
      case "in-progress":
        return "🟡";
      case "new":
      default:
        return "🔵";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Dashboard Header */}
            <div className="px-4 lg:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    <RotatingText text="OurStreet - Issue Tracking Dashboard" />
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
                    {isLoading ? "Updating..." : "System Active"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    {stats.criticalIssuesPending} Critical Issues
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshDashboard}
                    disabled={isLoading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
                    />
                    Refresh
                  </Button>
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
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  SLA Alert System - At-Risk Tickets
                </h2>
                <p className="text-muted-foreground">
                  Monitor tickets approaching SLA deadlines to prioritize
                  interventions
                </p>
              </div>
              <SLAAlertsTable />
            </div>

            {/* Recent Activity & Insights Grid */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Activity Feed */}
                <div className="col-span-full lg:col-span-4">
                  <NeonGradientCard className="h-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          Recent Activity
                        </h3>
                        <Activity className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                          recentActivity.slice(0, 6).map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start gap-3 pb-3 border-b border-border/40 last:border-0"
                            >
                              <span className="text-2xl">
                                {getActivityIcon(activity.type)}
                              </span>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {activity.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.timestamp}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  activity.severity === "high"
                                    ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
                                    : activity.severity === "medium"
                                      ? "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                                      : "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                }
                              >
                                {activity.type}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-8">
                            No recent activity
                          </p>
                        )}
                      </div>
                    </div>
                  </NeonGradientCard>
                </div>

                {/* Predictive Insights */}
                <div className="col-span-full lg:col-span-3">
                  <NeonGradientCard className="h-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          AI Predictive Insights
                        </h3>
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-4">
                        {predictiveInsights ? (
                          <>
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-muted-foreground">
                                Expected Issues
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-lg bg-muted/50">
                                  <p className="text-xs text-muted-foreground">
                                    Next Week
                                  </p>
                                  <p className="text-2xl font-bold">
                                    {predictiveInsights.expectedIssues.nextWeek}
                                  </p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50">
                                  <p className="text-xs text-muted-foreground">
                                    Next Month
                                  </p>
                                  <p className="text-2xl font-bold">
                                    {
                                      predictiveInsights.expectedIssues
                                        .nextMonth
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-muted-foreground">
                                High Risk Areas
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {predictiveInsights.expectedIssues.highRiskAreas.map(
                                  (area, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
                                    >
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {area}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-muted-foreground">
                                Recommendations
                              </h4>
                              <ul className="space-y-2">
                                {predictiveInsights.recommendations
                                  .slice(0, 3)
                                  .map((rec, i) => (
                                    <li
                                      key={i}
                                      className="text-sm flex items-start gap-2"
                                    >
                                      <AlertTriangle className="h-4 w-4 mt-0.5 text-orange-500" />
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-8">
                            No predictive insights available
                          </p>
                        )}
                      </div>
                    </div>
                  </NeonGradientCard>
                </div>
              </div>
            </div>

            {/* Geospatial Hotspot Map Preview */}
            {geospatialData.length > 0 && (
              <div className="px-4 lg:px-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold tracking-tight mb-2">
                    Geospatial Issue Hotspots
                  </h2>
                  <p className="text-muted-foreground">
                    High-density issue areas requiring immediate attention
                  </p>
                </div>
                <NeonGradientCard>
                  <div className="p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {geospatialData.slice(0, 6).map((area, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border border-border/40 hover:border-border transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{area.area}</h4>
                            <Badge
                              variant="outline"
                              className={
                                area.riskScore > 75
                                  ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
                                  : area.riskScore > 50
                                    ? "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
                                    : "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                              }
                            >
                              Risk: {area.riskScore}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {area.category}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {area.lat.toFixed(4)}, {area.lng.toFixed(4)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                              <span>{area.issueCount} issues</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </NeonGradientCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

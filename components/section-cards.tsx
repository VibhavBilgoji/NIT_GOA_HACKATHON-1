"use client";

<<<<<<< Updated upstream
=======
import { useEffect, useState } from "react";
>>>>>>> Stashed changes
import {
  IconTrendingDown,
  IconTrendingUp,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
<<<<<<< Updated upstream
import { useDashboard } from "@/contexts/dashboard-context";

export function SectionCards() {
  const { stats, isLoading } = useDashboard();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
=======
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalActiveIssues: number;
  criticalIssues: number;
  issuesTrend: number;
  slaComplianceRate: number;
  slaBreaches: number;
  slaComplianceTrend: number;
  averageResolutionTime: number;
  resolutionTimeTrend: number;
  citizenSatisfaction: number;
  satisfactionTrend: number;
  resolvedThisMonth: number;
}

export function SectionCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/analytics/stats");
        const data = await response.json();

        if (data.success) {
          setStats(data.data);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch statistics");
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 border rounded-lg">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-8 w-24 mb-6" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <div className="col-span-full p-6 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
          <p className="text-red-600 dark:text-red-400">
            {error || "Failed to load statistics"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Active Issues Card */}
      <NeonGradientCard
        className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer"
        neonColors={{
          firstColor: "#404040",
          secondColor: "#606060",
        }}
      >
>>>>>>> Stashed changes
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Total Active Issues
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
<<<<<<< Updated upstream
              {isLoading ? "..." : stats.totalActiveIssues}
=======
              {stats.totalActiveIssues}
>>>>>>> Stashed changes
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
<<<<<<< Updated upstream
                  stats.trendPercentages.activeIssues >= 0
=======
                  stats.issuesTrend > 0
>>>>>>> Stashed changes
                    ? "bg-red-950 border-red-900 text-red-300"
                    : "bg-green-950 border-green-900 text-green-300"
                }
              >
<<<<<<< Updated upstream
                {stats.trendPercentages.activeIssues >= 0 ? (
=======
                {stats.issuesTrend > 0 ? (
>>>>>>> Stashed changes
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
<<<<<<< Updated upstream
                {stats.trendPercentages.activeIssues >= 0 ? "+" : ""}
                {stats.trendPercentages.activeIssues}%
=======
                {stats.issuesTrend > 0 ? "+" : ""}
                {stats.issuesTrend}%
>>>>>>> Stashed changes
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
<<<<<<< Updated upstream
              {stats.criticalIssuesPending} Critical Issues Pending{" "}
=======
              {stats.criticalIssues} Critical Issues Pending{" "}
>>>>>>> Stashed changes
              <IconAlertTriangle className="size-4 text-red-500" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {stats.criticalIssues > 0
                ? "Requires immediate attention"
                : "All issues under control"}
            </div>
          </div>
        </div>
      </NeonGradientCard>

<<<<<<< Updated upstream
      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
=======
      {/* SLA Compliance Card */}
      <NeonGradientCard
        className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer"
        neonColors={{
          firstColor: "#404040",
          secondColor: "#606060",
        }}
      >
>>>>>>> Stashed changes
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              SLA Compliance Rate
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
<<<<<<< Updated upstream
              {isLoading ? "..." : `${stats.slaComplianceRate}%`}
=======
              {stats.slaComplianceRate}%
>>>>>>> Stashed changes
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
<<<<<<< Updated upstream
                  stats.trendPercentages.slaCompliance >= 0
                    ? "bg-green-950 border-green-900 text-green-300"
                    : "bg-yellow-950 border-yellow-900 text-yellow-300"
                }
              >
                {stats.trendPercentages.slaCompliance >= 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {stats.trendPercentages.slaCompliance >= 0 ? "+" : ""}
                {stats.trendPercentages.slaCompliance}%
=======
                  stats.slaComplianceTrend < 0
                    ? "bg-red-950 border-red-900 text-red-300"
                    : stats.slaComplianceTrend > 0
                      ? "bg-green-950 border-green-900 text-green-300"
                      : "bg-yellow-950 border-yellow-900 text-yellow-300"
                }
              >
                {stats.slaComplianceTrend > 0 ? (
                  <IconTrendingUp />
                ) : stats.slaComplianceTrend < 0 ? (
                  <IconTrendingDown />
                ) : null}
                {stats.slaComplianceTrend > 0 ? "+" : ""}
                {stats.slaComplianceTrend}%
>>>>>>> Stashed changes
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
<<<<<<< Updated upstream
              {stats.slaBreeches} SLA breaches this week{" "}
              <IconAlertTriangle className="size-4 text-yellow-500" />
=======
              {stats.slaBreaches} SLA breaches this month{" "}
              {stats.slaBreaches > 5 ? (
                <IconAlertTriangle className="size-4 text-yellow-500" />
              ) : (
                <IconCircleCheck className="size-4 text-green-500" />
              )}
>>>>>>> Stashed changes
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {stats.slaBreaches > 5
                ? "Performance needs improvement"
                : "Good performance"}
            </div>
          </div>
        </div>
      </NeonGradientCard>

<<<<<<< Updated upstream
      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
=======
      {/* Average Resolution Time Card */}
      <NeonGradientCard
        className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer"
        neonColors={{
          firstColor: "#404040",
          secondColor: "#606060",
        }}
      >
>>>>>>> Stashed changes
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Average Resolution Time
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
<<<<<<< Updated upstream
              {isLoading ? "..." : `${stats.averageResolutionTime} days`}
=======
              {stats.averageResolutionTime > 0
                ? `${stats.averageResolutionTime} days`
                : "N/A"}
>>>>>>> Stashed changes
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
<<<<<<< Updated upstream
                  stats.trendPercentages.resolutionTime <= 0
                    ? "bg-green-950 border-green-900 text-green-300"
                    : "bg-red-950 border-red-900 text-red-300"
                }
              >
                {stats.trendPercentages.resolutionTime <= 0 ? (
                  <IconTrendingDown />
                ) : (
                  <IconTrendingUp />
                )}
                {stats.trendPercentages.resolutionTime >= 0 ? "+" : ""}
                {stats.trendPercentages.resolutionTime}d
=======
                  stats.resolutionTimeTrend < 0
                    ? "bg-green-950 border-green-900 text-green-300"
                    : stats.resolutionTimeTrend > 0
                      ? "bg-red-950 border-red-900 text-red-300"
                      : "bg-yellow-950 border-yellow-900 text-yellow-300"
                }
              >
                {stats.resolutionTimeTrend < 0 ? (
                  <IconTrendingDown />
                ) : stats.resolutionTimeTrend > 0 ? (
                  <IconTrendingUp />
                ) : null}
                {stats.resolutionTimeTrend}
                {stats.resolutionTimeTrend !== 0 ? "d" : ""}
>>>>>>> Stashed changes
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
              {stats.resolutionTimeTrend < 0
                ? "Improved resolution times"
                : stats.resolutionTimeTrend > 0
                  ? "Resolution time increased"
                  : "Consistent resolution time"}{" "}
              {stats.resolutionTimeTrend < 0 ? (
                <IconCircleCheck className="size-4 text-green-500" />
              ) : stats.resolutionTimeTrend > 0 ? (
                <IconAlertTriangle className="size-4 text-yellow-500" />
              ) : null}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
<<<<<<< Updated upstream
              Efficiency improved by{" "}
              {Math.abs(stats.trendPercentages.resolutionTime * 20).toFixed(0)}%
=======
              {stats.resolutionTimeTrend < 0
                ? `Efficiency improved by ${Math.abs(Math.round(stats.resolutionTimeTrend * 10))}%`
                : stats.resolutionTimeTrend > 0
                  ? "Focus on faster resolution"
                  : "Maintaining steady pace"}
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      </NeonGradientCard>

<<<<<<< Updated upstream
      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
=======
      {/* Citizen Satisfaction Card */}
      <NeonGradientCard
        className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer"
        neonColors={{
          firstColor: "#404040",
          secondColor: "#606060",
        }}
      >
>>>>>>> Stashed changes
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Citizen Satisfaction
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
<<<<<<< Updated upstream
              {isLoading ? "..." : `${stats.citizenSatisfaction}/5.0`}
=======
              {stats.citizenSatisfaction}/5.0
>>>>>>> Stashed changes
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
<<<<<<< Updated upstream
                  stats.trendPercentages.satisfaction >= 0
                    ? "bg-green-950 border-green-900 text-green-300"
                    : "bg-red-950 border-red-900 text-red-300"
                }
              >
                {stats.trendPercentages.satisfaction >= 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {stats.trendPercentages.satisfaction >= 0 ? "+" : ""}
                {stats.trendPercentages.satisfaction}
=======
                  stats.satisfactionTrend > 0
                    ? "bg-green-950 border-green-900 text-green-300"
                    : stats.satisfactionTrend < 0
                      ? "bg-red-950 border-red-900 text-red-300"
                      : "bg-yellow-950 border-yellow-900 text-yellow-300"
                }
              >
                {stats.satisfactionTrend > 0 ? (
                  <IconTrendingUp />
                ) : stats.satisfactionTrend < 0 ? (
                  <IconTrendingDown />
                ) : null}
                {stats.satisfactionTrend > 0 ? "+" : ""}
                {stats.satisfactionTrend}
>>>>>>> Stashed changes
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
<<<<<<< Updated upstream
              {stats.resolvedIssuesThisMonth} resolved issues this month{" "}
=======
              {stats.resolvedThisMonth} resolved issues this month{" "}
>>>>>>> Stashed changes
              <IconCircleCheck className="size-4 text-green-500" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {stats.citizenSatisfaction >= 4.0
                ? "High satisfaction rating"
                : stats.citizenSatisfaction >= 3.0
                  ? "Good satisfaction rating"
                  : "Needs improvement"}
            </div>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
}

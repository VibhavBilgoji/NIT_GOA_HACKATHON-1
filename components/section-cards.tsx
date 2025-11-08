"use client";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { useDashboard } from "@/contexts/dashboard-context";

export function SectionCards() {
  const { stats, isLoading } = useDashboard();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Total Active Issues
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
              {isLoading ? "..." : stats.totalActiveIssues}
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
                  stats.trendPercentages.activeIssues >= 0
                    ? "bg-red-950 border-red-900 text-red-300"
                    : "bg-green-950 border-green-900 text-green-300"
                }
              >
                {stats.trendPercentages.activeIssues >= 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {stats.trendPercentages.activeIssues >= 0 ? "+" : ""}
                {stats.trendPercentages.activeIssues}%
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
              {stats.criticalIssuesPending} Critical Issues Pending{" "}
              <IconAlertTriangle className="size-4 text-red-500" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Requires immediate attention
            </div>
          </div>
        </div>
      </NeonGradientCard>

      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              SLA Compliance Rate
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
              {isLoading ? "..." : `${stats.slaComplianceRate}%`}
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
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
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
              {stats.slaBreeches} SLA breaches this week{" "}
              <IconAlertTriangle className="size-4 text-yellow-500" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Performance needs improvement
            </div>
          </div>
        </div>
      </NeonGradientCard>

      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Average Resolution Time
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
              {isLoading ? "..." : `${stats.averageResolutionTime} days`}
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
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
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
              Improved resolution times{" "}
              <IconCircleCheck className="size-4 text-green-500" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Efficiency improved by{" "}
              {Math.abs(stats.trendPercentages.resolutionTime * 20).toFixed(0)}%
            </div>
          </div>
        </div>
      </NeonGradientCard>

      <NeonGradientCard className="@container/card transition-all duration-300 ease-in-out hover:scale-[1.03] cursor-pointer">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Citizen Satisfaction
            </div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-black dark:text-white">
              {isLoading ? "..." : `${stats.citizenSatisfaction}/5.0`}
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className={
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
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-black dark:text-white">
              {stats.resolvedIssuesThisMonth} resolved issues this month{" "}
              <IconCircleCheck className="size-4 text-green-500" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              High satisfaction rating
            </div>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
}

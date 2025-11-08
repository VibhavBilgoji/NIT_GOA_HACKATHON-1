import {
  IconTrendingDown,
  IconTrendingUp,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <NeonGradientCard className="@container/card">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-400 text-sm">Total Active Issues</div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
              243
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className="bg-red-950 border-red-900 text-red-300"
              >
                <IconTrendingUp />
                +18%
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-white">
              35 Critical Issues Pending{" "}
              <IconAlertTriangle className="size-4 text-red-500" />
            </div>
            <div className="text-gray-400">Requires immediate attention</div>
          </div>
        </div>
      </NeonGradientCard>

      <NeonGradientCard className="@container/card">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-400 text-sm">SLA Compliance Rate</div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
              82.3%
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className="bg-yellow-950 border-yellow-900 text-yellow-300"
              >
                <IconTrendingDown />
                -5.1%
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-white">
              8 SLA breaches this week{" "}
              <IconAlertTriangle className="size-4 text-yellow-500" />
            </div>
            <div className="text-gray-400">Performance needs improvement</div>
          </div>
        </div>
      </NeonGradientCard>

      <NeonGradientCard className="@container/card">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-400 text-sm">Average Resolution Time</div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
              3.8 days
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className="bg-green-950 border-green-900 text-green-300"
              >
                <IconTrendingDown />
                -1.2d
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-white">
              Improved resolution times{" "}
              <IconCircleCheck className="size-4 text-green-500" />
            </div>
            <div className="text-gray-400">Efficiency improved by 24%</div>
          </div>
        </div>
      </NeonGradientCard>

      <NeonGradientCard className="@container/card">
        <div className="flex flex-col gap-6">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <div className="text-gray-400 text-sm">Citizen Satisfaction</div>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
              4.5/5.0
            </div>
            <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
              <Badge
                variant="outline"
                className="bg-green-950 border-green-900 text-green-300"
              >
                <IconTrendingUp />
                +0.3
              </Badge>
            </div>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-white">
              127 resolved issues this month{" "}
              <IconCircleCheck className="size-4 text-green-500" />
            </div>
            <div className="text-gray-400">High satisfaction rating</div>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
}

import {
  IconTrendingDown,
  IconTrendingUp,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Active Issues</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            243
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
            >
              <IconTrendingUp />
              +18%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            35 Critical Issues Pending{" "}
            <IconAlertTriangle className="size-4 text-red-500" />
          </div>
          <div className="text-muted-foreground">
            Requires immediate attention
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>SLA Compliance Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            82.3%
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
            >
              <IconTrendingDown />
              -5.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            8 SLA breaches this week{" "}
            <IconAlertTriangle className="size-4 text-yellow-500" />
          </div>
          <div className="text-muted-foreground">
            Performance needs improvement
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Resolution Time</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3.8 days
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
            >
              <IconTrendingDown />
              -1.2d
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Improved resolution times{" "}
            <IconCircleCheck className="size-4 text-green-500" />
          </div>
          <div className="text-muted-foreground">
            Efficiency improved by 24%
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Citizen Satisfaction</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5/5.0
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
            >
              <IconTrendingUp />
              +0.3
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            127 resolved issues this month{" "}
            <IconCircleCheck className="size-4 text-green-500" />
          </div>
          <div className="text-muted-foreground">High satisfaction rating</div>
        </CardFooter>
      </Card>
    </div>
  );
}

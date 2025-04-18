
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  className?: string;
  icon?: React.ReactNode;
}

export const MetricCard = ({
  title,
  value,
  unit,
  change,
  trend,
  className,
  icon,
}: MetricCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm ml-1 font-normal">{unit}</span>}
        </div>
        {(change !== undefined || trend !== undefined) && (
          <div className="flex items-center mt-1">
            {trend && (
              <div
                className={cn(
                  "mr-1",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500"
                )}
              >
                {trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : trend === "down" ? (
                  <TrendingDown className="h-4 w-4" />
                ) : null}
              </div>
            )}
            {change !== undefined && (
              <p
                className={cn(
                  "text-xs",
                  change > 0 && "text-green-500",
                  change < 0 && "text-red-500",
                  change === 0 && "text-gray-500"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

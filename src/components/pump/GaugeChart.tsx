
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GaugeProps {
  value: number;
  max: number;
  title: string;
  unit: string;
  color?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  description?: string;
}

const getColor = (color: GaugeProps["color"]) => {
  switch (color) {
    case "success":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
    case "danger":
      return "text-red-500";
    default:
      return "text-blue-500";
  }
};

const getBackgroundColor = (color: GaugeProps["color"]) => {
  switch (color) {
    case "success":
      return "text-green-200";
    case "warning":
      return "text-yellow-200";
    case "danger":
      return "text-red-200";
    default:
      return "text-blue-200";
  }
};

export const GaugeChart = ({
  value,
  max,
  title,
  unit,
  color = "default",
  size = "md",
  className,
  description,
}: GaugeProps) => {
  const percentage = (value / max) * 100;
  const radius = size === "sm" ? 40 : size === "md" ? 60 : 80;
  const strokeWidth = size === "sm" ? 10 : size === "md" ? 12 : 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <svg
              width={radius * 2 + strokeWidth}
              height={radius * 2 + strokeWidth}
              viewBox={`0 0 ${radius * 2 + strokeWidth} ${
                radius * 2 + strokeWidth
              }`}
              className="transform -rotate-90"
            >
              <circle
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className={getBackgroundColor(color)}
              />
              <circle
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={getColor(color)}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className={cn("font-bold", getColor(color), size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl")}>
                {value}
              </span>
              <span className="text-xs text-muted-foreground block">{unit}</span>
            </div>
          </div>
          {description && (
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {description}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

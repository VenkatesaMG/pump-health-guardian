
import * as React from "react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "healthy" | "warning" | "critical" | "offline";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export const StatusIndicator = ({
  status,
  size = "md",
  label,
  className,
}: StatusIndicatorProps) => {
  const sizeClass = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const statusColor = {
    healthy: "bg-green-500",
    warning: "bg-yellow-500",
    critical: "bg-red-500",
    offline: "bg-gray-400",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "rounded-full animate-pulse",
          sizeClass[size],
          statusColor[status]
        )}
      />
      {label && (
        <span
          className={cn(
            "text-sm font-medium",
            status === "healthy" && "text-green-700",
            status === "warning" && "text-yellow-700",
            status === "critical" && "text-red-700",
            status === "offline" && "text-gray-500"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

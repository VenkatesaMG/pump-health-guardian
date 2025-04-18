
import * as React from "react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface AlertItemProps {
  title: string;
  description: string;
  severity: "info" | "warning" | "error";
  timestamp?: string;
  className?: string;
}

export const AlertItem = ({
  title,
  description,
  severity,
  timestamp,
  className,
}: AlertItemProps) => {
  const getIcon = () => {
    switch (severity) {
      case "info":
        return <Info className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Alert
      className={cn(
        "mb-2",
        severity === "info" && "border-blue-500/50 text-blue-500",
        severity === "warning" && "border-yellow-500/50 text-yellow-600",
        severity === "error" && "border-red-500/50 text-red-500",
        className
      )}
    >
      {getIcon()}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <AlertTitle>{title}</AlertTitle>
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
};

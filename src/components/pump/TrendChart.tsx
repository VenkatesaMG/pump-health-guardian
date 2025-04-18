
import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TrendChartProps {
  title: string;
  data: Array<{ timestamp: string; value: number }>;
  dataKey?: string;
  color?: string;
  unit?: string;
  className?: string;
  timeFormat?: "hour" | "day" | "month";
}

export const TrendChart = ({
  title,
  data,
  dataKey = "value",
  color = "#3b82f6",
  unit = "",
  className,
  timeFormat = "hour",
}: TrendChartProps) => {
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    
    switch (timeFormat) {
      case "hour":
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      case "day":
        return `${date.getDate()}/${date.getMonth() + 1}`;
      case "month":
        return `${date.toLocaleString('default', { month: 'short' })}`;
      default:
        return tickItem;
    }
  };

  return (
    <Card className={cn("w-full h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxis} 
                interval="preserveStartEnd"
                tick={{ fontSize: 10 }}
              />
              <YAxis
                tickFormatter={(value) => `${value}${unit}`}
                width={35}
                tick={{ fontSize: 10 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}${unit}`, title]}
                labelFormatter={(label) => new Date(label).toLocaleString()}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fillOpacity={1}
                fill={`url(#color-${title})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

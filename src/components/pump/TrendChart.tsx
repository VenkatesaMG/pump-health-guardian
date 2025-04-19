import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataKeyConfig {
  key: string;
  name?: string;
  color?: string;
  unit?: string;
}

interface TrendChartProps {
  title: string;
  data: Array<{ timestamp: string; [key: string]: number | string }>;
  dataKeys?: DataKeyConfig[];
  className?: string;
  timeFormat?: "hour" | "day" | "month";
  color?: string; // Added color prop
  unit?: string; // Added unit prop
}
export const TrendChart = ({
  title,
  data,
  dataKeys,
  className,
  timeFormat = "hour",
  color = "#3b82f6", // Default blue color
  unit = "", // Default empty unit
}: TrendChartProps) => {
  // If dataKeys is not provided but color and/or unit are, create a default dataKey
  const resolvedDataKeys = dataKeys || [
    { key: "value", name: "Value", color: color, unit: unit },
  ];

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);

    switch (timeFormat) {
      case "hour":
        return `${date.getHours()}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
      case "day":
        return `${date.getDate()}/${date.getMonth() + 1}`;
      case "month":
        return `${date.toLocaleString("default", { month: "short" })}`;
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
                {resolvedDataKeys.map((config) => (
                  <linearGradient
                    key={config.key}
                    id={`color-${config.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={config.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={config.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                interval="preserveStartEnd"
                tick={{ fontSize: 10 }}
              />
              <YAxis
                tickFormatter={(value) => `${value}${resolvedDataKeys[0]?.unit || ""}`}
                width={35}
                tick={{ fontSize: 10 }}
              />
              <Tooltip
                formatter={(value: any, name: string, props: any) => {
                  const found = resolvedDataKeys.find((k) => k.key === props.dataKey);
                  return [
                    `${value}${found?.unit || ""}`,
                    found?.name || props.dataKey,
                  ];
                }}
                labelFormatter={(label) => new Date(label).toLocaleString()}
              />
              <Legend />
              {resolvedDataKeys.map((config) => (
                <Area
                  key={config.key}
                  type="monotone"
                  dataKey={config.key}
                  name={config.name}
                  stroke={config.color}
                  fill={`url(#color-${config.key})`}
                  fillOpacity={0.3}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

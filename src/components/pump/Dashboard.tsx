
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GaugeChart } from "./GaugeChart";
import { StatusIndicator } from "./StatusIndicator";
import { MetricCard } from "./MetricCard";
import { TrendChart } from "./TrendChart";
import { AlertItem } from "./AlertItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Battery, Droplet, Gauge, Info, Settings, Thermometer, Zap } from "lucide-react";

// Mock data for demonstration
const mockCurrentData = [
  { timestamp: "2023-04-01T00:00:00", value: 15.2 },
  { timestamp: "2023-04-01T01:00:00", value: 15.5 },
  { timestamp: "2023-04-01T02:00:00", value: 16.0 },
  { timestamp: "2023-04-01T03:00:00", value: 16.2 },
  { timestamp: "2023-04-01T04:00:00", value: 15.8 },
  { timestamp: "2023-04-01T05:00:00", value: 15.6 },
  { timestamp: "2023-04-01T06:00:00", value: 15.9 },
  { timestamp: "2023-04-01T07:00:00", value: 16.5 },
  { timestamp: "2023-04-01T08:00:00", value: 17.2 },
  { timestamp: "2023-04-01T09:00:00", value: 17.8 },
  { timestamp: "2023-04-01T10:00:00", value: 18.1 },
  { timestamp: "2023-04-01T11:00:00", value: 17.5 },
];

const mockFlowData = [
  { timestamp: "2023-04-01T00:00:00", value: 120 },
  { timestamp: "2023-04-01T01:00:00", value: 122 },
  { timestamp: "2023-04-01T02:00:00", value: 119 },
  { timestamp: "2023-04-01T03:00:00", value: 121 },
  { timestamp: "2023-04-01T04:00:00", value: 118 },
  { timestamp: "2023-04-01T05:00:00", value: 115 },
  { timestamp: "2023-04-01T06:00:00", value: 117 },
  { timestamp: "2023-04-01T07:00:00", value: 123 },
  { timestamp: "2023-04-01T08:00:00", value: 127 },
  { timestamp: "2023-04-01T09:00:00", value: 125 },
  { timestamp: "2023-04-01T10:00:00", value: 128 },
  { timestamp: "2023-04-01T11:00:00", value: 130 },
];

const mockTemperatureData = [
  { timestamp: "2023-04-01T00:00:00", value: 65 },
  { timestamp: "2023-04-01T01:00:00", value: 66 },
  { timestamp: "2023-04-01T02:00:00", value: 67 },
  { timestamp: "2023-04-01T03:00:00", value: 68 },
  { timestamp: "2023-04-01T04:00:00", value: 70 },
  { timestamp: "2023-04-01T05:00:00", value: 72 },
  { timestamp: "2023-04-01T06:00:00", value: 74 },
  { timestamp: "2023-04-01T07:00:00", value: 73 },
  { timestamp: "2023-04-01T08:00:00", value: 72 },
  { timestamp: "2023-04-01T09:00:00", value: 71 },
  { timestamp: "2023-04-01T10:00:00", value: 70 },
  { timestamp: "2023-04-01T11:00:00", value: 69 },
];

const mockHealthScoreData = [
  { timestamp: "2023-04-01T00:00:00", value: 92 },
  { timestamp: "2023-04-01T01:00:00", value: 93 },
  { timestamp: "2023-04-01T02:00:00", value: 91 },
  { timestamp: "2023-04-01T03:00:00", value: 90 },
  { timestamp: "2023-04-01T04:00:00", value: 89 },
  { timestamp: "2023-04-01T05:00:00", value: 88 },
  { timestamp: "2023-04-01T06:00:00", value: 87 },
  { timestamp: "2023-04-01T07:00:00", value: 86 },
  { timestamp: "2023-04-01T08:00:00", value: 85 },
  { timestamp: "2023-04-01T09:00:00", value: 84 },
  { timestamp: "2023-04-01T10:00:00", value: 83 },
  { timestamp: "2023-04-01T11:00:00", value: 82 },
];

const mockAlerts = [
  {
    id: 1,
    title: "High Current Draw Detected",
    description: "Current draw is exceeding normal range by 15%",
    severity: "warning",
    timestamp: "2023-04-01T09:45:00",
  },
  {
    id: 2,
    title: "Vibration Warning",
    description: "Unusual vibration patterns detected, maintenance recommended",
    severity: "warning",
    timestamp: "2023-04-01T08:30:00",
  },
  {
    id: 3,
    title: "Successful Maintenance",
    description: "Scheduled maintenance completed successfully",
    severity: "info",
    timestamp: "2023-03-28T14:20:00",
  },
  {
    id: 4,
    title: "Temperature Rising",
    description: "Motor temperature has increased 10°C in the last hour",
    severity: "error",
    timestamp: "2023-04-01T10:15:00",
  },
];

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pump Health Guardian</h1>
          <p className="text-muted-foreground">Real-time pump monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="healthy" label="System Status" />
        </div>
      </div>

      <Tabs defaultValue="monitoring">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Real-time Monitoring Section */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Current"
              value={17.8}
              unit="A"
              change={5.2}
              trend="up"
              icon={<Zap className="h-4 w-4" />}
            />
            <MetricCard
              title="Voltage"
              value={220}
              unit="V"
              change={0}
              trend="neutral"
              icon={<Battery className="h-4 w-4" />}
            />
            <MetricCard
              title="Power Consumption"
              value={3.9}
              unit="kW"
              change={3.1}
              trend="up"
              icon={<Activity className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GaugeChart
              title="Flow Rate"
              value={130}
              max={200}
              unit="L/min"
              color="default"
            />
            <GaugeChart
              title="Pressure"
              value={4.2}
              max={10}
              unit="Bar"
              color="warning"
            />
            <GaugeChart
              title="Temperature"
              value={69}
              max={100}
              unit="°C"
              color="default"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TrendChart
              title="Current Over Time"
              data={mockCurrentData}
              color="#3b82f6"
              unit="A"
            />
            <TrendChart
              title="Flow Rate Over Time"
              data={mockFlowData}
              color="#10b981"
              unit="L/min"
            />
          </div>
        </TabsContent>

        {/* Health Indicators Section */}
        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GaugeChart
              title="Motor Health Score"
              value={82}
              max={100}
              unit="%"
              color={82 > 90 ? "success" : 82 > 70 ? "warning" : "danger"}
            />
            <MetricCard
              title="Vibration Analysis"
              value="Normal"
              icon={<Activity className="h-4 w-4" />}
            />
            <MetricCard
              title="Estimated RUL"
              value="1,240"
              unit="hours"
              icon={<Info className="h-4 w-4" />}
            />
            <MetricCard
              title="Operating Hours"
              value="3,450"
              unit="hours"
              icon={<Settings className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <TrendChart
              title="Health Score Over Time"
              data={mockHealthScoreData}
              color="#f59e0b"
              unit="%"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Next Scheduled Maintenance</span>
                    <span className="text-sm font-medium">May 15, 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Maintenance</span>
                    <span className="text-sm font-medium">Mar 28, 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maintenance Interval</span>
                    <span className="text-sm font-medium">45 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Component Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Impeller</span>
                    <StatusIndicator status="healthy" label="Good" size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bearings</span>
                    <StatusIndicator status="warning" label="Attention" size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Seals</span>
                    <StatusIndicator status="healthy" label="Good" size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Motor Windings</span>
                    <StatusIndicator status="healthy" label="Good" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts and Anomalies Section */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockAlerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    title={alert.title}
                    description={alert.description}
                    severity={alert.severity as "info" | "warning" | "error"}
                    timestamp={new Date(alert.timestamp).toLocaleString()}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Alert Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Threshold</span>
                    <span className="text-sm font-medium">20A</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Temperature Threshold</span>
                    <span className="text-sm font-medium">80°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vibration Threshold</span>
                    <span className="text-sm font-medium">5mm/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pressure Threshold</span>
                    <span className="text-sm font-medium">8 Bar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Notifications</span>
                    <span className="text-sm font-medium text-green-600">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SMS Alerts</span>
                    <span className="text-sm font-medium text-green-600">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Alerts</span>
                    <span className="text-sm font-medium text-green-600">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alert History Retention</span>
                    <span className="text-sm font-medium">90 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historical and Trend Charts Section */}
        <TabsContent value="history" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Historical Data View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">124.3</p>
                      <p className="text-sm text-muted-foreground">Avg Flow Rate (L/min)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">16.2</p>
                      <p className="text-sm text-muted-foreground">Avg Current (A)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">68</p>
                      <p className="text-sm text-muted-foreground">Avg Temperature (°C)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TrendChart
              title="Temperature Trend"
              data={mockTemperatureData}
              color="#ef4444"
              unit="°C"
            />
            <TrendChart
              title="Health Score Trend"
              data={mockHealthScoreData}
              color="#f59e0b"
              unit="%"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pump Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pump ID</span>
                    <span className="text-sm font-medium">PMP-2023-0142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Model</span>
                    <span className="text-sm font-medium">XP-5000 Industrial</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Installation Date</span>
                    <span className="text-sm font-medium">Jan 15, 2023</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Maintenance</span>
                    <span className="text-sm font-medium">Mar 28, 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Location</span>
                    <span className="text-sm font-medium">Building C - Area 4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Responsible Technician</span>
                    <span className="text-sm font-medium">T. Johnson</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

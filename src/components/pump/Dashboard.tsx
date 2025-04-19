import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GaugeChart } from "./GaugeChart";
import { StatusIndicator } from "./StatusIndicator";
import { MetricCard } from "./MetricCard";
import { TrendChart } from "./TrendChart";
import { AlertItem } from "./AlertItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Battery,
  Droplet,
  Gauge,
  Info,
  Settings,
  Thermometer,
  Zap,
} from "lucide-react";
import { time } from "console";

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

// const mockAlerts = [
//   {
//     id: 1,
//     title: "High Current Draw Detected",
//     description: "Current draw is exceeding normal range by 15%",
//     severity: "warning",
//     timestamp: "2023-04-01T09:45:00",
//   },
//   {
//     id: 2,
//     title: "Vibration Warning",
//     description: "Unusual vibration patterns detected, maintenance recommended",
//     severity: "warning",
//     timestamp: "2023-04-01T08:30:00",
//   },
//   {
//     id: 3,
//     title: "Successful Maintenance",
//     description: "Scheduled maintenance completed successfully",
//     severity: "info",
//     timestamp: "2023-03-28T14:20:00",
//   },
//   {
//     id: 4,
//     title: "Temperature Rising",
//     description: "Motor temperature has increased 10°C in the last hour",
//     severity: "error",
//     timestamp: "2023-04-01T10:15:00",
//   },
// ];

const threshold = 600;
export const Dashboard = () => {
  const [selectedPump, setSelectedPump] = useState("pump_001");
  const [mockData, setMockData] = useState([]);
  const [mockCurrentData, setMockCurrentData] = useState([]);
  const [mockFlowData, setMockFlowData] = useState([]);
  const [flowRate, setFlowRate] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [power, setPower] = useState(0.0);
  const [current, setCurrent] = useState(0);
  const [inCurrent, setInCurrent] = useState(0);
  const [inPower, setInPower] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [avgCurrent, setAvgCurrent] = useState(0);
  const [avgFlowRate, setAvgFlowRate] = useState(0);
  const [operatingHours, setOperatingHours] = useState(0);
  const [filteredCurrent, setFilteredCurrent] = useState([]);
  const [filteredFlow, setFilteredFlow] = useState([]);
  const [mockAlerts, setMockAlerts] = useState([]);
  const [allDone, setAllDone] = useState(false);

  function formatTimeStamp(stamp: String) {
    const [dd, mm, yy, hh, min, ss] = stamp.split("_");
    const formatted = `${yy}-${mm}-${dd}T${hh}:${min}:${ss}`;
    return formatted;
  }

  useEffect(() => {
    axios
      .get(`https://iot-backend-98ll.onrender.com/api/pumps/${selectedPump}`)
      .then((response) => {
        setMockData(response.data);
      })
      .catch((error) => console.log("Error", error));

    axios
      .get(
        `https://iot-backend-98ll.onrender.com/api/pumps/${selectedPump}/runtime_active`
      )
      .then((response) => setOperatingHours(response.data.runtime_hours))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://iot-backend-98ll.onrender.com/api/filtered_current/${selectedPump}`
      )
      .then((response) => {
        setFilteredCurrent(response.data.current);
        setFilteredFlow(response.data.flowRate);
        setAllDone(true);
      })
      .catch((error) => console.log(error));
    console.log("Selected Pump", selectedPump);
  }, [selectedPump]);

  useEffect(() => {
    if (allDone == true) {
      let tempCurrent = [];
      let tempFlowRate = [];
      let avgCurrent = 0;
      let avgFlowRate = 0;
      let index = 0;
      for (const timestamp in mockData) {
        if (mockData.hasOwnProperty(timestamp)) {
          const reading = mockData[timestamp];
          const formattedTimestamp = formatTimeStamp(reading.timestamp);
          tempCurrent.push({
            timestamp: formattedTimestamp,
            value: reading.current,
            fil_value: filteredCurrent[index],
          });
          avgCurrent += reading.current;
          tempFlowRate.push({
            timestamp: formattedTimestamp,
            value: reading.flowRate,
            fil_value: filteredFlow[index],
          });
          avgFlowRate += reading.flowRate;
          index += 1;
        }
      }
      avgCurrent = avgCurrent / index + 1;
      avgFlowRate = avgFlowRate / index + 1;
      avgCurrent = parseFloat(avgCurrent.toFixed(2));
      avgFlowRate = parseFloat(avgFlowRate.toFixed(2));
      const keys = Object.keys(mockData);
      const lastFiveKeys = keys.slice(-5);
      let tempCur = 0;
      let tempPower = 0;
      let tempFlow = 0;
      let tempVoltage = 0;
      for (let i = 0; i < lastFiveKeys.length; i++) {
        const key = lastFiveKeys[i];
        tempCur += mockData[key].current;
        tempPower += mockData[key].electricalEnergy;
        tempFlow += mockData[key].flowRate;
      }
      tempCur /= 5;
      tempPower /= 5;
      tempPower = parseFloat(tempPower.toFixed(2));
      tempVoltage = (tempPower * 1000) / tempCur;
      tempVoltage = parseFloat(tempVoltage.toFixed(2));
      let tempPressure =
        0.5 *
        1000 *
        Math.pow(tempFlow / Math.pow(10, 6) / 60 / 0.0000282735, 2);
      tempPressure = parseFloat(tempPressure.toFixed(2));
      setAvgCurrent(avgCurrent);
      setAvgFlowRate(avgFlowRate);
      setPressure(tempPressure);
      setInCurrent(tempCur - current);
      setCurrent(tempCur);
      setInPower(tempPower - power);
      setPower(tempPower);
      setVoltage(tempVoltage);
      setMockCurrentData(tempCurrent);
      setMockFlowData(tempFlowRate);
      setFlowRate(tempFlow);
    }
  }, [allDone, selectedPump]);

  //   id: 4,
  //   title: "Temperature Rising",
  //   description: "Motor temperature has increased 10°C in the last hour",
  //   severity: "error",
  //   timestamp: "2023-04-01T10:15:00",
  // },

  useEffect(() => {
    const interval = setInterval(() => {
      if (mockCurrentData.at(-1).fil_value > threshold) {
        setMockAlerts((prevState) => [
          ...prevState,
          {
            id: prevState[prevState.length - 1] + 1,
            title: "Abnormal Current Level",
            description: `Current value ${current}`,
            severity: "warning",
            timestamp: new Date().toISOString().split(".")[0],
          },
        ]);
      }
    }, 180000);
    console.log("Mock Data", mockCurrentData.at(-1));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pump Health Guardian</h1>
          <p className="text-muted-foreground">
            Real-time pump monitoring dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="healthy" label="System Status" />
        </div>
        <div className="flex justify-end mb-4">
          <Select
            defaultValue="pump_001"
            onValueChange={(value) => setSelectedPump(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select pump" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pump_001">Pump 001</SelectItem>
              <SelectItem value="pump_002">Pump 002</SelectItem>
              <SelectItem value="pump_003">Pump 003</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="monitoring">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Current"
              value={current}
              unit="mA"
              change={inCurrent}
              trend="up"
              icon={<Zap className="h-4 w-4" />}
            />
            <MetricCard
              title="Voltage"
              value={voltage}
              unit="V"
              change={0}
              trend="neutral"
              icon={<Battery className="h-4 w-4" />}
            />
            <MetricCard
              title="Power Consumption"
              value={power}
              unit="W"
              change={parseFloat(inPower.toFixed(2))}
              trend="up"
              icon={<Activity className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GaugeChart
              title="Flow Rate"
              value={flowRate}
              max={280}
              unit="mL/min"
              color="default"
            />
            <GaugeChart
              title="Pressure"
              value={pressure}
              max={10}
              unit="Pascal"
              color="warning"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TrendChart
              title="Current Over Time"
              data={mockCurrentData}
              dataKeys={[
                { key: "value", name: "Original", color: "#3b82f6", unit: "A" },
                {
                  key: "fil_value",
                  name: "Filtered",
                  color: "#10b981",
                  unit: "mA",
                },
              ]}
            />
            <TrendChart
              title="Flow Rate over Time"
              data={mockFlowData}
              dataKeys={[
                {
                  key: "value",
                  name: "Original",
                  color: "#3b82f6",
                  unit: "mL/min",
                },
                {
                  key: "fil_value",
                  name: "Filtered",
                  color: "#10b981",
                  unit: "mL/min",
                },
              ]}
            />
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <TrendChart
              title="Current Over Time"
              data={mockCurrentData}
              dataKeys={[
                { key: "value", name: "Original", color: "#3b82f6", unit: "A" },
                {
                  key: "fil_value",
                  name: "Filtered",
                  color: "#10b981",
                  unit: "mA",
                },
              ]}
            />
            <TrendChart
              title="Flow Rate over Time"
              data={mockFlowData}
              dataKeys={[
                { key: "value", name: "Original", color: "#3b82f6", unit: "A" },
                {
                  key: "fil_value",
                  name: "Filtered",
                  color: "#10b981",
                  unit: "mL/min",
                },
              ]}
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
              title="Estimated RUL"
              value="1,240"
              unit="hours"
              icon={<Info className="h-4 w-4" />}
            />
            <MetricCard
              title="Operating Hours"
              value={operatingHours}
              unit="hours"
              icon={<Settings className="h-4 w-4" />}
            />
            <Button asChild>
              <a
                href="https://iot-backend-ml-mtxxkw7lg29yrxcg3j68g2.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to External Site
              </a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Maintenance Schedule
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Component Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Impeller</span>
                    <StatusIndicator status="healthy" label="Good" size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bearings</span>
                    <StatusIndicator
                      status="warning"
                      label="Attention"
                      size="sm"
                    />
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
              <CardTitle className="text-sm font-medium">
                Recent Alerts
              </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Alert Settings
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Notifications</span>
                    <span className="text-sm font-medium text-green-600">
                      Enabled
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SMS Alerts</span>
                    <span className="text-sm font-medium text-green-600">
                      Enabled
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Alerts</span>
                    <span className="text-sm font-medium text-green-600">
                      Enabled
                    </span>
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
                <CardTitle className="text-sm font-medium">
                  Historical Data View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{avgFlowRate}</p>
                      <p className="text-sm text-muted-foreground">
                        Avg Flow Rate (mL/min)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{avgCurrent}</p>
                      <p className="text-sm text-muted-foreground">
                        Avg Current (mA)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Pump Metadata
              </CardTitle>
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
                    <span className="text-sm font-medium">
                      XP-5000 Industrial
                    </span>
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
                    <span className="text-sm font-medium">
                      Building C - Area 4
                    </span>
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

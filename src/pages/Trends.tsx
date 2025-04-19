import { TrendChart } from "@/components/pump/TrendChart";

// Mock data for demonstration
const currentData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(2024, 3, 19, i).toISOString(),
  value: 15 + Math.random() * 2,
}));

const flowRateData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(2024, 3, 19, i).toISOString(),
  value: 45 + Math.random() * 5,
}));

const Trends = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Pump Performance Trends</h1>
      <div className="grid gap-6">
        <TrendChart
          title="Current Over Time"
          data={currentData}
          color="#3b82f6"
          unit="A"
        />
        <TrendChart
          title="Flow Rate Over Time"
          data={flowRateData}
          color="#10b981"
          unit=" L/min"
        />
      </div>
    </div>
  );
};

export default Trends;

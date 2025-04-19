import React from "react";
import { Dashboard } from "@/components/pump/Dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Select defaultValue="pump_001">
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
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;

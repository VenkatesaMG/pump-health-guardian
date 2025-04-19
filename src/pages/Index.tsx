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
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;

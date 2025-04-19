
import React from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "@/components/pump/Dashboard";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Button asChild>
            <Link to="/trends">
              <LineChart className="mr-2 h-4 w-4" />
              View Trends
            </Link>
          </Button>
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, AlertTriangle, BarChart3, Activity } from "lucide-react";

const hotspotTrendData = [
  {
    month: "Jan",
    potholes: 24,
    streetlights: 15,
    water: 9,
    sanitation: 21,
    predicted: 28,
  },
  {
    month: "Feb",
    potholes: 31,
    streetlights: 18,
    water: 12,
    sanitation: 26,
    predicted: 35,
  },
  {
    month: "Mar",
    potholes: 28,
    streetlights: 22,
    water: 15,
    sanitation: 30,
    predicted: 38,
  },
  {
    month: "Apr",
    potholes: 35,
    streetlights: 26,
    water: 18,
    sanitation: 33,
    predicted: 42,
  },
  {
    month: "May",
    potholes: 42,
    streetlights: 31,
    water: 22,
    sanitation: 38,
    predicted: 48,
  },
  {
    month: "Jun",
    potholes: 38,
    streetlights: 28,
    water: 25,
    sanitation: 35,
    predicted: 45,
  },
  {
    month: "Jul",
    potholes: 45,
    streetlights: 33,
    water: 28,
    sanitation: 42,
    predicted: 52,
  },
  {
    month: "Aug",
    potholes: 52,
    streetlights: 38,
    water: 32,
    sanitation: 48,
    predicted: 58,
  },
];

const resourceDemandData = [
  {
    week: "Week 1",
    maintenance: 72,
    emergency: 85,
    planned: 68,
    capacity: 100,
  },
  {
    week: "Week 2",
    maintenance: 68,
    emergency: 78,
    planned: 74,
    capacity: 100,
  },
  {
    week: "Week 3",
    maintenance: 82,
    emergency: 88,
    planned: 65,
    capacity: 100,
  },
  {
    week: "Week 4",
    maintenance: 78,
    emergency: 82,
    planned: 72,
    capacity: 100,
  },
  {
    week: "Week 5",
    maintenance: 86,
    emergency: 92,
    planned: 62,
    capacity: 100,
  },
  {
    week: "Week 6",
    maintenance: 80,
    emergency: 86,
    planned: 70,
    capacity: 100,
  },
];

const departmentPerformanceData = [
  {
    department: "Water & Sewage",
    resolved: 38,
    total: 45,
    slaCompliance: 84.4,
    efficiency: 88,
  },
  {
    department: "Roads & Transport",
    resolved: 46,
    total: 52,
    slaCompliance: 92.3,
    efficiency: 91,
  },
  {
    department: "Sanitation",
    resolved: 35,
    total: 38,
    slaCompliance: 94.7,
    efficiency: 95,
  },
  {
    department: "Electrical",
    resolved: 19,
    total: 21,
    slaCompliance: 90.5,
    efficiency: 87,
  },
];

const predictionAccuracyData = [
  {
    month: "Jan",
    predicted: 40,
    actual: 42,
    accuracy: 95,
  },
  {
    month: "Feb",
    predicted: 44,
    actual: 46,
    accuracy: 94,
  },
  {
    month: "Mar",
    predicted: 57,
    actual: 55,
    accuracy: 96,
  },
  {
    month: "Apr",
    predicted: 68,
    actual: 71,
    accuracy: 95,
  },
  {
    month: "May",
    predicted: 79,
    actual: 77,
    accuracy: 97,
  },
  {
    month: "Jun",
    predicted: 89,
    actual: 91,
    accuracy: 97,
  },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartAreaInteractive() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");
  const [selectedChart, setSelectedChart] = useState("hotspot");

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Predictive Issue Management Analytics
          </h2>
          <p className="text-muted-foreground">
            AI-powered insights and trend projections for civic issue management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedTimeframe}
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="ml-2">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs
        value={selectedChart}
        onValueChange={setSelectedChart}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hotspot">Hotspot Trends</TabsTrigger>
          <TabsTrigger value="resource">Resource Demand</TabsTrigger>
          <TabsTrigger value="performance">Department Performance</TabsTrigger>
          <TabsTrigger value="prediction">Prediction Accuracy</TabsTrigger>
        </TabsList>

        {/* Hotspot Trend Projection */}
        <TabsContent value="hotspot">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Hotspot Trend Projection
              </CardTitle>
              <CardDescription>
                AI-predicted issue trends by category with 94% accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hotspotTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="potholes"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                      name="Potholes"
                    />
                    <Area
                      type="monotone"
                      dataKey="streetlights"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                      name="Street Lights"
                    />
                    <Area
                      type="monotone"
                      dataKey="water"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="Water Issues"
                    />
                    <Area
                      type="monotone"
                      dataKey="sanitation"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Sanitation"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="AI Prediction"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Potholes: +18% trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span>Lighting: +12% trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Water: +15% trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Sanitation: +8% trend</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Demand Forecasting */}
        <TabsContent value="resource">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                Resource Demand Forecasting
              </CardTitle>
              <CardDescription>
                Team capacity utilization and demand predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceDemandData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="maintenance"
                      fill="#3b82f6"
                      name="Maintenance Teams"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="emergency"
                      fill="#ef4444"
                      name="Emergency Response"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="planned"
                      fill="#10b981"
                      name="Planned Projects"
                      radius={[2, 2, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      dataKey="capacity"
                      stroke="#6b7280"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      name="Team Capacity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="font-medium text-sm">Capacity Alert</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Week 3 & 5 showing 95%+ utilization
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-sm">Peak Demand</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Emergency response peaks mid-month
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sm">Efficiency</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average 89% resource utilization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department Performance */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Department Performance Analytics
              </CardTitle>
              <CardDescription>
                SLA compliance and efficiency metrics by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentPerformanceData}
                    layout="horizontal"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="department"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      width={120}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="slaCompliance"
                      fill="#10b981"
                      name="SLA Compliance %"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="efficiency"
                      fill="#3b82f6"
                      name="Efficiency %"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {departmentPerformanceData.map((dept, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-2">
                      {dept.department}
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Resolved:</span>
                        <span className="font-medium">
                          {dept.resolved}/{dept.total}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SLA:</span>
                        <span
                          className={`font-medium ${dept.slaCompliance > 90 ? "text-green-600" : "text-orange-600"}`}
                        >
                          {dept.slaCompliance}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prediction Accuracy */}
        <TabsContent value="prediction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                AI Prediction Accuracy
              </CardTitle>
              <CardDescription>
                Model performance and prediction vs actual issue trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionAccuracyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="AI Predicted"
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Actual Issues"
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                      name="Accuracy %"
                      yAxisId="right"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">96.2%</div>
                  <div className="text-sm text-muted-foreground">
                    Average Accuracy
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">±2.1</div>
                  <div className="text-sm text-muted-foreground">
                    Average Deviation
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    7 days
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Prediction Window
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

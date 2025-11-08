"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Eye,
  CheckCircle,
  XCircle,
  Bell,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SLAAlert {
  id: string;
  issueId: number;
  title: string;
  category: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Escalated";
  reportedDate: string;
  slaDeadline: string;
  timeRemaining: string;
  location: string;
  assignedTo: string;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  estimatedImpact: string;
}

const mockSLAAlerts: SLAAlert[] = [
  {
    id: "SLA-001",
    issueId: 1342,
    title: "Broken Water Main - FC Road",
    category: "Water",
    priority: "Critical",
    status: "Open",
    reportedDate: "2024-11-08T08:30:00Z",
    slaDeadline: "2024-11-08T14:30:00Z",
    timeRemaining: "1h 45m",
    location: "FC Road, Panjim",
    assignedTo: "Emergency Team Alpha",
    riskLevel: "Critical",
    estimatedImpact: "800+ citizens affected",
  },
  {
    id: "SLA-002",
    issueId: 1358,
    title: "Traffic Signal System Failure",
    category: "Traffic",
    priority: "High",
    status: "In Progress",
    reportedDate: "2024-11-08T07:15:00Z",
    slaDeadline: "2024-11-08T19:15:00Z",
    timeRemaining: "5h 20m",
    location: "Dayanand Bandodkar Marg",
    assignedTo: "Traffic Systems Team",
    riskLevel: "High",
    estimatedImpact: "Heavy traffic congestion",
  },
  {
    id: "SLA-003",
    issueId: 1365,
    title: "Sewage Overflow - Residential Area",
    category: "Sanitation",
    priority: "High",
    status: "Open",
    reportedDate: "2024-11-08T06:45:00Z",
    slaDeadline: "2024-11-08T18:45:00Z",
    timeRemaining: "7h 30m",
    location: "Altinho Hill, Panjim",
    assignedTo: "Sanitation Team Beta",
    riskLevel: "High",
    estimatedImpact: "Health & hygiene risk",
  },
  {
    id: "SLA-004",
    issueId: 1372,
    title: "Street Lighting Failure - Main Road",
    category: "Lighting",
    priority: "Medium",
    status: "In Progress",
    reportedDate: "2024-11-07T22:30:00Z",
    slaDeadline: "2024-11-09T10:30:00Z",
    timeRemaining: "1d 12h",
    location: "18th June Road, Panjim",
    assignedTo: "Electrical Maintenance",
    riskLevel: "Medium",
    estimatedImpact: "Public safety concern",
  },
  {
    id: "SLA-005",
    issueId: 1380,
    title: "Major Pothole - Heavy Rainfall",
    category: "Roads",
    priority: "Critical",
    status: "Open",
    reportedDate: "2024-11-08T09:15:00Z",
    slaDeadline: "2024-11-08T15:15:00Z",
    timeRemaining: "2h 55m",
    location: "Campal Gardens Road",
    assignedTo: "Road Emergency Team",
    riskLevel: "Critical",
    estimatedImpact: "400+ commuters affected",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800";
    case "High":
      return "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800";
    case "Medium":
      return "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800";
    case "Low":
      return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800";
    default:
      return "bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200";
    case "In Progress":
      return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200";
    case "Escalated":
      return "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200";
    default:
      return "bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200";
  }
};

const getTimeRemainingColor = (timeRemaining: string) => {
  if (timeRemaining.includes("h") && parseInt(timeRemaining) < 4) {
    return "text-red-600 dark:text-red-400 font-semibold";
  }
  if (timeRemaining.includes("h") && parseInt(timeRemaining) < 8) {
    return "text-orange-600 dark:text-orange-400 font-medium";
  }
  return "text-green-600 dark:text-green-400";
};

export function SLAAlertsTable() {
  const [selectedAlert, setSelectedAlert] = useState<SLAAlert | null>(null);

  // Show toast notifications for critical alerts on component mount
  useEffect(() => {
    const criticalAlerts = mockSLAAlerts.filter(
      (alert) => alert.priority === "Critical",
    );

    if (criticalAlerts.length > 0) {
      // Show only the first critical alert to avoid spam
      const alert = criticalAlerts[0];
      const timer = setTimeout(() => {
        toast.error("Critical SLA Alert!", {
          description: `${alert.title} at ${alert.location} - ${alert.timeRemaining} remaining`,
          icon: <Bell className="h-4 w-4" />,
          action: {
            label: "View",
            onClick: () => setSelectedAlert(alert),
          },
          duration: 8000,
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const criticalCount = mockSLAAlerts.filter(
    (alert) => alert.priority === "Critical",
  ).length;
  const highCount = mockSLAAlerts.filter(
    (alert) => alert.priority === "High",
  ).length;

  return (
    <Card className="w-full transition-all duration-300 ease-out hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              SLA Alert System - At-Risk Tickets
            </CardTitle>
            <CardDescription className="mt-1">
              Critical civic issues requiring immediate attention with automated
              push notifications
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
            >
              {criticalCount} Critical
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
            >
              {highCount} High Priority
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Alert ID</TableHead>
                <TableHead>Issue Details</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSLAAlerts.map((alert) => (
                <TableRow
                  key={alert.id}
                  className={`${
                    alert.priority === "Critical"
                      ? "bg-red-50/50 dark:bg-red-950/20"
                      : ""
                  } hover:bg-gray-50 dark:hover:bg-gray-900/50`}
                >
                  <TableCell className="font-mono text-sm">
                    {alert.id}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-sm leading-tight">
                        {alert.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          {alert.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          #{alert.issueId}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(alert.status)}
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span
                        className={`text-sm ${getTimeRemainingColor(
                          alert.timeRemaining,
                        )}`}
                      >
                        {alert.timeRemaining}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[120px]">
                        {alert.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[100px]">
                        {alert.assignedTo}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedAlert(alert)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              SLA Alert Details - {alert.id}
                            </DialogTitle>
                            <DialogDescription>
                              Comprehensive information about this critical
                              issue
                            </DialogDescription>
                          </DialogHeader>
                          {selectedAlert && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Issue Title
                                    </label>
                                    <p className="text-sm font-medium">
                                      {selectedAlert.title}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Category & ID
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">
                                        {selectedAlert.category}
                                      </Badge>
                                      <span className="text-sm">
                                        #{selectedAlert.issueId}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Priority Level
                                    </label>
                                    <div>
                                      <Badge
                                        className={getPriorityColor(
                                          selectedAlert.priority,
                                        )}
                                      >
                                        {selectedAlert.priority}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Current Status
                                    </label>
                                    <div>
                                      <Badge
                                        variant="outline"
                                        className={getStatusColor(
                                          selectedAlert.status,
                                        )}
                                      >
                                        {selectedAlert.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Reported Date
                                    </label>
                                    <p className="text-sm">
                                      {formatDate(selectedAlert.reportedDate)}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      SLA Deadline
                                    </label>
                                    <p className="text-sm">
                                      {formatDate(selectedAlert.slaDeadline)}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Time Remaining
                                    </label>
                                    <p
                                      className={`text-sm ${getTimeRemainingColor(
                                        selectedAlert.timeRemaining,
                                      )}`}
                                    >
                                      {selectedAlert.timeRemaining}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Risk Level
                                    </label>
                                    <div>
                                      <Badge
                                        className={getPriorityColor(
                                          selectedAlert.riskLevel,
                                        )}
                                      >
                                        {selectedAlert.riskLevel}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Location
                                  </label>
                                  <p className="text-sm flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    {selectedAlert.location}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Assigned Team
                                  </label>
                                  <p className="text-sm flex items-center gap-1">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    {selectedAlert.assignedTo}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Estimated Impact
                                  </label>
                                  <p className="text-sm">
                                    {selectedAlert.estimatedImpact}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4 border-t">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Mark Resolved
                                </Button>
                                <Button variant="outline" size="sm">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Escalate Issue
                                </Button>
                                <Button variant="outline" size="sm">
                                  <User className="h-4 w-4 mr-1" />
                                  Reassign
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Showing {mockSLAAlerts.length} active SLA alerts •{" "}
          <span className="text-red-600 dark:text-red-400 font-medium">
            {criticalCount} Critical
          </span>{" "}
          •{" "}
          <span className="text-orange-600 dark:text-orange-400 font-medium">
            {highCount} High Priority
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

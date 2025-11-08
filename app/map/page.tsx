"use client";

import { useState } from "react";
import {
  MapPin,
  Camera,
  MapPinned,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InteractiveMap } from "@/components/interactive-map";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

// Mock issues data
const mockIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues",
    category: "Road",
    status: "open" as const,
    location: { lat: 15.4909, lng: 73.8278 },
    address: "Main Street, Panjim",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Broken Streetlight",
    description: "Streetlight not working since last week",
    category: "Lighting",
    status: "in-progress" as const,
    location: { lat: 15.4989, lng: 73.8345 },
    address: "Church Square, Panjim",
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "Overflowing Garbage Bin",
    description: "Garbage bin overflowing for 3 days",
    category: "Sanitation",
    status: "resolved" as const,
    location: { lat: 15.485, lng: 73.825 },
    address: "Market Area, Panjim",
    date: "2024-01-13",
  },
  {
    id: 4,
    title: "Water Leak",
    description: "Continuous water leak from pipe",
    category: "Water",
    status: "open" as const,
    location: { lat: 15.495, lng: 73.83 },
    address: "Residency Road, Panjim",
    date: "2024-01-12",
  },
];

const statusColors = {
  open: "bg-black dark:bg-white text-white dark:text-black",
  "in-progress": "bg-gray-700 dark:bg-gray-300 text-white dark:text-black",
  resolved: "bg-gray-400 dark:bg-gray-600 text-white dark:text-white",
};

const statusIcons = {
  open: AlertCircle,
  "in-progress": Clock,
  resolved: CheckCircle,
};

export default function MapPage() {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
                Interactive Issue Map
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                View reported civic issues on the map and track their resolution
                progress in real-time
              </p>
            </div>
            <Dialog
              open={isReportDialogOpen}
              onOpenChange={setIsReportDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  <MapPinned className="mr-2 size-5" />
                  Report New Issue
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Report Civic Issue
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to report a civic issue with
                    description, photo, and live location
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="issue-title">Issue Title *</Label>
                    <Input
                      id="issue-title"
                      placeholder="e.g., Pothole on Main Street"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="road">Road</SelectItem>
                        <SelectItem value="lighting">Lighting</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="drainage">Drainage</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="photo">Upload Photo</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="photo"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG or JPEG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="photo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Live Location *</Label>
                    <div className="mt-2 space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={getLocation}
                      >
                        <MapPin className="mr-2 size-4" />
                        {location
                          ? `Location Captured: ${location.lat.toFixed(
                              4,
                            )}, ${location.lng.toFixed(4)}`
                          : "Capture Current Location"}
                      </Button>
                      {location && (
                        <Alert>
                          <MapPin className="h-4 w-4" />
                          <AlertDescription>
                            Location captured successfully! Your GPS coordinates
                            will be attached to the report.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      Submit Report
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsReportDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonGradientCard>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-400">
                  Total Issues
                </div>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.length}
                </div>
              </div>
            </NeonGradientCard>
            <NeonGradientCard>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-400">
                  Open Issues
                </div>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.filter((i) => i.status === "open").length}
                </div>
              </div>
            </NeonGradientCard>
            <NeonGradientCard>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-400">
                  In Progress
                </div>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.filter((i) => i.status === "in-progress").length}
                </div>
              </div>
            </NeonGradientCard>
            <NeonGradientCard>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-400">
                  Resolved
                </div>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.filter((i) => i.status === "resolved").length}
                </div>
              </div>
            </NeonGradientCard>
          </div>

          {/* Map and Issues */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Interactive Map */}
            <NeonGradientCard>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Interactive City Map
                  </h3>
                  <p className="text-sm text-gray-400">
                    Click on markers to view issue details. Color-coded by
                    status:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-red-500 text-white">● Open</Badge>
                    <Badge className="bg-amber-500 text-white">
                      ● In Progress
                    </Badge>
                    <Badge className="bg-green-500 text-white">
                      ● Resolved
                    </Badge>
                  </div>
                </div>
                <InteractiveMap
                  center={[73.8278, 15.4909]}
                  zoom={12}
                  markers={mockIssues.map((issue) => ({
                    id: issue.id,
                    position: [issue.location.lng, issue.location.lat],
                    title: issue.title,
                    status: issue.status,
                  }))}
                  onMarkerClick={(id) => setSelectedIssue(id)}
                />
              </div>
            </NeonGradientCard>

            {/* Issues List */}
            <NeonGradientCard>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-white">
                  Reported Issues
                </h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {mockIssues.map((issue) => {
                    const StatusIcon =
                      statusIcons[issue.status as keyof typeof statusIcons];
                    return (
                      <div
                        key={issue.id}
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          selectedIssue === issue.id
                            ? "border-white bg-gray-900"
                            : "border-gray-800 hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedIssue(issue.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3">
                            <StatusIcon className="size-5 mt-0.5 text-black dark:text-white" />
                            <div>
                              <h4 className="font-semibold text-white">
                                {issue.title}
                              </h4>
                              <p className="text-sm text-gray-400 mt-1">
                                {issue.description}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              statusColors[
                                issue.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {issue.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {issue.address}
                          </span>
                          <span>{issue.date}</span>
                          <Badge variant="outline" className="text-xs">
                            {issue.category}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </NeonGradientCard>
          </div>

          {/* Legend */}
          <NeonGradientCard className="mt-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-semibold text-white">
                How It Works
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white text-black font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Report Issue
                    </h4>
                    <p className="text-sm text-gray-400">
                      Submit civic issues with description, photo, and live GPS
                      location
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white text-black font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Track Progress
                    </h4>
                    <p className="text-sm text-gray-400">
                      Monitor your reported issues as they move through stages:
                      Open → In Progress → Resolved
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white text-black font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Get Updates
                    </h4>
                    <p className="text-sm text-gray-400">
                      Receive real-time notifications and updates on issue
                      resolution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NeonGradientCard>
        </div>
      </main>
    </div>
  );
}

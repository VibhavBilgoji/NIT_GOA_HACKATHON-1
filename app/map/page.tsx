"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Issue } from "@/lib/types";
import toast from "react-hot-toast";

// Type for map-compatible issues
interface MapIssue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  location: { lat: number; lng: number };
  address: string;
  date: string;
  photoUrl?: string;
}

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
  const [issues, setIssues] = useState<MapIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(
            "Error getting user location:",
            error.message || "Unknown error",
          );
        },
      );
    }
  }, []);

  // Fetch issues from API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/issues?limit=100&sortBy=createdAt&sortOrder=desc",
        );
        const data = await response.json();

        if (data.success && data.data?.issues) {
          // Transform API issues to map format
          const transformedIssues: MapIssue[] = data.data.issues.map(
            (issue: Issue) => ({
              id: issue.id,
              title: issue.title,
              description: issue.description,
              category: formatCategory(issue.category),
              status: issue.status,
              location: {
                lat: issue.coordinates.lat,
                lng: issue.coordinates.lng,
              },
              address: issue.location,
              date: new Date(issue.createdAt).toLocaleDateString(),
              photoUrl: issue.photoUrl,
            }),
          );
          setIssues(transformedIssues);
        } else {
          toast.error("Failed to load issues");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        toast.error("Error loading issues. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Format category for display
  const formatCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      pothole: "Road",
      streetlight: "Lighting",
      garbage: "Sanitation",
      water_leak: "Water",
      road: "Road",
      sanitation: "Sanitation",
      drainage: "Drainage",
      electricity: "Electricity",
      traffic: "Traffic",
      other: "Other",
    };
    return categoryMap[category] || category;
  };

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
            <Card className="border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <BorderBeam duration={6} delay={0} />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black dark:text-white">
                  {isLoading ? "..." : issues.length}
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <BorderBeam duration={6} delay={1} />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Open Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black dark:text-white">
                  {isLoading
                    ? "..."
                    : issues.filter((i) => i.status === "open").length}
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <BorderBeam duration={6} delay={2} />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black dark:text-white">
                  {isLoading
                    ? "..."
                    : issues.filter((i) => i.status === "in-progress").length}
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <BorderBeam duration={6} delay={3} />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black dark:text-white">
                  {isLoading
                    ? "..."
                    : issues.filter((i) => i.status === "resolved").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map - Full Width and Larger */}
          <Card className="border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:shadow-lg mb-6">
            <BorderBeam duration={6} delay={0} />
            <CardHeader>
              <CardTitle className="text-black dark:text-white">
                Interactive City Map
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Click on markers to view issue details. Your location is shown
                in blue 📍
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-blue-500 text-white">
                  ● Your Location
                </Badge>
                <Badge className="bg-red-500 text-white">● Open</Badge>
                <Badge className="bg-amber-500 text-white">● In Progress</Badge>
                <Badge className="bg-green-500 text-white">● Resolved</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <InteractiveMap
                center={
                  userLocation
                    ? [userLocation.lng, userLocation.lat]
                    : [73.8278, 15.4909]
                }
                zoom={userLocation ? 14 : 12}
                markers={issues.map((issue) => ({
                  id: issue.id,
                  position: [issue.location.lng, issue.location.lat],
                  title: issue.title,
                  status: issue.status,
                }))}
                onMarkerClick={(id) => setSelectedIssue(String(id))}
                height="calc(100vh - 500px)"
                showUserLocation={true}
                userLocation={
                  userLocation ? [userLocation.lng, userLocation.lat] : null
                }
              />
            </CardContent>
          </Card>

          {/* Issues List - Below Map */}
          <div className="grid gap-6 lg:grid-cols-1">
            <Card className="border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:shadow-lg">
              <BorderBeam duration={6} delay={1} />
              <CardHeader>
                <CardTitle className="text-black dark:text-white">
                  Reported Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {isLoading ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Loading issues...
                    </div>
                  ) : issues.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No issues reported yet. Be the first to report!
                    </div>
                  ) : (
                    issues.map((issue) => {
                      const StatusIcon =
                        statusIcons[issue.status as keyof typeof statusIcons];
                      return (
                        <div
                          key={issue.id}
                          className={`p-4 rounded-lg border transition-all duration-300 ease-out cursor-pointer hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg ${
                            selectedIssue === issue.id
                              ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900 shadow-md"
                              : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                          }`}
                          onClick={() => setSelectedIssue(issue.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-3">
                              <StatusIcon className="size-5 mt-0.5 text-black dark:text-white" />
                              <div>
                                <h4 className="font-semibold text-black dark:text-white">
                                  {issue.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-500">
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
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legend */}
          <Card className="mt-6 border-gray-200 dark:border-gray-800 relative overflow-hidden transition-all duration-300 ease-out hover:shadow-lg">
            <BorderBeam duration={6} delay={2} />
            <CardHeader>
              <CardTitle className="text-black dark:text-white">
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-1">
                      Report Issue
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Submit civic issues with description, photo, and live GPS
                      location
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-1">
                      Track Progress
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monitor your reported issues as they move through stages:
                      Open → In Progress → Resolved
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-1">
                      Get Updates
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive real-time notifications and updates on issue
                      resolution
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

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
          toast.success("Your location has been detected!");
        },
        (error) => {
          let errorMessage = "Unable to get your location. ";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage +=
                "Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out. Please try again.";
              break;
            default:
              errorMessage += "An unknown error occurred.";
          }
          toast.error(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
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
      toast.loading("Getting your location...", { id: "location-loading" });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.dismiss("location-loading");
          toast.success("Location captured successfully!");
        },
        (error) => {
          toast.dismiss("location-loading");
          let errorMessage = "Unable to get your location. ";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage +=
                "Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out. Please try again.";
              break;
            default:
              errorMessage += "An unknown error occurred.";
          }
          toast.error(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
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
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Report a New Issue</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to report a civic issue. Your
                    location will be automatically captured.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title</Label>
                    <Input id="title" placeholder="Brief description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the issue"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pothole">Pothole</SelectItem>
                        <SelectItem value="streetlight">
                          Street Light
                        </SelectItem>
                        <SelectItem value="garbage">Garbage</SelectItem>
                        <SelectItem value="water_leak">Water Leak</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input id="photo" type="file" accept="image/*" />
                      <Button type="button" variant="outline" size="icon">
                        <Camera className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        readOnly
                        value={
                          location
                            ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
                            : "Not captured yet"
                        }
                        placeholder="Click button to capture location"
                      />
                      <Button
                        type="button"
                        onClick={getLocation}
                        variant="outline"
                        size="icon"
                      >
                        <MapPin className="size-4" />
                      </Button>
                    </div>
                    {location && (
                      <Alert>
                        <AlertCircle className="size-4" />
                        <AlertDescription>
                          Location captured successfully! Latitude:{" "}
                          {location.lat.toFixed(6)}, Longitude:{" "}
                          {location.lng.toFixed(6)}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsReportDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      Submit Report
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="relative overflow-hidden">
              <BorderBeam duration={8} delay={0} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Issues
                </CardTitle>
                <MapPin className="size-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black dark:text-white">
                  {issues.length}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Reported by citizens
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <BorderBeam duration={8} delay={2} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Open Issues
                </CardTitle>
                <AlertCircle className="size-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black dark:text-white">
                  {issues.filter((issue) => issue.status === "open").length}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Awaiting resolution
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <BorderBeam duration={8} delay={4} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="size-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black dark:text-white">
                  {issues.filter((issue) => issue.status === "resolved").length}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Successfully fixed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5" />
                Live Issue Map
              </CardTitle>
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
                onMarkerClick={(id) => setSelectedIssue(id.toString())}
                height="calc(100vh - 500px)"
                showUserLocation={true}
                userLocation={
                  userLocation ? [userLocation.lng, userLocation.lat] : null
                }
              />
            </CardContent>
          </Card>

          {/* Issue List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading issues...
                </div>
              ) : issues.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No issues reported yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.map((issue) => {
                    const StatusIcon =
                      statusIcons[issue.status as keyof typeof statusIcons] ||
                      AlertCircle;
                    return (
                      <div
                        key={issue.id}
                        className={`p-4 rounded-lg border border-gray-200 dark:border-gray-800 transition-colors cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 ${
                          selectedIssue === issue.id
                            ? "bg-gray-50 dark:bg-gray-900"
                            : ""
                        }`}
                        onClick={() => setSelectedIssue(issue.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-black dark:text-white">
                                {issue.title}
                              </h3>
                              <Badge
                                className={
                                  statusColors[
                                    issue.status as keyof typeof statusColors
                                  ] || statusColors.open
                                }
                              >
                                <StatusIcon className="size-3 mr-1" />
                                {issue.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {issue.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                {issue.address}
                              </span>
                              <span>{issue.category}</span>
                              <span>{issue.date}</span>
                            </div>
                          </div>
                          {issue.photoUrl && (
                            <div className="ml-4">
                              <img
                                src={issue.photoUrl}
                                alt={issue.title}
                                className="w-20 h-20 object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

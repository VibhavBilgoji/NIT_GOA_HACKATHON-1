"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  MapPin,
  ArrowLeft,
  Upload,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import toast from "react-hot-toast";
import { WARDS } from "@/lib/types";

interface FilePreview {
  file: File;
  preview: string;
}

export default function ReportIssuePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    ward: "",
  });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Location captured successfully!");
        },
        (error) => {
          const errorMessage =
            error.message || "Unable to get location. Please enable GPS.";
          toast.error(errorMessage);
          console.error(error);
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Check total number of files
    if (selectedFiles.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 photos");
      return;
    }

    // Validate each file
    const validFiles: FilePreview[] = [];
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        continue;
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        validFiles.push({
          file,
          preview: reader.result as string,
        });

        if (
          validFiles.length ===
          files.filter(
            (f) => f.size <= 5 * 1024 * 1024 && f.type.startsWith("image/"),
          ).length
        ) {
          setSelectedFiles((prev) => [...prev, ...validFiles]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    setIsUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(({ file }) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (!data.success || !data.urls) {
        throw new Error(data.error || "Upload failed");
      }

      return data.urls;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      toast.error("Please capture your location before submitting");
      return;
    }

    if (!formData.title || !formData.category || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.description.length < 20) {
      toast.error("Description must be at least 20 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload photos first
      let photoUrls: string[] = [];
      if (selectedFiles.length > 0) {
        toast.loading("Uploading photos...");
        photoUrls = await uploadPhotos();
        toast.dismiss();
        toast.success(`${photoUrls.length} photo(s) uploaded successfully`);
      }

      // Get user token
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to report an issue");
        router.push("/login");
        return;
      }

      // Submit issue
      const issueData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: `${location.lat}, ${location.lng}`,
        coordinates: {
          lat: location.lat,
          lng: location.lng,
        },
        beforePhotoUrls: photoUrls,
        ward: formData.ward || undefined,
      };

      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(issueData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit issue");
      }

      const result = await response.json();

      toast.success("Issue reported successfully!");

      // Redirect to the issue detail page if ID is available
      if (result.data?.id) {
        router.push(`/issues/${result.data.id}`);
      } else {
        router.push("/map");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to report issue. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/map">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Report Civic Issue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Help improve your community by reporting civic issues with
            description, photos, and live location.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              Fill in the details below. Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Title */}
              <div className="space-y-2">
                <Label htmlFor="issue-title">Issue Title *</Label>
                <Input
                  id="issue-title"
                  placeholder="e.g., Pothole on Main Street"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="bg-white dark:bg-black"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="bg-white dark:bg-black">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pothole">🕳️ Pothole</SelectItem>
                    <SelectItem value="streetlight">💡 Street Light</SelectItem>
                    <SelectItem value="garbage">🗑️ Garbage</SelectItem>
                    <SelectItem value="water_leak">💧 Water Leak</SelectItem>
                    <SelectItem value="road">🛣️ Road</SelectItem>
                    <SelectItem value="sanitation">🧹 Sanitation</SelectItem>
                    <SelectItem value="drainage">🌊 Drainage</SelectItem>
                    <SelectItem value="electricity">⚡ Electricity</SelectItem>
                    <SelectItem value="traffic">🚦 Traffic</SelectItem>
                    <SelectItem value="other">📋 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ward/District */}
              <div className="space-y-2">
                <Label htmlFor="ward">Ward/District (Optional)</Label>
                <Select
                  value={formData.ward}
                  onValueChange={(value) =>
                    setFormData({ ...formData, ward: value })
                  }
                >
                  <SelectTrigger className="bg-white dark:bg-black">
                    <SelectValue placeholder="Select ward/district" />
                  </SelectTrigger>
                  <SelectContent>
                    {WARDS.map((ward) => (
                      <SelectItem key={ward} value={ward}>
                        {ward}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Select your ward/district to help route the issue to the
                  correct authority
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail... Include information like when you first noticed it, how severe it is, and any other relevant details."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="bg-white dark:bg-black resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Minimum 20 characters ({formData.description.length}/20)
                </p>
              </div>

              {/* Multi-Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos (Optional)</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Upload up to 5 photos. Each file must be under 5MB.
                </p>

                {/* File previews */}
                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {selectedFiles.map((filePreview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={filePreview.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-800"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload button */}
                {selectedFiles.length < 5 && (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="photos"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG or JPEG ({selectedFiles.length}/5 uploaded)
                        </p>
                      </div>
                      <input
                        id="photos"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}

                {selectedFiles.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    {selectedFiles.length} photo(s) ready to upload
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Live Location *</Label>
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant={location ? "secondary" : "outline"}
                    className="w-full h-12"
                    onClick={getLocation}
                  >
                    <MapPin className="mr-2 size-5" />
                    {location
                      ? `Location Captured: ${location.lat.toFixed(
                          5,
                        )}°, ${location.lng.toFixed(5)}°`
                      : "Capture Current Location"}
                  </Button>
                  {location && (
                    <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        Location captured successfully! Your GPS coordinates
                        will be attached to the report for precise tracking.
                      </AlertDescription>
                    </Alert>
                  )}
                  {!location && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      We need your location to help authorities identify and
                      resolve the issue quickly.
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.back()}
                  disabled={isSubmitting || isUploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  disabled={isSubmitting || isUploading || !location}
                >
                  {isSubmitting || isUploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-pulse" />
                      {isUploading ? "Uploading..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
                By submitting this report, you agree to our terms of service and
                privacy policy. Your report will be reviewed by municipal
                authorities.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your report will be reviewed by authorities within 24-48 hours.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Monitor your issue status in real-time on the map and dashboard.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Help improve your neighborhood and make a difference together.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

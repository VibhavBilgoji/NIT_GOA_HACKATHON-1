"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Save,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("/avatars/admin.jpg");
  const [formData, setFormData] = useState({
    fullName: "Municipal Admin",
    email: "admin@citypulse.gov",
    phone: "+91 9876543210",
    address: "Municipal Corporation Office, Panjim, Goa",
    city: "Panjim",
    state: "Goa",
    pincode: "403001",
    role: "Municipal Officer",
    department: "Public Works Department",
    bio: "Dedicated to improving civic infrastructure and citizen satisfaction through transparent issue management.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    criticalAlerts: true,
    weeklyReports: true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!", {
      description: "Your personal details have been saved.",
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated!", {
      description: "Your alert settings have been saved.",
    });
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Settings Header */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-2 mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your profile, preferences, and OurStreet account
                    settings
                  </p>
                </div>
              </div>

              {/* Profile Section */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and profile picture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback>MA</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="profile-picture" className="text-base">
                          Profile Picture
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Upload a professional photo for your OurStreet profile
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById("profile-upload")?.click()
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                          </Button>
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Personal Details Form */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-9"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-9"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-9"
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, role: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Municipal Officer">
                              Municipal Officer
                            </SelectItem>
                            <SelectItem value="Citizen">Citizen</SelectItem>
                            <SelectItem value="Field Engineer">
                              Field Engineer
                            </SelectItem>
                            <SelectItem value="Department Head">
                              Department Head
                            </SelectItem>
                            <SelectItem value="Administrator">
                              Administrator
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              department: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Public Works Department">
                              Public Works Department
                            </SelectItem>
                            <SelectItem value="Water Supply">
                              Water Supply
                            </SelectItem>
                            <SelectItem value="Sanitation">
                              Sanitation
                            </SelectItem>
                            <SelectItem value="Electrical">
                              Electrical
                            </SelectItem>
                            <SelectItem value="Road Maintenance">
                              Road Maintenance
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="pl-9"
                            placeholder="Panjim"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Goa"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="403001"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your full address"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself and your role in OurStreet"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notification Settings */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Manage how you receive alerts about civic issues and
                      updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label
                            htmlFor="email-notifications"
                            className="text-base"
                          >
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email updates for new issues and resolutions
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.emailNotifications
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              emailNotifications: !prev.emailNotifications,
                            }))
                          }
                        >
                          {notificationSettings.emailNotifications
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label
                            htmlFor="sms-notifications"
                            className="text-base"
                          >
                            SMS Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get SMS alerts for critical civic issues
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.smsNotifications
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              smsNotifications: !prev.smsNotifications,
                            }))
                          }
                        >
                          {notificationSettings.smsNotifications
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label
                            htmlFor="push-notifications"
                            className="text-base"
                          >
                            Push Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive browser push notifications
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.pushNotifications
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              pushNotifications: !prev.pushNotifications,
                            }))
                          }
                        >
                          {notificationSettings.pushNotifications
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label
                            htmlFor="critical-alerts"
                            className="text-base"
                          >
                            <Badge variant="destructive" className="mr-2">
                              Critical
                            </Badge>
                            Critical Issue Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Immediate alerts for high-priority civic emergencies
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.criticalAlerts
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              criticalAlerts: !prev.criticalAlerts,
                            }))
                          }
                        >
                          {notificationSettings.criticalAlerts
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="weekly-reports" className="text-base">
                            Weekly Reports
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly summary of civic issues in your area
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.weeklyReports
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              weeklyReports: !prev.weeklyReports,
                            }))
                          }
                        >
                          {notificationSettings.weeklyReports
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotifications}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CityPulse Account Settings */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      OurStreet Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your civic engagement preferences and data privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-medium">Account Status</h4>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700"
                        >
                          Active
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Your account is verified and active
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-medium">Civic Contributions</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">47</span>
                          <span className="text-sm text-muted-foreground">
                            issues reported
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Thank you for your civic participation!
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-medium">Data Privacy</h4>
                        <Button variant="outline" size="sm" className="w-full">
                          Download My Data
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Export all your OurStreet data
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-medium">Account Security</h4>
                        <Button variant="outline" size="sm" className="w-full">
                          Change Password
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Update your login credentials
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

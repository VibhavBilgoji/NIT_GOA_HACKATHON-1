"use client";

import * as React from "react";
import {
  IconAlertTriangle,
  IconBell,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconMap,
  IconMapPin,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUsers,
  IconHistory,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Municipal Admin",
    email: "admin@ourstreet.gov",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Report Issue",
      url: "#",
      icon: IconPlus,
    },
    {
      title: "Map View",
      url: "/map",
      icon: IconMap,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "My Reports",
      url: "#",
      icon: IconHistory,
    },
  ],
  navClouds: [
    {
      title: "Issue Categories",
      icon: IconAlertTriangle,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Potholes",
          url: "#",
        },
        {
          title: "Street Lights",
          url: "#",
        },
        {
          title: "Water Supply",
          url: "#",
        },
        {
          title: "Sanitation",
          url: "#",
        },
      ],
    },
    {
      title: "Hotspots",
      icon: IconMapPin,
      url: "#",
      items: [
        {
          title: "Panjim City Center",
          url: "#",
        },
        {
          title: "Margao Station",
          url: "#",
        },
        {
          title: "Mapusa Market",
          url: "#",
        },
      ],
    },
    {
      title: "Alerts & Notifications",
      icon: IconBell,
      url: "#",
      items: [
        {
          title: "Critical Issues",
          url: "#",
        },
        {
          title: "SLA Warnings",
          url: "#",
        },
        {
          title: "Resolved",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Community",
      url: "#",
      icon: IconUsers,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconChartBar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconMapPin className="!size-5 text-blue-600" />
                <span className="text-base font-semibold">OurStreet</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

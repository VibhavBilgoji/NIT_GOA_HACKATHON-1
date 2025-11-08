"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Map,
  Users,
  LayoutDashboard,
  LogOut,
  User,
  PlusCircle,
  Home,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function Navigation() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const centerNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/map", label: "Map", icon: Map },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/team", label: "Team", icon: Users },
  ];

  const authItems = [
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/20 dark:border-gray-800/20 bg-white/10 dark:bg-black/10 backdrop-blur-sm supports-backdrop-filter:bg-white/10 supports-backdrop-filter:dark:bg-black/10">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-black dark:bg-white text-white dark:text-black flex size-6 items-center justify-center rounded-md transition-transform group-hover:scale-105">
            <MapPin className="size-4" />
          </div>
          <span className="text-lg font-semibold text-black dark:text-white">
            OurStreet
          </span>
        </Link>

        {/* Center Navigation - Map, Dashboard, Team */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavigationMenu>
            <NavigationMenuList>
              {centerNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "font-medium",
                        isActive &&
                          "bg-gray-100 dark:bg-gray-900 text-black dark:text-white",
                      )}
                    >
                      {Icon && <Icon className="mr-1.5 size-4" />}
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side - Report Issue, Auth & Theme Toggle */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Link href="/report">
              <Button
                size="sm"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-medium"
              >
                <PlusCircle className="mr-1.5 size-4" />
                Report Issue
              </Button>
            </Link>
          )}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="font-medium"
              >
                <LogOut className="mr-1.5 size-4" />
                Logout
              </Button>
            </div>
          ) : (
            <NavigationMenu>
              <NavigationMenuList>
                {authItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <NavigationMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "font-medium",
                          isActive &&
                            "bg-gray-100 dark:bg-gray-900 text-black dark:text-white",
                          item.label === "Sign Up" &&
                            "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200",
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

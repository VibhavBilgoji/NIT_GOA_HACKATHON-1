"use client";

import Link from "next/link";
import {
  MapPin,
  AlertCircle,
  TrendingUp,
  Shield,
  Map,
  Users,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      {/* Navigation Menu */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-black/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-black dark:bg-white text-white dark:text-black flex size-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
              <MapPin className="size-5" />
            </div>
            <span className="text-xl font-bold text-black dark:text-white">
              CityPulse
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/map">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <Map className="mr-2 size-4" />
                      Map
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/dashboard">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/team">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <Users className="mr-2 size-4" />
                      Team
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/login">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/signup">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Sign Up
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm">
              <AlertCircle className="size-4" />
              <span className="text-gray-700 dark:text-gray-300">
                Local Issue Reporting & Impact Tracker
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Empower Your Community with{" "}
              <span className="underline decoration-gray-300 dark:decoration-gray-700 underline-offset-8">
                CityPulse
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl">
              Report civic issues with description, photo, and live location.
              View them on an interactive city map and track their resolution
              progress in real-time. Bridge the gap between citizens and
              municipal authorities.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-700 px-8"
              >
                <Link href="/map">View Map</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Why CityPulse?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Bridging the gap between citizens and municipal authorities
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 text-center transition-shadow hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <AlertCircle className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Easy Reporting
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Report civic issues with description, photo, and live GPS
                  location in seconds
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 text-center transition-shadow hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <MapPin className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Interactive Map
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View all reported issues on an interactive city map with
                  color-coded status markers
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 text-center transition-shadow hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <TrendingUp className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Real-Time Tracking
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track issue progress from Open to In Progress to Resolved with
                  automated updates
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 text-center transition-shadow hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <Shield className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Transparency
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access impact reports and analytics for complete
                  accountability and transparency
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                The Problem We Solve
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p className="text-lg leading-relaxed">
                  Urban citizens often face everyday civic issues such as
                  potholes, broken streetlights, overflowing garbage, and water
                  leaks. However, the absence of accessible and transparent
                  reporting systems prevents these problems from being
                  efficiently addressed.
                </p>
                <p className="text-lg leading-relaxed">
                  Even when complaints are registered, citizens rarely receive
                  updates on their resolution, leading to low engagement,
                  duplicate reports, and a lack of accountability.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong className="text-black dark:text-white">
                    CityPulse
                  </strong>{" "}
                  provides a smart, transparent, and community-driven platform
                  that enables effortless issue reporting, real-time tracking,
                  and improved collaboration between citizens and local
                  authorities — fostering a culture of civic participation and
                  data-driven governance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 bg-black dark:bg-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white dark:text-black sm:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="mb-8 text-lg text-gray-300 dark:text-gray-700">
              Join CityPulse today and help build a better community
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white dark:border-black bg-transparent text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-8"
            >
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-black dark:text-white" />
              <span className="font-semibold text-black dark:text-white">
                CityPulse
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 CityPulse. Empowering communities through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

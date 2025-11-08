"use client";

import Link from "next/link";
import Image from "next/image";
import { AlertCircle, TrendingUp, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShuffleText } from "@/components/shuffle-text";
import "@/components/shuffle-text/shuffle.css";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1 text-xs">
              <AlertCircle className="size-3" />
              <span className="text-gray-700 dark:text-gray-300">
                Local Issue Reporting & Impact Tracker
              </span>
            </div>

            <ShuffleText
              text="Empower Your Community with CityPulse"
              tag="h1"
              className="max-w-4xl text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
              shuffleDirection="right"
              duration={1.5}
              shuffleTimes={3}
              animationMode="evenodd"
              ease="power3.out"
              stagger={0.08}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />

            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl">
              Report civic issues with description, photo, and live location.
              View them on an interactive city map and track their resolution
              progress in real-time. Bridge the gap between citizens and
              municipal authorities.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-10 px-8"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-700 h-10 px-8"
              >
                <Link href="/map">View Map</Link>
              </Button>
            </div>

            {/* App Screen Showcase */}
            <div className="relative mt-16 overflow-hidden px-2 sm:mt-20 md:mt-24">
              <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 p-4 shadow-2xl shadow-gray-900/20 dark:shadow-gray-950/40 ring-1 ring-gray-200/50 dark:ring-gray-800/50">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  {/* Dashboard Preview Mockup */}
                  <div className="absolute inset-0 p-6 space-y-4">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                          <MapPin className="size-4 text-white dark:text-black" />
                        </div>
                        <div className="space-y-1">
                          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                          <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-20 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                        <div className="h-8 w-20 bg-black dark:bg-white rounded-lg" />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="h-2 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-500 rounded" />
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="h-2 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-500 rounded" />
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="h-2 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-500 rounded" />
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="h-2 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-500 rounded" />
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      {/* Map Preview */}
                      <div className="col-span-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="size-12 text-gray-300 dark:text-gray-600" />
                        </div>
                        {/* Map markers simulation */}
                        <div className="absolute top-1/4 left-1/4 size-3 bg-red-500 rounded-full animate-pulse" />
                        <div className="absolute top-1/2 right-1/3 size-3 bg-yellow-500 rounded-full" />
                        <div className="absolute bottom-1/3 left-1/2 size-3 bg-green-500 rounded-full" />
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-700 rounded" />
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-700 rounded" />
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-700 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Gradient fade effect */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
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
        <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Join CityPulse today and help build a better community
            </p>
            <Button
              asChild
              size="lg"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-10 px-8"
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

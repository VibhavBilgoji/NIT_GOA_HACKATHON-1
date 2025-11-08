import Link from "next/link";
import { MapPin, AlertCircle, TrendingUp, Users } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Navigation Menu */}
      <header className="w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white flex size-8 items-center justify-center rounded-md">
              <MapPin className="size-5" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CityPulse
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/signup" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sign Up
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <AlertCircle className="size-4" />
              Local Issue Reporting & Impact Tracker
            </div>

            <h1 className="max-w-4xl text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Empowering Citizens to Build Better Communities
            </h1>

            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              CityPulse is a smart, transparent, and community-driven platform
              that enables effortless civic issue reporting, real-time tracking,
              and improved collaboration between citizens and municipal
              authorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/signup"
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 text-white font-medium transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="flex h-12 items-center justify-center rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 font-medium transition-all hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="bg-white dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                The Problem We&apos;re Solving
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Urban citizens often face everyday civic issues such as
                  potholes, broken streetlights, overflowing garbage, and water
                  leaks. However, the absence of accessible and transparent
                  reporting systems prevents these problems from being
                  efficiently addressed.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <h3 className="text-xl font-semibold mb-3 text-red-900 dark:text-red-200">
                      Key Challenges
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>
                        • Inaccessible and non-transparent reporting systems
                      </li>
                      <li>• Lack of resolution updates for citizens</li>
                      <li>• Low engagement and duplicate reports</li>
                      <li>• Poor accountability from authorities</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <h3 className="text-xl font-semibold mb-3 text-green-900 dark:text-green-200">
                      Our Solution
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Real-time issue reporting with GPS location</li>
                      <li>• Interactive city map with status tracking</li>
                      <li>• Transparent progress updates</li>
                      <li>• Data-driven governance and accountability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Core Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <MapPin className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Interactive Mapping
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                View all reported issues on an interactive city map with
                color-coded markers showing status: Unresolved, In Progress, or
                Resolved.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <TrendingUp className="size-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Real-Time Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your reported issues in real-time with automated updates
                and notifications as they progress through resolution stages.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Users className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Community Engagement
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Vote, comment, and support existing issues to highlight their
                importance and foster civic participation in your community.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join CityPulse today and help build a transparent, accountable,
              and participatory civic ecosystem through technology and
              collaboration.
            </p>
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-8 text-blue-600 font-medium transition-all hover:bg-blue-50 hover:shadow-lg"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              CityPulse
            </span>{" "}
            - Fostering a culture of civic participation and data-driven
            governance
          </p>
          <p className="text-sm">
            Theme: CivicTech | Social Good | Full Stack Web Development
          </p>
        </div>
      </footer>
    </div>
  );
}

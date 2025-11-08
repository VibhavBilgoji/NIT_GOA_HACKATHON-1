"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

const teamMembers = [
  {
    name: "Noah Menezes",
    role: "Full Stack Developer",
    bio: "Passionate about building civic tech solutions",
    initials: "NM",
    github: "https://github.com/NoahMenezes",
    linkedin: "#",
    email: "noah@citypulse.com",
  },
  {
    name: "Team Member 2",
    role: "Frontend Developer",
    bio: "Expert in React and modern web technologies",
    initials: "TM",
    github: "#",
    linkedin: "#",
    email: "member2@citypulse.com",
  },
  {
    name: "Team Member 3",
    role: "Backend Developer",
    bio: "Specializing in scalable backend systems",
    initials: "TM",
    github: "#",
    linkedin: "#",
    email: "member3@citypulse.com",
  },
  {
    name: "Team Member 4",
    role: "UI/UX Designer",
    bio: "Creating intuitive user experiences",
    initials: "TM",
    github: "#",
    linkedin: "#",
    email: "member4@citypulse.com",
  },
];

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Page Header */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm">
              <Users className="size-4" />
              <span className="text-gray-700 dark:text-gray-300">
                NIT Goa Hackathon Team
              </span>
            </div>
            <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
              Meet Our Team
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We&apos;re a passionate team of developers and designers working
              to bridge the gap between citizens and municipal authorities
              through technology.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {teamMembers.map((member, index) => (
              <NeonGradientCard
                key={index}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="size-24 mb-4 border-2 border-gray-200 dark:border-gray-800">
                    <AvatarFallback className="bg-white dark:bg-white text-black dark:text-black text-2xl font-bold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.bio}</p>
                  <div className="flex gap-2">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors"
                    >
                      <Github className="size-4 text-white" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors"
                    >
                      <Linkedin className="size-4 text-white" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors"
                    >
                      <Mail className="size-4 text-white" />
                    </a>
                  </div>
                </div>
              </NeonGradientCard>
            ))}
          </div>

          {/* Project Info */}
          <NeonGradientCard className="overflow-hidden">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                About CityPulse
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                CityPulse is our submission for the NIT Goa Hackathon, focusing
                on CivicTech and Social Good. Our mission is to create a
                transparent, accountable, and participatory civic ecosystem
                through technology and collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Link href="/map">View Map</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-800 text-white hover:bg-gray-900"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </div>
          </NeonGradientCard>

          {/* Tech Stack */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
              Built With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Next.js 14",
                "TypeScript",
                "Tailwind CSS",
                "shadcn/ui",
                "React",
                "Node.js",
                "Recharts",
                "Lucide Icons",
              ].map((tech) => (
                <div
                  key={tech}
                  className="p-4 text-center border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <span className="text-sm font-medium text-black dark:text-white">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Want to Contribute?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                CityPulse is an open-source project. We welcome contributions
                from the community!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <a
                  href="https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 size-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
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

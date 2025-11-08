import { MapPin } from "lucide-react";

import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col gap-4 p-6 md:p-10 w-full max-w-md">
        <div className="flex justify-center gap-2">
          <a href="/" className="flex items-center gap-2 font-medium text-lg">
            <div className="bg-blue-600 text-white flex size-8 items-center justify-center rounded-md">
              <MapPin className="size-5" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CityPulse
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-md px-6">
        <div className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-8 shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

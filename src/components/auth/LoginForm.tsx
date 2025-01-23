"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "../auth-card";
import InputWithIcon from "../input-with-icon";
import { Loader2, Mail, Lock } from "lucide-react";
export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.error) {
      setError("Invalid credentials");
      setIsLoading(false);
      return;
    }

    router.push("/events");
  }

  return (
    <AuthCard title="Welcome Back">
      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <InputWithIcon
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email address"
            required
          />
          <InputWithIcon
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : null}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
          >
            Don&#39;t have an account? Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

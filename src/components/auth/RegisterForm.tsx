"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthCard from "../auth-card";
import InputWithIcon from "../input-with-icon";
import { Loader2, Mail, Lock, User } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Registration failed");
      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    router.push("/dashboard");
  }

  return (
    <AuthCard title="Create Your Account">
      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <InputWithIcon
            icon={User}
            type="text"
            name="name"
            placeholder="Full Name"
            required
          />
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
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default RegisterForm;

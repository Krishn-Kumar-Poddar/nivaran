"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage("Login system will be connected to Supabase next.");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 text-gray-900">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-[350px]">

          {/* Login Card */}
          <div className="border border-gray-300 bg-white px-10 py-10">

            {/* Logo */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                Nivaran
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Problems deserve solutions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-[3px] border border-gray-300 bg-[#fafafa] px-3 text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-[3px] border border-gray-300 bg-[#fafafa] px-3 pr-16 text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
                />

                {password && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Log in
              </button>

              {message && (
                <p className="pt-2 text-center text-xs text-red-500">
                  {message}
                </p>
              )}
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" />

              <span className="text-xs font-semibold text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span className="text-base font-bold">G</span>
              Continue with Google
            </button>

            {/* Forgot */}
            <div className="mt-5 text-center">
              <button
                type="button"
                className="text-xs text-blue-900 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Signup Card */}
          <div className="mt-3 border border-gray-300 bg-white py-5 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            © 2026 Nivaran
          </p>
        </div>
      </div>
    </main>
  );
}
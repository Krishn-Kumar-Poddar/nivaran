"use client";

import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Signup system will be connected to Supabase next.");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 text-gray-900">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-[350px]">

          {/* Signup Card */}
          <div className="border border-gray-300 bg-white px-10 py-8">

            {/* Logo */}
            <div className="mb-6 text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                Nivaran
              </h1>

              <p className="mx-auto mt-3 max-w-[240px] text-sm leading-5 text-gray-500">
                Join Nivaran and help turn real-world problems into solutions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Name */}
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-[3px] border border-gray-300 bg-[#fafafa] px-3 text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-[3px] border border-gray-300 bg-[#fafafa] px-3 text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
              />

              {/* Password */}
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
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>

              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 w-full rounded-[3px] border border-gray-300 bg-[#fafafa] px-3 text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
              />

              {/* Terms */}
              <div className="flex items-start gap-2 py-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-4 text-gray-500"
                >
                  I agree to Nivaran's terms and privacy policy.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign up
              </button>

              {message && (
                <p className="pt-2 text-center text-xs text-red-500">
                  {message}
                </p>
              )}
            </form>

            {/* Info */}
            <p className="mt-5 text-center text-xs leading-4 text-gray-400">
              By signing up, you can discover challenges,
              collaborate with others and submit solutions.
            </p>
          </div>

          {/* Login Card */}
          <div className="mt-3 border border-gray-300 bg-white py-5 text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Log in
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
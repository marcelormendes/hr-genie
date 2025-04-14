"use client"

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Define error messages
const errorMessages: { [key: string]: string } = {
  missing_fields: "Please enter both email and password.",
  invalid_credentials: "Invalid email or password.",
  login_failed: "Login failed. Please try again.",
  google_oauth_error: "Google login failed. Please try again.",
  google_auth_failed: "Authentication with Google failed. Please try again.",
  missing_parameters: "Missing required parameters.",
  invalid_state: "Invalid state parameter. Please try again.",
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleGoogleSignIn = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"
    window.location.href = `${backendUrl}/api/v1/auth/google`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Login failed" }))
        throw new Error(errorData.message || "Login failed")
      }

      // Handle successful login
      router.push("/dashboard")
    } catch (error) {
      // Show error message
      setLoginError(
        error instanceof Error
          ? error.message
          : "Invalid email or password"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-card dark:bg-[#121212] border border-transparent dark:border-[#333] rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground dark:text-white">
          Login to Your Account
        </h1>

        {error && (
          <div
            className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <p>
              {errorMessages[error] || "An error occurred. Please try again."}
            </p>
          </div>
        )}

        {/* Google Sign-In Button */}
        <div className="mb-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 bg-transparent dark:bg-transparent py-2 px-4 border border-[#333] dark:border-[#333] rounded-md shadow-sm text-sm font-medium text-foreground dark:text-white hover:bg-muted dark:hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring dark:focus:ring-offset-background"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"></path>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border dark:border-[#333]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card dark:bg-[#121212] text-muted-foreground dark:text-gray-400">
              Or sign in with email
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border dark:border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-[#00d4ff]/50 dark:focus:border-[#00d4ff] bg-background dark:bg-[#181818] text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border dark:border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-[#00d4ff]/50 dark:focus:border-[#00d4ff] bg-background dark:bg-[#181818] text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-gray-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-[#00d4ff] border-border dark:border-[#333] rounded focus:ring-[#00d4ff] bg-background dark:bg-[#181818]"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-muted-foreground dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#00d4ff] hover:text-[#00d4ff]/90"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00d4ff] dark:focus:ring-offset-background"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          {loginError && (
            <div
              className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <p>{loginError}</p>
            </div>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground dark:text-gray-400">
          Don't have an account?
          <Link
            href="/register"
            className="font-medium text-[#00d4ff] hover:text-[#00d4ff]/90 ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

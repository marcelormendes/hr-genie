"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface User {
  name?: string
  email: string
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Navigation items
  const navItems = [
    {
      id: "oauth",
      label: "OAuth Integrations",
      href: "/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: "slackbot",
      label: "Slack Bot",
      href: "/dashboard/slackbot",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      id: "logs",
      label: "Logs",
      href: "/dashboard/logs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call
        // For now, we'll simulate it with mock data
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockUser = {
          name: "John Doe",
          email: "john.doe@example.com"
        }
        
        setUser(mockUser)
      } catch (error) {
        console.error("Error fetching user profile:", error)
        router.push("/login?error=unauthorized")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  const handleLogout = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"
      const logoutResponse = await fetch(`${backendUrl}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      })

      if (logoutResponse.ok) {
        router.push("/")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Get user initial for avatar
  const getUserInitial = () => {
    if (!user) return "U"
    if (user.name) return user.name.charAt(0).toUpperCase()
    if (user.email) return user.email.charAt(0).toUpperCase()
    return "U"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="ml-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-20">
            <div className="flex items-center space-x-3 mb-6 p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="h-10 w-10 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold">
                <span>{getUserInitial()}</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate text-gray-900 dark:text-gray-100">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = 
                  (item.href === "/dashboard" && pathname === "/dashboard") || 
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

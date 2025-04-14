"use client"

import { useState, useEffect } from 'react'

interface OAuthConnection {
  id: string
  name: string
  description: string
  isConnected: boolean
  connectUrl: string
  icon: React.ReactNode
  expiresAt?: string
  teamId?: string
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connections, setConnections] = useState<OAuthConnection[]>([])

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  useEffect(() => {
    const fetchOAuthConnections = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real app, this would be an API call
        // For now, we'll simulate it with mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockConnections: OAuthConnection[] = [
          {
            id: "google_drive",
            name: "Google Drive",
            description: "Connect to Google Drive to access and process resumes stored in your Drive. This allows HR Genie to fetch resume files directly from your Google Drive folders.",
            isConnected: false,
            connectUrl: "/api/oauth/google-drive/connect",
            icon: (
              <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.858 4.88c-.63-.8-1.127-1.28-1.127-1.28l.337 2.08H9.929c2.29 0 4.286 1.28 5.413 3.28l-2.313 4c-.679-1.76-2.536-3.04-4.592-3.04H5.146l-.288-5.04z" fill="#4285F4" />
                <path d="M15.342 8.88l-5.413 9.36h5.729c2.29 0 4.286-1.28 5.413-3.28l2.313-4-2.313-4c-1.127-2-3.123-3.28-5.413-3.28h-5.729l5.413 5.2z" fill="#34A853" />
                <path d="M4.069 5.68l-.337-2.08S5.45 4.48 6.079 5.28l5.413 9.36-5.413 9.36c-.63.8-2.337 2.64-2.337 2.64l.337-2.08.288-5.04 2.001-3.28-2.001-3.28-.288-5.04v-2.24z" fill="#FBBC05" />
                <path d="M9.929 22.4h5.729l-5.413-9.36-5.413-9.36H4.069s1.707 1.84 2.337 2.64l5.413 9.36-5.413 9.36c-.63.8-2.337 2.64-2.337 2.64h.763l5.097-5.28z" fill="#EA4335" />
              </svg>
            ),
          },
          {
            id: "wellfound",
            name: "Wellfound",
            description: "Connect to Wellfound to access job listings and candidate information. This allows HR Genie to fetch job details and candidate profiles from Wellfound.",
            isConnected: false,
            connectUrl: "/api/oauth/wellfound/connect",
            icon: (
              <svg className="h-8 w-8 text-gray-800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M9.25 14.25L12 11.5l2.75 2.75.75-.75-3.5-3.5-3.5 3.5z" />
              </svg>
            ),
          },
          {
            id: "slack",
            name: "Slack",
            description: "Connect to Slack to receive notifications and interact with HR Genie via Slack. This allows you to control the HR Genie bot and receive updates directly in your Slack workspace.",
            isConnected: true,
            connectUrl: "/api/oauth/slack/connect",
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            teamId: "T12345678",
            icon: (
              <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.687 8.834a2.528 2.528 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V2.522A2.527 2.527 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zM15.166 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zM15.166 17.687a2.527 2.527 0 0 1-2.521-2.521 2.526 2.526 0 0 1 2.521-2.521h6.313A2.527 2.527 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z" />
              </svg>
            ),
          },
        ]

        setConnections(mockConnections)
      } catch (error) {
        console.error("Error fetching OAuth connections:", error)
        setError("Failed to load OAuth integrations. Please reload the page or contact support.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOAuthConnections()
  }, [])

  const handleConnect = (connection: OAuthConnection) => {
    // In a real app, this would redirect to the OAuth flow
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"
    window.location.href = `${backendUrl}${connection.connectUrl}`
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading OAuth integrations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 underline"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">OAuth Integrations</h1>

      <p className="text-gray-600 mb-8">
        Connect HR Genie to your services to unlock full functionality. These
        connections allow HR Genie to access your data and provide seamless
        integration between different platforms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {connection.icon}
                <h3 className="text-lg font-medium ml-3">{connection.name}</h3>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${connection.isConnected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {connection.isConnected ? "Connected" : "Not connected"}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {connection.description}
            </p>
            
            {connection.isConnected && (connection.expiresAt || connection.teamId) && (
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs mb-4 overflow-hidden">
                <p className="font-medium mb-1">Token Details:</p>
                {connection.expiresAt && (
                  <p className="truncate">Expires: {formatDate(connection.expiresAt)}</p>
                )}
                {connection.teamId && (
                  <p className="truncate">Team ID: {connection.teamId}</p>
                )}
              </div>
            )}
            
            <button
              onClick={() => handleConnect(connection)}
              className={`w-full text-center py-2 px-4 rounded-md ${
                connection.isConnected 
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                  : "bg-indigo-600 text-white"
              }`}
            >
              {connection.isConnected ? "Reconnect" : `Connect to ${connection.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
          Why Connect Your Services?
        </h3>
        <p className="text-indigo-700 dark:text-indigo-400 text-sm">
          Connecting your services allows HR Genie to automate resume processing,
          job matching, and communications. Your data remains secure and private,
          and you can disconnect at any time.
        </p>
      </div>
    </>
  )
}

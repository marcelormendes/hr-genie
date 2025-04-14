"use client"

import { useState, useEffect } from 'react'

interface LogEntry {
  id: string
  timestamp: string
  action: string
  status: 'success' | 'error' | 'warning' | 'info'
  details: string
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching logs
    const fetchLogs = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate it with mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockLogs: LogEntry[] = [
          {
            id: '1',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            action: 'User login',
            status: 'success',
            details: 'User logged in successfully',
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            action: 'Google Drive connection',
            status: 'error',
            details: 'Failed to connect to Google Drive: Invalid credentials',
          },
          {
            id: '3',
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            action: 'Resume fetch',
            status: 'success',
            details: 'Successfully fetched 5 resumes from Google Drive',
          },
          {
            id: '4',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            action: 'Slack message',
            status: 'info',
            details: 'Sent notification to Slack channel #hiring',
          },
          {
            id: '5',
            timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            action: 'Wellfound API',
            status: 'warning',
            details: 'Wellfound API rate limit reached, retrying in 5 minutes',
          },
        ]

        setLogs(mockLogs)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching logs:', error)
        setIsLoading(false)
      }
    }

    fetchLogs()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getStatusBadgeClass = (status: LogEntry['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading logs...</p>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        View a history of actions and events in your HR Genie account.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Action
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(log.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {log.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Configure your HR Genie settings and preferences.
      </p>
      
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Notification Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure how and when you receive notifications.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Coming soon...
          </p>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg font-medium mb-2">API Keys</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage your API keys for integrating with other services.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Coming soon...
          </p>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Appearance</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Customize the appearance of your HR Genie dashboard.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Coming soon...
          </p>
        </div>
      </div>
    </>
  )
}

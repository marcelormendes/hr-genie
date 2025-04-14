export default function SlackbotPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Slack Bot</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Configure and manage your HR Genie Slack bot integration.
      </p>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-500">
              You need to connect your Slack workspace before configuring the bot. Go to the <a href="/dashboard" className="font-medium underline">OAuth Integrations</a> page to connect Slack.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Bot Commands</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure the commands your Slack bot responds to.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <code className="text-sm">
              <div className="mb-2"><span className="text-pink-600 dark:text-pink-400">/hrgenie</span> <span className="text-gray-500">help</span> - Show available commands</div>
              <div className="mb-2"><span className="text-pink-600 dark:text-pink-400">/hrgenie</span> <span className="text-gray-500">fetch-resume [candidate email]</span> - Fetch a candidate's resume</div>
              <div className="mb-2"><span className="text-pink-600 dark:text-pink-400">/hrgenie</span> <span className="text-gray-500">match-job [job id]</span> - Match candidates to a job</div>
              <div><span className="text-pink-600 dark:text-pink-400">/hrgenie</span> <span className="text-gray-500">status</span> - Check HR Genie connection status</div>
            </code>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Notification Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure when and where the bot sends notifications.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="notify-new-candidate"
                name="notify-new-candidate"
                type="checkbox"
                disabled
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="notify-new-candidate" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">
                Notify when new candidates apply
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="notify-resume-match"
                name="notify-resume-match"
                type="checkbox"
                disabled
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="notify-resume-match" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">
                Notify when a resume matches a job posting
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="notify-interview"
                name="notify-interview"
                type="checkbox"
                disabled
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="notify-interview" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">
                Notify when interviews are scheduled
              </label>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Connect your Slack workspace to enable these settings.
          </p>
        </div>
      </div>
    </>
  )
}

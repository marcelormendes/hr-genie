import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Welcome to HR Genie</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Connect your services to power your HR automation
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/login" 
            className="block w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md text-center hover:bg-indigo-700"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="block w-full bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium py-2 px-4 rounded-md text-center border border-indigo-600 dark:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = createServerSupabaseClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to SAGE
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your AI-powered Human Design companion
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chat Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                💬 AI Chat
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Start a conversation with your AI guide
              </p>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Start Chat
              </button>
            </div>

            {/* Chart Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                📊 Your Chart
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View and explore your Human Design chart
              </p>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                View Chart
              </button>
            </div>

            {/* Settings Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                ⚙️ Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Customize your SAGE experience
              </p>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Manage Settings
              </button>
            </div>

            {/* Recent Activity Card */}
            <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                📈 Recent Activity
              </h2>
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Your SAGE journey begins here!</p>
                <p className="text-sm mt-2">Complete your onboarding to start receiving personalized insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
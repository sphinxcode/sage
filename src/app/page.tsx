import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              SAGE
            </h1>
            <p className="text-2xl text-indigo-600 dark:text-indigo-400 font-medium">
              AI-Powered Human Design Companion
            </p>
          </div>
          
          {/* Value Proposition */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              5x Superior to Any Human Design App
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience unlimited AI interactions, real-time chart analysis, and professional-grade features 
              with automated daily guidance through advanced n8n workflows.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                🔄 Advanced Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time transit notifications and personalized daily guidance through n8n workflows
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                💬 Unlimited AI Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No question limits - engage in unlimited conversations with full chart context
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                📊 Professional Features
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete 50+ data points, composite charts, return charts, and professional dashboard
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/auth/signup">
                Start Your Journey
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Trusted by Human Design enthusiasts and professionals worldwide
            </p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <span>✓ Secure & Private</span>
              <span>✓ Real-time Updates</span>
              <span>✓ Professional Grade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

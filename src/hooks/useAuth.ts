import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { type User, type Provider } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle successful signin - redirect to dashboard
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('Redirecting to dashboard for user:', session.user.email)
          // Use router.replace instead of push to prevent back button issues
          router.replace('/dashboard')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signInWithOAuth = async (provider: Provider, nextUrl?: string) => {
    try {
      const callbackUrl = `${window.location.origin}/auth/callback`
      const redirectTo = nextUrl ? `${callbackUrl}?next=${encodeURIComponent(nextUrl)}` : callbackUrl
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      })

      if (error) {
        // Enhanced error handling for OAuth
        let message = error.message
        if (error.message.includes('OAuth')) {
          message = `Unable to connect to ${provider}. Please try again or use email/password.`
        } else if (error.message.includes('network')) {
          message = 'Network error. Please check your connection and try again.'
        }
        return { data, error: { ...error, message } }
      }

      return { data, error }
    } catch (err) {
      return { 
        data: null, 
        error: { 
          message: `Failed to connect with ${provider}. Please try again.`,
          status: 500 
        } 
      }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
  }
}
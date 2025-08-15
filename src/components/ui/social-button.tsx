import React from 'react'
import { Button } from '@/components/ui/button'
import { type Provider } from '@supabase/supabase-js'
import { GoogleIcon, FacebookIcon } from './social-icons'

interface SocialButtonProps {
  provider: Provider
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}

const providerConfig = {
  google: {
    name: 'Google',
    icon: GoogleIcon,
    bgColor: 'bg-white hover:bg-gray-50',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-300',
  },
  facebook: {
    name: 'Facebook',
    icon: FacebookIcon,
    bgColor: 'bg-[#1877F2] hover:bg-[#166FE5]',
    textColor: 'text-white',
    borderColor: 'border-[#1877F2]',
  },
}

export function SocialButton({ provider, onClick, loading = false, disabled = false }: SocialButtonProps) {
  const config = providerConfig[provider as keyof typeof providerConfig]
  
  if (!config) {
    return null
  }

  const Icon = config.icon

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={`w-full ${config.bgColor} ${config.textColor} ${config.borderColor} flex items-center justify-center gap-3`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      <Icon className="w-5 h-5" />
      {loading ? 'Connecting...' : `Continue with ${config.name}`}
    </Button>
  )
}
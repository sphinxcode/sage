import { type Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// User types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
  onboarding_completed: boolean
  subscription_tier: string
}

// Human Design Profile types
export interface HumanDesignProfile {
  id: string
  user_id: string
  name: string
  birthdate: string
  birthtime: string
  location: string
  type: string
  profile: string
  strategy: string
  authority: string
  channels_short: any
  centers: any
  incarnation_cross: string
  definition: string
  signature: string
  not_self_theme: string
  cognition: string
  determination: string
  variables: any
  motivation: string
  transference: string
  perspective: string
  distraction: string
  circuitries: any
  channels_long: any
  gates: any
  // Design planetary positions
  design_sun: string
  design_earth: string
  design_north_node: string
  design_south_node: string
  design_moon: string
  design_mercury: string
  design_venus: string
  design_mars: string
  design_jupiter: string
  design_saturn: string
  design_uranus: string
  design_neptune: string
  design_pluto: string
  // Personality planetary positions
  personality_sun: string
  personality_earth: string
  personality_north_node: string
  personality_south_node: string
  personality_moon: string
  personality_mercury: string
  personality_venus: string
  personality_mars: string
  personality_jupiter: string
  personality_saturn: string
  personality_uranus: string
  personality_neptune: string
  personality_pluto: string
  created_at: string
  updated_at: string
}

// Chat Session types
export interface ChatSession {
  id: string
  user_id: string
  session_name: string
  created_at: string
  updated_at: string
  is_active: boolean
}

// Chat Message types
export interface ChatMessage {
  id: string
  session_id: string
  user_id: string
  content: string
  role: 'user' | 'assistant'
  created_at: string
  metadata: any
}

// User Settings types
export interface UserSettings {
  id: string
  user_id: string
  // Notification Settings
  transit_notifications: boolean
  daily_guidance: boolean
  weekly_strategy: boolean
  email_notifications: boolean
  // AI Configuration
  response_depth: 'beginner' | 'intermediate' | 'advanced'
  focus_areas: string[]
  // Appearance
  theme: 'light' | 'dark' | 'auto'
  language: string
  // Privacy
  data_sharing: boolean
  analytics_tracking: boolean
  created_at: string
  updated_at: string
}

// Webhook Log types
export interface WebhookLog {
  id: string
  user_id: string
  webhook_type: string
  payload: any
  response: any
  status: string
  created_at: string
}
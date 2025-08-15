export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          onboarding_completed: boolean
          subscription_tier: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          subscription_tier?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          subscription_tier?: string
        }
      }
      human_design_profiles: {
        Row: {
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
          channels_short: Json
          centers: Json
          incarnation_cross: string
          definition: string
          signature: string
          not_self_theme: string
          cognition: string
          determination: string
          variables: Json
          motivation: string
          transference: string
          perspective: string
          distraction: string
          circuitries: Json
          channels_long: Json
          gates: Json
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
        Insert: {
          id?: string
          user_id: string
          name: string
          birthdate: string
          birthtime: string
          location: string
          type: string
          profile: string
          strategy: string
          authority: string
          channels_short?: Json
          centers?: Json
          incarnation_cross: string
          definition: string
          signature: string
          not_self_theme: string
          cognition: string
          determination: string
          variables?: Json
          motivation: string
          transference: string
          perspective: string
          distraction: string
          circuitries?: Json
          channels_long?: Json
          gates?: Json
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
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birthdate?: string
          birthtime?: string
          location?: string
          type?: string
          profile?: string
          strategy?: string
          authority?: string
          channels_short?: Json
          centers?: Json
          incarnation_cross?: string
          definition?: string
          signature?: string
          not_self_theme?: string
          cognition?: string
          determination?: string
          variables?: Json
          motivation?: string
          transference?: string
          perspective?: string
          distraction?: string
          circuitries?: Json
          channels_long?: Json
          gates?: Json
          design_sun?: string
          design_earth?: string
          design_north_node?: string
          design_south_node?: string
          design_moon?: string
          design_mercury?: string
          design_venus?: string
          design_mars?: string
          design_jupiter?: string
          design_saturn?: string
          design_uranus?: string
          design_neptune?: string
          design_pluto?: string
          personality_sun?: string
          personality_earth?: string
          personality_north_node?: string
          personality_south_node?: string
          personality_moon?: string
          personality_mercury?: string
          personality_venus?: string
          personality_mars?: string
          personality_jupiter?: string
          personality_saturn?: string
          personality_uranus?: string
          personality_neptune?: string
          personality_pluto?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          session_name: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          session_name: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          session_name?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          user_id: string
          content: string
          role: string
          created_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          content: string
          role: string
          created_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          content?: string
          role?: string
          created_at?: string
          metadata?: Json
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          transit_notifications: boolean
          daily_guidance: boolean
          weekly_strategy: boolean
          email_notifications: boolean
          response_depth: string
          focus_areas: Json
          theme: string
          language: string
          data_sharing: boolean
          analytics_tracking: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          transit_notifications?: boolean
          daily_guidance?: boolean
          weekly_strategy?: boolean
          email_notifications?: boolean
          response_depth?: string
          focus_areas?: Json
          theme?: string
          language?: string
          data_sharing?: boolean
          analytics_tracking?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          transit_notifications?: boolean
          daily_guidance?: boolean
          weekly_strategy?: boolean
          email_notifications?: boolean
          response_depth?: string
          focus_areas?: Json
          theme?: string
          language?: string
          data_sharing?: boolean
          analytics_tracking?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      webhook_logs: {
        Row: {
          id: string
          user_id: string
          webhook_type: string
          payload: Json
          response: Json
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          webhook_type: string
          payload?: Json
          response?: Json
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          webhook_type?: string
          payload?: Json
          response?: Json
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
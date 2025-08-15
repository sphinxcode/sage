import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message, session_id } = body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get user's Human Design profile and settings
    const { data: profile } = await supabase
      .from('human_design_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Get conversation history for context (last 10 messages)
    const { data: conversationHistory } = await supabase
      .from('chat_messages')
      .select('content, role, created_at')
      .eq('session_id', session_id)
      .order('created_at', { ascending: false })
      .limit(10)

    // Reverse to get chronological order
    const history = conversationHistory?.reverse() || []

    // Prepare payload for n8n workflow
    const n8nPayload = {
      user_id: user.id,
      session_id: session_id || `session_${Date.now()}`,
      message,
      chart_data: profile ? {
        type: profile.type,
        strategy: profile.strategy,
        authority: profile.authority,
        profile: profile.profile,
        definition: profile.definition,
        defined_centers: Array.isArray(profile.centers) ? 
          Object.entries(profile.centers).filter(([_, defined]) => defined).map(([center]) => center) : [],
        undefined_centers: Array.isArray(profile.centers) ? 
          Object.entries(profile.centers).filter(([_, defined]) => !defined).map(([center]) => center) : [],
        gates: profile.gates || [],
        channels: profile.channels_short || [],
        incarnation_cross: profile.incarnation_cross
      } : null,
      user_settings: settings ? {
        response_depth: settings.response_depth,
        focus_areas: settings.focus_areas,
        language: settings.language
      } : {
        response_depth: 'intermediate',
        focus_areas: ['general'],
        language: 'en'
      },
      conversation_history: history
    }

    // Call n8n workflow
    const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_BASE_URL}/webhook/sage-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(n8nPayload)
    })

    if (!n8nResponse.ok) {
      throw new Error(`n8n workflow failed: ${n8nResponse.status}`)
    }

    const aiResponse = await n8nResponse.json()

    // Save user message to database
    await supabase.from('chat_messages').insert({
      session_id: session_id || `session_${Date.now()}`,
      user_id: user.id,
      content: message,
      role: 'user'
    })

    // Save AI response to database
    await supabase.from('chat_messages').insert({
      session_id: session_id || `session_${Date.now()}`,
      user_id: user.id,
      content: aiResponse.ai_response,
      role: 'assistant',
      metadata: aiResponse.metadata || {}
    })

    // Update session activity
    await supabase.from('chat_sessions').upsert({
      id: session_id || `session_${Date.now()}`,
      user_id: user.id,
      session_name: `Chat ${new Date().toLocaleDateString()}`,
      updated_at: new Date().toISOString(),
      is_active: true
    })

    return NextResponse.json(aiResponse)

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
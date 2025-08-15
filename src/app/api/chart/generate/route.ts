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
    const { name, birthdate, birthtime, location } = body

    if (!name || !birthdate || !birthtime || !location) {
      return NextResponse.json({ 
        error: 'All birth details are required (name, birthdate, birthtime, location)' 
      }, { status: 400 })
    }

    // Prepare payload for n8n chart generation workflow
    const n8nPayload = {
      user_id: user.id,
      name,
      birthdate,
      birthtime,
      location
    }

    // Call n8n chart generation workflow
    const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_BASE_URL}/webhook/chart/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(n8nPayload)
    })

    if (!n8nResponse.ok) {
      throw new Error(`n8n chart workflow failed: ${n8nResponse.status}`)
    }

    const chartData = await n8nResponse.json()

    // Save chart data to database
    const { data: savedProfile, error: saveError } = await supabase
      .from('human_design_profiles')
      .upsert({
        user_id: user.id,
        name,
        birthdate,
        birthtime,
        location,
        type: chartData.type,
        strategy: chartData.strategy,
        authority: chartData.authority,
        profile: chartData.profile,
        definition: chartData.definition,
        incarnation_cross: chartData.incarnation_cross,
        centers: chartData.centers,
        gates: chartData.gates,
        channels_short: chartData.channels_short,
        channels_long: chartData.channels_long,
        variables: chartData.variables,
        circuitries: chartData.circuitries,
        // Planetary positions
        design_sun: chartData.design_sun,
        design_earth: chartData.design_earth,
        design_moon: chartData.design_moon,
        design_mercury: chartData.design_mercury,
        design_venus: chartData.design_venus,
        design_mars: chartData.design_mars,
        design_jupiter: chartData.design_jupiter,
        design_saturn: chartData.design_saturn,
        design_uranus: chartData.design_uranus,
        design_neptune: chartData.design_neptune,
        design_pluto: chartData.design_pluto,
        design_north_node: chartData.design_north_node,
        design_south_node: chartData.design_south_node,
        personality_sun: chartData.personality_sun,
        personality_earth: chartData.personality_earth,
        personality_moon: chartData.personality_moon,
        personality_mercury: chartData.personality_mercury,
        personality_venus: chartData.personality_venus,
        personality_mars: chartData.personality_mars,
        personality_jupiter: chartData.personality_jupiter,
        personality_saturn: chartData.personality_saturn,
        personality_uranus: chartData.personality_uranus,
        personality_neptune: chartData.personality_neptune,
        personality_pluto: chartData.personality_pluto,
        personality_north_node: chartData.personality_north_node,
        personality_south_node: chartData.personality_south_node,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving chart data:', saveError)
      throw saveError
    }

    // Mark user onboarding as completed
    await supabase
      .from('users')
      .update({ onboarding_completed: true })
      .eq('id', user.id)

    return NextResponse.json({
      success: true,
      chart: savedProfile,
      message: 'Human Design chart generated successfully'
    })

  } catch (error) {
    console.error('Chart generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate chart. Please try again.' }, 
      { status: 500 }
    )
  }
}
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email } = await request.json()
    
    // Generate random API key
    const apiKey = `ip_${Array.from({length: 32}, () => 
      Math.random().toString(36)[2]).join('')}`
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        { 
          api_key: apiKey,
          email: email || null
        }
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      api_key: apiKey,
      message: 'API key generated successfully'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

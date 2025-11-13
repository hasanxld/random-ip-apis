import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { api_key } = await request.json()
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('api_key', api_key)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return NextResponse.json({ 
        valid: false,
        message: 'Invalid API key'
      })
    }

    return NextResponse.json({
      valid: true,
      data: {
        requests: data.request_count,
        created: data.created_at,
        expires: data.expires_at
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      valid: false,
      message: 'Validation error'
    }, { status: 500 })
  }
}

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://bsvnmqoohwsdijqbzpzx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdm5tcW9vaHdzZGlqcWJ6cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzg2NzYsImV4cCI6MjA3ODYxNDY3Nn0.nyKCoTL5sj2A7AcEGbFJmZIMF2N09A-ubu0k8ZKrJLw'

const supabase = createClient(supabaseUrl, supabaseKey)

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

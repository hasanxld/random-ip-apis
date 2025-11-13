import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://bsvnmqoohwsdijqbzpzx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdm5tcW9vaHdzZGlqcWJ6cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzg2NzYsImV4cCI6MjA3ODYxNDY3Nn0.nyKCoTL5sj2A7AcEGbFJmZIMF2N09A-ubu0k8ZKrJLw'

const supabase = createClient(supabaseUrl, supabaseKey)

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request) {
  try {
    const { api_key } = await request.json()
    
    if (!api_key) {
      return NextResponse.json({ 
        valid: false,
        message: 'API key is required'
      }, { headers: corsHeaders })
    }

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
      }, { headers: corsHeaders })
    }

    return NextResponse.json({
      valid: true,
      data: {
        requests: data.request_count,
        created: data.created_at,
        expires: data.expires_at,
        email: data.email
      }
    }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ 
      valid: false,
      message: 'Validation error'
    }, { 
      status: 500,
      headers: corsHeaders 
    })
  }
}

export async function GET(request) {
  try {
    const apiKey = request.nextUrl.searchParams.get('api_key')
    
    if (!apiKey) {
      return NextResponse.json({ 
        valid: false,
        message: 'API key is required'
      }, { headers: corsHeaders })
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return NextResponse.json({ 
        valid: false,
        message: 'Invalid API key'
      }, { headers: corsHeaders })
    }

    return NextResponse.json({
      valid: true,
      data: {
        requests: data.request_count,
        created: data.created_at,
        expires: data.expires_at,
        email: data.email
      }
    }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ 
      valid: false,
      message: 'Validation error'
    }, { 
      status: 500,
      headers: corsHeaders 
    })
  }
}

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://bsvnmqoohwsdijqbzpzx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdm5tcW9vaHdzZGlqcWJ6cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzg2NzYsImV4cCI6MjA3ODYxNDY3Nn0.nyKCoTL5sj2A7AcEGbFJmZIMF2N09A-ubu0k8ZKrJLw'

const supabase = createClient(supabaseUrl, supabaseKey)

function generateRandomIP() {
  // Generate valid IP addresses
  const types = [
    () => `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Private
    () => `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Private
    () => `172.${Math.floor(Math.random() * 16 + 16)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Private
    () => `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` // Public
  ]
  
  const ip = types[Math.floor(Math.random() * types.length)]()
  
  return {
    ip: ip,
    type: ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.') ? 'private' : 'public',
    timestamp: new Date().toISOString(),
    country: ['US', 'GB', 'DE', 'FR', 'JP', 'BR', 'IN', 'AU'][Math.floor(Math.random() * 8)],
    asn: `AS${Math.floor(Math.random() * 10000)}`
  }
}

export async function GET(request) {
  try {
    const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('api_key')
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'API key required',
        message: 'Please provide a valid API key'
      }, { status: 401 })
    }

    // Validate API key
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single()

    if (keyError || !keyData) {
      return NextResponse.json({ 
        error: 'Invalid API key',
        message: 'The provided API key is invalid or expired'
      }, { status: 401 })
    }

    // Update request count
    await supabase
      .from('api_keys')
      .update({ request_count: (keyData.request_count || 0) + 1 })
      .eq('id', keyData.id)

    // Log request
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    await supabase
      .from('api_requests')
      .insert([
        { 
          api_key_id: keyData.id,
          ip_address: clientIP,
          user_agent: request.headers.get('user-agent')
        }
      ])

    // Generate random IP data
    const ipData = generateRandomIP()

    return NextResponse.json({
      success: true,
      data: ipData,
      credits_remaining: 1000 - (keyData.request_count || 0), // Example limit
      generated_at: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      message: 'Please try again later'
    }, { status: 500 })
  }
}

export async function POST(request) {
  return GET(request)
        }

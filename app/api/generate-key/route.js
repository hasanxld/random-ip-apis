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
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ 
        success: false,
        error: 'EMAIL_REQUIRED',
        message: 'Email address is required to generate API key'
      }, { 
        status: 400,
        headers: corsHeaders 
      })
    }
    
    // Generate random API key
    const generateRandomString = (length) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const apiKey = `ip_${generateRandomString(32)}`
    
    console.log('Generating API key for email:', email);
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        { 
          api_key: apiKey,
          email: email
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message 
      }, { 
        status: 500,
        headers: corsHeaders
      })
    }

    console.log('API key generated successfully:', apiKey);

    return NextResponse.json({ 
      success: true, 
      api_key: apiKey,
      message: 'API key generated successfully. Please save this key securely.'
    }, { headers: corsHeaders })
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'INTERNAL_SERVER_ERROR' 
    }, { 
      status: 500,
      headers: corsHeaders
    })
  }
}

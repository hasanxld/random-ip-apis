import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://bsvnmqoohwsdijqbzpzx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdm5tcW9vaHdzZGlqcWJ6cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzg2NzYsImV4cCI6MjA3ODYxNDY3Nn0.nyKCoTL5sj2A7AcEGbFJmZIMF2N09A-ubu0k8ZKrJLw'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request) {
  try {
    const { email } = await request.json()
    
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
          email: email || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message 
      }, { status: 500 })
    }

    console.log('API key generated successfully:', apiKey);

    return NextResponse.json({ 
      success: true, 
      api_key: apiKey,
      message: 'API key generated successfully'
    })
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

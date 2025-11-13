import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bsvnmqoohwsdijqbzpzx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdm5tcW9vaHdzZGlqcWJ6cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzg2NzYsImV4cCI6MjA3ODYxNDY3Nn0.nyKCoTL5sj2A7AcEGbFJmZIMF2N09A-ubu0k8ZKrJLw'

const supabase = createClient(supabaseUrl, supabaseKey)

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

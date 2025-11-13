import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://bsvnmqoohwsdijqbzpzx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdm5tcW9vaHdzZGlqcWJ6cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzg2NzYsImV4cCI6MjA3ODYxNDY3Nn0.nyKCoTL5sj2A7AcEGbFJmZIMF2N09A-ubu0k8ZKrJLw'

const supabase = createClient(supabaseUrl, supabaseKey)

function generateRandomIP() {
  const types = [
    // IPv4 addresses
    () => `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    () => `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    () => `172.${Math.floor(Math.random() * 16 + 16)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    () => `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    
    // IPv6 addresses (occasionally)
    () => {
      const hex = () => Math.floor(Math.random() * 65536).toString(16);
      return `2001:0db8:${hex()}:${hex()}:${hex()}:${hex()}:${hex()}:${hex()}`;
    }
  ];
  
  const ip = types[Math.floor(Math.random() * types.length)]();
  
  const countries = ['US', 'GB', 'DE', 'FR', 'JP', 'BR', 'IN', 'AU', 'CA', 'SG'];
  const cities = {
    'US': ['New York', 'Los Angeles', 'Chicago'],
    'GB': ['London', 'Manchester', 'Birmingham'],
    'DE': ['Berlin', 'Munich', 'Hamburg'],
    'FR': ['Paris', 'Lyon', 'Marseille'],
    'JP': ['Tokyo', 'Osaka', 'Kyoto'],
    'BR': ['São Paulo', 'Rio de Janeiro'],
    'IN': ['Mumbai', 'Delhi', 'Bangalore'],
    'AU': ['Sydney', 'Melbourne'],
    'CA': ['Toronto', 'Vancouver'],
    'SG': ['Singapore']
  };
  
  const country = countries[Math.floor(Math.random() * countries.length)];
  const cityList = cities[country];
  const city = cityList[Math.floor(Math.random() * cityList.length)];
  
  return {
    ip: ip,
    type: ip.includes(':') ? 'ipv6' : (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.') ? 'private' : 'public'),
    version: ip.includes(':') ? 'IPv6' : 'IPv4',
    timestamp: new Date().toISOString(),
    country: country,
    city: city,
    region: 'Unknown',
    isp: `ISP-${Math.floor(Math.random() * 1000)}`,
    asn: `AS${Math.floor(Math.random() * 10000)}`,
    latitude: (Math.random() * 180 - 90).toFixed(6),
    longitude: (Math.random() * 360 - 180).toFixed(6)
  }
}

export async function GET(request) {
  try {
    const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('api_key');
    
    if (!apiKey) {
      return NextResponse.json({ 
        success: false,
        error: 'API_KEY_REQUIRED',
        message: 'API key is required. Please provide your API key in the x-api-key header or api_key query parameter.'
      }, { status: 401 });
    }

    console.log('Validating API key:', apiKey);

    // Validate API key
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single();

    if (keyError || !keyData) {
      console.log('Invalid API key:', keyError);
      return NextResponse.json({ 
        success: false,
        error: 'INVALID_API_KEY',
        message: 'The provided API key is invalid, expired, or not active.'
      }, { status: 401 });
    }

    console.log('API key validated:', keyData.id);

    // Update request count
    await supabase
      .from('api_keys')
      .update({ request_count: (keyData.request_count || 0) + 1 })
      .eq('id', keyData.id);

    // Log request
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    await supabase
      .from('api_requests')
      .insert([
        { 
          api_key_id: keyData.id,
          ip_address: clientIP,
          user_agent: request.headers.get('user-agent') || 'unknown'
        }
      ]);

    // Generate random IP data
    const ipData = generateRandomIP();

    const response = {
      success: true,
      data: ipData,
      usage: {
        requests_today: (keyData.request_count || 0) + 1,
        remaining_requests: Math.max(0, 1000 - ((keyData.request_count || 0) + 1)),
        limit: 1000
      },
      generated_at: new Date().toISOString(),
      api_version: '1.0.0'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'An internal server error occurred. Please try again later.'
    }, { status: 500 });
  }
}

export async function POST(request) {
  return GET(request);
}

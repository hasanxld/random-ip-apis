'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Documentation() {
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    // Set the current website URL dynamically
    setBaseUrl(window.location.origin)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <ul className="space-y-2">
                <li><a href="#overview" className="text-blue-400 hover:text-blue-300">Overview</a></li>
                <li><a href="#authentication" className="text-blue-400 hover:text-blue-300">Authentication</a></li>
                <li><a href="#endpoints" className="text-blue-400 hover:text-blue-300">Endpoints</a></li>
                <li><a href="#examples" className="text-blue-400 hover:text-blue-300">Code Examples</a></li>
                <li><a href="#responses" className="text-blue-400 hover:text-blue-300">Responses</a></li>
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            <section id="overview">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-400 mb-4">
                The Random IP API provides developers with random IP addresses for testing, development, and educational purposes.
              </p>
              <div className="bg-gray-900 p-4 border border-gray-800">
                <p className="text-sm">
                  <strong>Base URL:</strong> <code className="text-blue-400">{baseUrl}</code>
                </p>
              </div>
            </section>

            <section id="authentication">
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <p className="text-gray-400 mb-4">
                All API requests require an API key. You can get a free API key from the homepage.
              </p>
              <div className="bg-gray-900 p-4 border border-gray-800 mb-4">
                <code className="text-sm">
                  x-api-key: your_api_key_here
                </code>
              </div>
              <p className="text-gray-400">
                You can pass the API key either in the header or as a query parameter.
              </p>
            </section>

            <section id="endpoints">
              <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
              
              <div className="bg-gray-900 p-6 border border-gray-800 mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-600 text-white px-2 py-1 text-sm mr-2">GET</span>
                  <code>{baseUrl}/api/ip/random</code>
                </div>
                <p className="text-gray-400 mb-4">Get a random IP address with detailed information</p>
                
                <h4 className="font-semibold mb-2">Parameters</h4>
                <ul className="text-gray-400 space-y-1">
                  <li><code>api_key</code> - Your API key (required in header or query parameter)</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Example Request</h4>
                <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm">
{`curl -X GET "${baseUrl}/api/ip/random?api_key=your_api_key_here"`}
                </pre>
              </div>

              <div className="bg-gray-900 p-6 border border-gray-800">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-600 text-white px-2 py-1 text-sm mr-2">POST</span>
                  <code>{baseUrl}/api/generate-key</code>
                </div>
                <p className="text-gray-400 mb-4">Generate a new API key</p>
                
                <h4 className="font-semibold mb-2">Body Parameters</h4>
                <ul className="text-gray-400 space-y-1">
                  <li><code>email</code> - Your email address (required)</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Example Request</h4>
                <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm">
{`curl -X POST "${baseUrl}/api/generate-key" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "your@email.com"}'`}
                </pre>
              </div>
            </section>

            <section id="examples">
              <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">JavaScript</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`// Using fetch with headers
const response = await fetch('${baseUrl}/api/ip/random', {
  headers: {
    'x-api-key': 'your_api_key_here'
  }
});
const data = await response.json();
console.log(data);`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Python</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`import requests

url = "${baseUrl}/api/ip/random"
headers = {"x-api-key": "your_api_key_here"}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Node.js</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`const https = require('https');

const options = {
  hostname: '${baseUrl.replace('https://', '')}',
  path: '/api/ip/random?api_key=your_api_key_here',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
});
req.end();`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">PHP</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`<?php
$url = "${baseUrl}/api/ip/random?api_key=your_api_key_here";
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data);
?>`}
                  </pre>
                </div>
              </div>
            </section>

            <section id="responses">
              <h2 className="text-2xl font-bold mb-4">Response Format</h2>
              
              <div className="bg-gray-900 p-4 border border-gray-800 mb-4">
                <pre className="text-sm overflow-auto">
{`{
  "success": true,
  "data": {
    "ip": "192.168.1.1",
    "type": "private",
    "version": "IPv4",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "country": "US",
    "city": "New York",
    "region": "Unknown",
    "isp": "ISP-123",
    "asn": "AS1234",
    "latitude": "40.712800",
    "longitude": "-74.006000"
  },
  "usage": {
    "requests_today": 1,
    "remaining_requests": 999,
    "limit": 1000
  },
  "generated_at": "2024-01-01T00:00:00.000Z",
  "api_version": "1.0.0"
}`}
                </pre>
              </div>

              <h3 className="text-xl font-bold mb-3">Error Responses</h3>
              <div className="bg-gray-900 p-4 border border-gray-800">
                <pre className="text-sm overflow-auto">
{`{
  "success": false,
  "error": "INVALID_API_KEY",
  "message": "The provided API key is invalid, expired, or not active."
}`}
                </pre>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

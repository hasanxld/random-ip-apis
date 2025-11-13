'use client'
import { useState } from 'react'

export default function ApiTester() {
  const [apiKey, setApiKey] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [endpoint, setEndpoint] = useState('/api/ip/random')
  const [method, setMethod] = useState('GET')
  const [requestBody, setRequestBody] = useState('')

  const testApi = async () => {
    setLoading(true)
    setResponse('')
    try {
      let url = `${window.location.origin}${endpoint}`
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        }
      }

      // Add API key to request
      if (method === 'GET') {
        url += `?api_key=${apiKey}`
      } else {
        options.headers['x-api-key'] = apiKey
      }

      // Add request body for POST requests
      if (method === 'POST' && requestBody) {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody))
        } catch (e) {
          setResponse(JSON.stringify({
            error: 'INVALID_JSON',
            message: 'Request body contains invalid JSON'
          }, null, 2))
          setLoading(false)
          return
        }
      }

      console.log('Testing API URL:', url)
      console.log('Options:', options)
      
      const response = await fetch(url, options)
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ 
        error: 'NETWORK_ERROR',
        message: 'Failed to connect to API. Please check your internet connection and try again.'
      }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const testFromExternalSite = () => {
    const code = `// JavaScript Example - Run this from any website
fetch('${window.location.origin}/api/ip/random?api_key=${apiKey}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Or with headers:
fetch('${window.location.origin}/api/ip/random', {
  headers: {
    'x-api-key': '${apiKey}'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));`

    setResponse(`// Copy this code to test from any website:\\n\\n${code}`)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 p-6">
      <h3 className="text-xl font-semibold mb-4">Test Your API</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">HTTP Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">API Endpoint</label>
            <select
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="/api/ip/random">Get Random IP</option>
              <option value="/api/validate-key">Validate API Key</option>
              <option value="/api/generate-key">Generate API Key</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key here"
            className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none font-mono text-sm"
          />
        </div>

        {method === 'POST' && endpoint === '/api/generate-key' && (
          <div>
            <label className="block text-sm font-medium mb-2">Request Body (JSON)</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder='{"email": "your@email.com"}'
              rows="3"
              className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none font-mono text-sm"
            />
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={testApi}
            disabled={loading || !apiKey}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Testing API...
              </span>
            ) : 'Test API Now'}
          </button>

          <button
            onClick={testFromExternalSite}
            disabled={!apiKey}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Get External Code
          </button>
        </div>
        
        {response && (
          <div>
            <label className="block text-sm font-medium mb-2">
              {response.includes('// Copy this code') ? 'External Test Code' : 'API Response'}
            </label>
            <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm max-h-60">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

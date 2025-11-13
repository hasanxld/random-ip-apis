'use client'
import { useState } from 'react'

export default function ApiTester() {
  const [apiKey, setApiKey] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [endpoint, setEndpoint] = useState('/api/ip/random')

  const testApi = async () => {
    setLoading(true)
    try {
      const url = `${window.location.origin}${endpoint}?api_key=${apiKey}`
      console.log('Testing API URL:', url)
      
      const response = await fetch(url)
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ 
        error: 'Failed to fetch',
        message: 'Please check your API key and try again'
      }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 p-6">
      <h3 className="text-xl font-semibold mb-4">Test Your API</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">API Endpoint</label>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="/api/ip/random">Get Random IP</option>
            <option value="/api/validate-key">Validate API Key</option>
          </select>
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
        
        <button
          onClick={testApi}
          disabled={loading || !apiKey}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
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
        
        {response && (
          <div>
            <label className="block text-sm font-medium mb-2">API Response</label>
            <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm max-h-60">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

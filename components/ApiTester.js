'use client'
import { useState } from 'react'

export default function ApiTester() {
  const [apiKey, setApiKey] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/ip/random?api_key=${apiKey}`)
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Failed to fetch' }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 p-6">
      <h3 className="text-xl font-semibold mb-4">Test API</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <button
          onClick={testApi}
          disabled={loading || !apiKey}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
        
        {response && (
          <div>
            <label className="block text-sm font-medium mb-2">Response</label>
            <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

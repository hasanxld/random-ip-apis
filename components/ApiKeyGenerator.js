'use client'
import { useState } from 'react'

export default function ApiKeyGenerator() {
  const [email, setEmail] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateKey = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      if (data.success) {
        setApiKey(data.api_key)
      }
    } catch (error) {
      console.error('Error generating API key:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 p-6">
      <h3 className="text-xl font-semibold mb-4">Get Your Free API Key</h3>
      
      {!apiKey ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <button
            onClick={generateKey}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Free API Key'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your API Key</label>
            <div className="flex">
              <input
                type="text"
                value={apiKey}
                readOnly
                className="flex-1 px-4 py-2 bg-black border border-gray-700 border-r-0"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 border border-gray-700"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div className="bg-yellow-900 border border-yellow-700 p-3">
            <p className="text-yellow-200 text-sm">
              ⚠️ Save this API key securely. You won't be able to see it again!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

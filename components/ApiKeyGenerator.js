'use client'
import { useState } from 'react'

export default function ApiKeyGenerator() {
  const [email, setEmail] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const generateKey = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true)
    setError('')
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
      } else {
        setError(data.error || 'Failed to generate API key')
      }
    } catch (error) {
      console.error('Error generating API key:', error)
      setError('Network error. Please try again.')
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
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-400 mt-1">We'll send your API key to this email</p>
          </div>
          
          {error && (
            <div className="bg-red-900 border border-red-700 p-3">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          <button
            onClick={generateKey}
            disabled={loading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : 'Generate Free API Key'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-900 border border-green-700 p-3">
            <p className="text-green-200 text-sm">
              ✅ API key generated successfully! Check your email for confirmation.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Your API Key</label>
            <div className="flex">
              <input
                type="text"
                value={apiKey}
                readOnly
                className="flex-1 px-4 py-2 bg-black border border-gray-700 border-r-0 font-mono text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 border border-gray-700 transition-colors"
              >
                {copied ? '✅' : '📋'}
              </button>
            </div>
          </div>
          
          <div className="bg-yellow-900 border border-yellow-700 p-3">
            <p className="text-yellow-200 text-sm">
              ⚠️ Save this API key securely. You won't be able to see it again!
            </p>
          </div>

          <button
            onClick={() => {
              setApiKey('');
              setEmail('');
              setError('');
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 font-semibold transition-colors"
          >
            Generate Another Key
          </button>
        </div>
      )}
    </div>
  )
              }

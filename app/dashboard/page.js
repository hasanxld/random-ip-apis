'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Dashboard() {
  const [apiKey, setApiKey] = useState('')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)

  const validateKey = async () => {
    if (!apiKey) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: apiKey }),
      })
      
      const data = await response.json()
      setStats(data.valid ? data.data : null)
    } catch (error) {
      console.error('Error validating key:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (apiKey) {
      validateKey()
    }
  }, [apiKey])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">API Key Statistics</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key to view stats"
                className="w-full px-4 py-2 bg-black border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            {loading && (
              <div className="text-center py-4">
                <p>Loading statistics...</p>
              </div>
            )}
            
            {stats && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-black p-4 border border-gray-700 text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.requests}</div>
                  <div className="text-gray-400 text-sm">Total Requests</div>
                </div>
                
                <div className="bg-black p-4 border border-gray-700 text-center">
                  <div className="text-lg font-bold text-green-400">
                    {new Date(stats.created).toLocaleDateString()}
                  </div>
                  <div className="text-gray-400 text-sm">Created</div>
                </div>
                
                <div className="bg-black p-4 border border-gray-700 text-center">
                  <div className="text-lg font-bold text-yellow-400">
                    {new Date(stats.expires).toLocaleDateString()}
                  </div>
                  <div className="text-gray-400 text-sm">Expires</div>
                </div>
              </div>
            )}
            
            {!stats && !loading && apiKey && (
              <div className="bg-red-900 border border-red-700 p-3 mt-4">
                <p className="text-red-200">Invalid API key or key has expired</p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-900 border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={() => window.open('/', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-semibold transition-colors text-left"
              >
                Generate New API Key
              </button>
              
              <button 
                onClick={() => window.open('/documentation', '_blank')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 font-semibold transition-colors text-left"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
                    }

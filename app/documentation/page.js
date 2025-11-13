import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Documentation() {
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
            </section>

            <section id="authentication">
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <p className="text-gray-400 mb-4">
                All API requests require an API key. You can get a free API key from the homepage.
              </p>
              <div className="bg-gray-900 p-4 border border-gray-800">
                <code className="text-sm">
                  x-api-key: your_api_key_here
                </code>
              </div>
            </section>

            <section id="endpoints">
              <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
              
              <div className="bg-gray-900 p-6 border border-gray-800 mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-600 text-white px-2 py-1 text-sm mr-2">GET</span>
                  <code>/api/ip/random</code>
                </div>
                <p className="text-gray-400 mb-4">Get a random IP address</p>
                
                <h4 className="font-semibold mb-2">Parameters</h4>
                <ul className="text-gray-400 space-y-1">
                  <li><code>api_key</code> - Your API key (required in header or query parameter)</li>
                </ul>
              </div>
            </section>

            <section id="examples">
              <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">JavaScript</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`// Using fetch
const response = await fetch('https://yourapp.vercel.app/api/ip/random', {
  headers: {
    'x-api-key': 'your_api_key_here'
  }
});
const data = await response.json();`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Python</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`import requests

url = "https://yourapp.vercel.app/api/ip/random"
headers = {"x-api-key": "your_api_key_here"}

response = requests.get(url, headers=headers)
data = response.json()`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">cURL</h4>
                  <pre className="bg-gray-900 p-4 border border-gray-800 overflow-auto text-sm">
{`curl -H "x-api-key: your_api_key_here" \\
  https://yourapp.vercel.app/api/ip/random`}
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
    "timestamp": "2024-01-01T00:00:00.000Z",
    "country": "US",
    "asn": "AS1234"
  },
  "credits_remaining": 999,
  "generated_at": "2024-01-01T00:00:00.000Z"
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

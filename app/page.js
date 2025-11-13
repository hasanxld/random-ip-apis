import Header from '../components/Header'
import Footer from '../components/Footer'
import ApiKeyGenerator from '../components/ApiKeyGenerator'
import ApiTester from '../components/ApiTester'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Random IP API
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Free, Fast & Reliable Random IP Address Generation API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/documentation"
              className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="#try-now"
              className="border border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Try Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our API?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-400 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Fast Response</h3>
              <p className="text-gray-400">Get random IP addresses in milliseconds with our optimized API.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-green-400 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure</h3>
              <p className="text-gray-400">API key authentication and rate limiting for secure usage.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-purple-400 text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-3">Global</h3>
              <p className="text-gray-400">IP addresses from various countries and networks worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Generator & Tester */}
      <section id="try-now" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ApiKeyGenerator />
            <ApiTester />
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">JavaScript Example</h3>
              <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm">
{`fetch('https://yourapp.vercel.app/api/ip/random', {
  headers: {
    'x-api-key': 'your_api_key_here'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Python Example</h3>
              <pre className="bg-black p-4 border border-gray-700 overflow-auto text-sm">
{`import requests

url = "https://yourapp.vercel.app/api/ip/random"
headers = {"x-api-key": "your_api_key_here"}

response = requests.get(url, headers=headers)
print(response.json())`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

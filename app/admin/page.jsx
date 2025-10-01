'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalZones: 0,
    totalBookings: 0,
    totalRevenue: 0
  })
  const [documents, setDocuments] = useState([])
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [documentContent, setDocumentContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Check if already authenticated via cookie
  useEffect(() => {
    // Check cookie
    const isAuth = document.cookie.includes('admin_authenticated=true')
    if (isAuth) {
      setIsAuthenticated(true)
      loadStats()
      loadDocuments()
    }
  }, [])

  const loadStats = async () => {
    try {
      // For now using sample data, will integrate with API when Supabase is ready
      setStats({
        totalProperties: 30,
        totalZones: 150,
        totalBookings: 45,
        totalRevenue: 12500000
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const loadDocumentContent = async (docId) => {
    try {
      const response = await fetch(`/api/documents?id=${docId}`)
      const data = await response.json()
      setSelectedDocument(data)
      setDocumentContent(data.content || '')
    } catch (error) {
      console.error('Error loading document:', error)
    }
  }

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLogin = (e) => {
    e.preventDefault()

    // Simple password protection (in production, use proper authentication)
    if (username === 'admin' && password === 'JjrU&*7343hH%#%fwe') {
      // Set cookie for authentication (expires in 24 hours)
      const expires = new Date()
      expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000)
      document.cookie = `admin_authenticated=true; expires=${expires.toUTCString()}; path=/; SameSite=Strict`

      setIsAuthenticated(true)
      setError('')
      loadStats()
      loadDocuments()
    } else {
      setError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    // Remove authentication cookie
    document.cookie = 'admin_authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">AR Property Rights Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">AR Property Rights Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalProperties}
            </div>
            <div className="text-gray-600 font-medium">Total Properties</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.totalZones}
            </div>
            <div className="text-gray-600 font-medium">AR Advertising Zones</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.totalBookings}
            </div>
            <div className="text-gray-600 font-medium">Active Bookings</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              ${(stats.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-gray-600 font-medium">Total Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Management</h3>
            <div className="space-y-3">
              <Link
                href="/properties"
                className="block text-blue-600 hover:text-blue-700"
              >
                View All Properties →
              </Link>
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Add New Property →
              </button>
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Manage AR Zones →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Management</h3>
            <div className="space-y-3">
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Pending Approvals (12) →
              </button>
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Active Campaigns →
              </button>
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Revenue Reports →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
            <div className="space-y-3">
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                User Management →
              </button>
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Pricing Configuration →
              </button>
              <button className="block text-blue-600 hover:text-blue-700 text-left">
                Database Status →
              </button>
            </div>
          </div>
        </div>

        {/* Documentation & Business Files */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Documentation & Business Files</h3>
                <p className="text-sm text-gray-600 mt-1">Strategic planning and operational documents</p>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-gray-900">{documents.length}</span>
                <span className="text-gray-600 ml-1">Files</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Document List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => loadDocumentContent(doc.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {doc.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-2">
                        {doc.title}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                    <span>{doc.size}</span>
                    <span>{doc.updated}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No documents found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Document Viewer Modal */}
        {selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedDocument.title}</h3>
                  <div className="flex gap-3 mt-1 text-sm text-gray-600">
                    <span>{selectedDocument.category}</span>
                    <span>•</span>
                    <span>{selectedDocument.size}</span>
                    <span>•</span>
                    <span>{selectedDocument.updated}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedDocument(null)
                    setDocumentContent('')
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {documentContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">New booking request</div>
                  <div className="text-sm text-gray-600">Nike Inc. - Empire State Building North Facade</div>
                </div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Property added</div>
                  <div className="text-sm text-gray-600">One World Trade Center - New York, NY</div>
                </div>
                <div className="text-sm text-gray-500">5 hours ago</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Campaign completed</div>
                  <div className="text-sm text-gray-600">Disney Studios - Times Square LED Wall</div>
                </div>
                <div className="text-sm text-gray-500">1 day ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Database: Connected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">API: Operational</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Supabase: Pending Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
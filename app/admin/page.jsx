'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'authenticated') {
      setIsAuthenticated(true)
      loadStats()
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

  const handleLogin = (e) => {
    e.preventDefault()

    // Simple password protection (in production, use proper authentication)
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'authenticated')
      setError('')
      loadStats()
    } else {
      setError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
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
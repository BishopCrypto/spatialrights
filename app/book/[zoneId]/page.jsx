'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase'
import { formatCurrency, formatNumber, getZoneById, getPropertyById } from '../../../lib/sample-data'

export default function BookZonePage({ params }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    advertiser_name: '',
    advertiser_email: '',
    campaign_name: '',
    campaign_description: '',
    start_date: '',
    end_date: '',
    content_type: 'video',
    content_description: '',
    targeting_demographics: '',
    company_name: '',
    company_website: '',
    budget_range: 'standard'
  })

  // Get zone and property data
  const zone = getZoneById(params.zoneId)
  const property = zone ? getPropertyById(zone.property_id) : null

  if (!zone || !property) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Zone Not Found</h1>
            <p className="text-gray-600 mb-6">The AR advertising zone you're looking for doesn't exist.</p>
            <Link href="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const calculateDuration = () => {
    if (!bookingData.start_date || !bookingData.end_date) return 0
    const start = new Date(bookingData.start_date)
    const end = new Date(bookingData.end_date)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.ceil(diffDays / 30) // Convert to months
  }

  const calculateTotalCost = () => {
    const months = calculateDuration()
    const basePrice = zone.base_price_monthly
    const premiumMultiplier = zone.premium_multiplier || 1
    const budgetMultiplier = bookingData.budget_range === 'premium' ? 1.5 :
                            bookingData.budget_range === 'enterprise' ? 2.0 : 1.0
    return months * basePrice * premiumMultiplier * budgetMultiplier
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Calculate booking details
      const duration = calculateDuration()
      const totalCost = calculateTotalCost()

      const booking = {
        zone_id: zone.id,
        property_id: zone.property_id,
        advertiser_name: bookingData.advertiser_name,
        advertiser_email: bookingData.advertiser_email,
        campaign_name: bookingData.campaign_name,
        campaign_description: bookingData.campaign_description,
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        total_amount: totalCost,
        content_type: bookingData.content_type,
        content_description: bookingData.content_description,
        targeting_demographics: bookingData.targeting_demographics,
        company_name: bookingData.company_name,
        company_website: bookingData.company_website,
        budget_range: bookingData.budget_range
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking')
      }

      router.push(`/booking-confirmation/${result.booking.id}`)
    } catch (error) {
      console.error('Booking error:', error)
      alert(error.message || 'There was an error processing your booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href={`/properties/${property.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← Back to {property.building_name}
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Book AR Advertising Zone</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.company_name}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Acme Corp"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Website
                      </label>
                      <input
                        type="url"
                        value={bookingData.company_website}
                        onChange={(e) => handleInputChange('company_website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://acmecorp.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Advertiser Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.advertiser_name}
                        onChange={(e) => handleInputChange('advertiser_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingData.advertiser_email}
                        onChange={(e) => handleInputChange('advertiser_email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@acmecorp.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingData.campaign_name}
                      onChange={(e) => handleInputChange('campaign_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Summer Product Launch 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={bookingData.campaign_description}
                      onChange={(e) => handleInputChange('campaign_description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your advertising campaign objectives and target audience..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingData.start_date}
                        onChange={(e) => handleInputChange('start_date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingData.end_date}
                        onChange={(e) => handleInputChange('end_date', e.target.value)}
                        min={bookingData.start_date || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Specifications */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Content Specifications</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content Type *
                      </label>
                      <select
                        required
                        value={bookingData.content_type}
                        onChange={(e) => handleInputChange('content_type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="video">Video Advertisement</option>
                        <option value="3d_model">3D Model/Product</option>
                        <option value="interactive">Interactive Experience</option>
                        <option value="image">Static Image</option>
                        <option value="animation">Animated Graphics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        required
                        value={bookingData.budget_range}
                        onChange={(e) => handleInputChange('budget_range', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="standard">Standard Package</option>
                        <option value="premium">Premium Package (+50%)</option>
                        <option value="enterprise">Enterprise Package (+100%)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content Description
                    </label>
                    <textarea
                      rows={3}
                      value={bookingData.content_description}
                      onChange={(e) => handleInputChange('content_description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe the AR content you plan to display (products, branding, interactive elements, etc.)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Demographics
                    </label>
                    <input
                      type="text"
                      value={bookingData.targeting_demographics}
                      onChange={(e) => handleInputChange('targeting_demographics', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Age 25-45, Urban professionals, Tech enthusiasts"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <button
                    type="submit"
                    disabled={loading || calculateDuration() === 0}
                    className="w-full btn btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : `Submit Booking Request - ${formatCurrency(calculateTotalCost())}`}
                  </button>

                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Your booking request will be reviewed within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

              {/* Zone Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900">{zone.zone_name}</h4>
                  <p className="text-sm text-gray-600">{property.building_name}</p>
                  <p className="text-sm text-gray-500">{property.address}</p>
                  <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Dimensions:</span>
                    <div className="font-medium">{zone.width_feet}' × {zone.height_feet}'</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Area:</span>
                    <div className="font-medium">{zone.square_footage} sq ft</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Visibility:</span>
                    <div className="font-medium">{zone.visibility_score}/10</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Traffic:</span>
                    <div className="font-medium">{zone.traffic_exposure_score}/10</div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Monthly Rate:</span>
                  <span className="font-medium">{formatCurrency(zone.base_price_monthly)}</span>
                </div>

                {zone.premium_multiplier > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location Premium ({Math.round((zone.premium_multiplier - 1) * 100)}%):</span>
                    <span className="font-medium">+{formatCurrency(zone.base_price_monthly * (zone.premium_multiplier - 1))}</span>
                  </div>
                )}

                {bookingData.budget_range !== 'standard' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {bookingData.budget_range === 'premium' ? 'Premium Package (+50%):' : 'Enterprise Package (+100%):'}
                    </span>
                    <span className="font-medium">
                      +{formatCurrency(zone.base_price_monthly * zone.premium_multiplier * (bookingData.budget_range === 'premium' ? 0.5 : 1.0))}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{calculateDuration()} months</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Campaign Cost:</span>
                    <span className="text-green-600">{formatCurrency(calculateTotalCost())}</span>
                  </div>
                </div>

                {calculateTotalCost() > 0 && (
                  <div className="text-xs text-gray-500">
                    Monthly rate: {formatCurrency(calculateTotalCost() / Math.max(calculateDuration(), 1))}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What's Included:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 24/7 content monitoring</li>
                  <li>• AR placement optimization</li>
                  <li>• Performance analytics</li>
                  <li>• Technical support</li>
                  <li>• Content approval process</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
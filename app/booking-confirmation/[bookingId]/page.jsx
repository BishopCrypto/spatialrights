'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase'
import { formatCurrency, formatNumber } from '../../../lib/sample-data'

export default function BookingConfirmationPage({ params }) {
  const [booking, setBooking] = useState(null)
  const [zone, setZone] = useState(null)
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/bookings/${params.bookingId}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch booking details')
        }

        const bookingData = result.booking
        setBooking(bookingData)

        // Set zone and property data from the joined response
        if (bookingData.ar_zones) {
          setZone(bookingData.ar_zones)
        }

        if (bookingData.properties) {
          setProperty(bookingData.properties)
        }

      } catch (err) {
        console.error('Error fetching booking details:', err)
        setError('Could not load booking details')
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [params.bookingId])

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking confirmation...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The booking confirmation you\'re looking for doesn\'t exist.'}</p>
            <Link href="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const calculateDuration = () => {
    const start = new Date(booking.start_date)
    const end = new Date(booking.end_date)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.ceil(diffDays / 30)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending_approval':
        return 'Your booking request is being reviewed. We\'ll contact you within 24 hours.'
      case 'approved':
        return 'Congratulations! Your booking has been approved. Please proceed with payment.'
      case 'active':
        return 'Your AR advertising campaign is currently active.'
      case 'rejected':
        return 'Your booking request has been declined. Please contact us for more information.'
      case 'completed':
        return 'Your AR advertising campaign has been completed successfully.'
      default:
        return 'Status unknown. Please contact support.'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Submitted</h1>
          <p className="text-xl text-gray-600">
            Thank you for your AR advertising booking request!
          </p>
        </div>

        {/* Booking Status */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Booking Status</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">{getStatusMessage(booking.status)}</p>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Booking ID:</strong> #{booking.id}</p>
            <p><strong>Submitted:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Campaign Information */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Campaign Details</h3>

            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Campaign Name:</span>
                <div className="font-medium">{booking.campaign_name}</div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Company:</span>
                <div className="font-medium">{booking.company_name}</div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Advertiser:</span>
                <div className="font-medium">{booking.advertiser_name}</div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Email:</span>
                <div className="font-medium">{booking.advertiser_email}</div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Content Type:</span>
                <div className="font-medium">{booking.content_type.replace('_', ' ')}</div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Budget Package:</span>
                <div className="font-medium">{booking.budget_range.replace('_', ' ')}</div>
              </div>

              {booking.campaign_description && (
                <div>
                  <span className="text-gray-500 text-sm">Description:</span>
                  <div className="font-medium">{booking.campaign_description}</div>
                </div>
              )}
            </div>
          </div>

          {/* Location & Timing */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Location & Timing</h3>

            <div className="space-y-3">
              {zone && (
                <div>
                  <span className="text-gray-500 text-sm">AR Zone:</span>
                  <div className="font-medium">{zone.zone_name}</div>
                </div>
              )}

              {property && (
                <>
                  <div>
                    <span className="text-gray-500 text-sm">Property:</span>
                    <div className="font-medium">{property.building_name}</div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Address:</span>
                    <div className="font-medium">
                      {property.address}<br />
                      {property.city}, {property.state}
                    </div>
                  </div>
                </>
              )}

              <div>
                <span className="text-gray-500 text-sm">Campaign Dates:</span>
                <div className="font-medium">
                  {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Duration:</span>
                <div className="font-medium">{calculateDuration()} months</div>
              </div>

              {zone && (
                <div>
                  <span className="text-gray-500 text-sm">Zone Size:</span>
                  <div className="font-medium">{zone.width_feet}' × {zone.height_feet}' ({zone.square_footage} sq ft)</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="card p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Summary</h3>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total Campaign Cost:</span>
              <span className="text-green-600">{formatCurrency(booking.total_amount)}</span>
            </div>

            <div className="text-sm text-gray-600 mt-2">
              Monthly rate: {formatCurrency(booking.total_amount / Math.max(calculateDuration(), 1))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>* Final pricing may be adjusted based on content requirements and technical specifications</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <div className="font-medium">Review Process</div>
                <div className="text-gray-600 text-sm">Our team will review your booking request and content specifications within 24 hours.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <div className="font-medium">Approval & Contract</div>
                <div className="text-gray-600 text-sm">Once approved, we'll send you a contract and payment instructions.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <div className="font-medium">Content Preparation</div>
                <div className="text-gray-600 text-sm">Work with our team to prepare and optimize your AR content for the selected zone.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <div className="font-medium">Campaign Launch</div>
                <div className="text-gray-600 text-sm">Your AR advertising campaign goes live on the scheduled start date.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/properties"
            className="btn btn-outline"
          >
            Browse More Properties
          </Link>

          <Link
            href={property ? `/properties/${property.id}` : '/properties'}
            className="btn btn-primary"
          >
            Back to Property Details
          </Link>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Questions about your booking?</h4>
          <p className="text-gray-600 mb-4">
            Our AR advertising specialists are here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <span>📧 bookings@spatialrights.com</span>
            <span className="hidden sm:inline">•</span>
            <span>📞 1-800-AR-RIGHTS</span>
            <span className="hidden sm:inline">•</span>
            <span>💬 Live chat available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  )
}
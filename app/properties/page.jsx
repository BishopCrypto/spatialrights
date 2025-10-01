'use client'

import Link from 'next/link'
import { properties, arZones, formatCurrency, formatNumber } from '../../lib/sample-data'

export const dynamic = 'force-dynamic'

export default function PropertiesPage() {
  // Filter and sort properties
  const sortedProperties = [...properties].sort((a, b) => b.total_monthly_revenue - a.total_monthly_revenue)

  // Group by city for better organization
  const propertiesByCity = sortedProperties.reduce((acc, property) => {
    const city = `${property.city}, ${property.state}`
    if (!acc[city]) acc[city] = []
    acc[city].push(property)
    return acc
  }, {})

  const cities = Object.keys(propertiesByCity).sort()

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AR Property Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover premium AR advertising opportunities from major real estate developers including
            Simon Property Group, Hines, Tishman Speyer, Brookfield Properties, and more.
          </p>
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{properties.length}</div>
            <div className="text-gray-600 font-medium">Properties</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {arZones.filter(z => z.availability_status === 'available').length}
            </div>
            <div className="text-gray-600 font-medium">Available Zones</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {cities.length}
            </div>
            <div className="text-gray-600 font-medium">Cities</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {formatCurrency(sortedProperties.reduce((sum, p) => sum + p.total_monthly_revenue, 0))}
            </div>
            <div className="text-gray-600 font-medium">Total Revenue</div>
          </div>
        </div>

        {/* Properties by City */}
        {cities.map(city => (
          <div key={city} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
              {city}
            </h2>

            <div className="property-grid">
              {propertiesByCity[city].map(property => {
                const propertyZones = arZones.filter(z => z.property_id === property.id)
                const availableZones = propertyZones.filter(z => z.availability_status === 'available')
                const bookedZones = propertyZones.filter(z => z.availability_status === 'booked')

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="card hover:shadow-lg transition-all duration-200 overflow-hidden group"
                  >
                    {/* Property Image/Header */}
                    <div className="aspect-video relative overflow-hidden">
                      {property.image_url ? (
                        <img
                          src={property.image_url}
                          alt={property.building_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.querySelector('.fallback-text').style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div className={`${property.image_url ? 'hidden' : 'flex'} fallback-text absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-200 items-center justify-center`}>
                        <h3 className="text-white text-lg font-semibold text-center px-4 drop-shadow-lg">
                          {property.building_name}
                        </h3>
                      </div>

                      {/* Market Tier Badge */}
                      <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
                        {property.market_tier === 1 ? 'Premium' :
                         property.market_tier === 2 ? 'Standard' : 'Secondary'}
                      </div>

                      {/* Building Type Badge */}
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {property.building_type.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-6">
                      {/* Header Info */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {property.building_name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-1">{property.address}</p>
                          <p className="text-gray-500 text-xs">{property.owner_name}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-xl font-bold text-green-600">
                            {formatCurrency(property.total_monthly_revenue)}
                          </div>
                          <div className="text-xs text-gray-500">monthly potential</div>
                        </div>
                      </div>

                      {/* Property Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Daily Traffic:</span>
                          <div className="font-medium">{formatNumber(property.foot_traffic_daily)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Building Height:</span>
                          <div className="font-medium">{formatNumber(property.building_height_feet)}ft</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Facade Area:</span>
                          <div className="font-medium">{formatNumber(property.total_facade_area_sqft)} sq ft</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Year Built:</span>
                          <div className="font-medium">{property.year_built}</div>
                        </div>
                      </div>

                      {/* Zone Availability */}
                      <div className="flex justify-between items-center text-sm mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">{availableZones.length} available</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600">{bookedZones.length} booked</span>
                          </span>
                        </div>
                        <span className="text-blue-600 font-medium">
                          {propertyZones.length} total zones
                        </span>
                      </div>

                      {/* Visibility Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Visibility:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < property.visibility_score ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}
                              ></div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">{property.visibility_score}/10</span>
                        </div>

                        <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Property?</h2>
          <p className="text-xl mb-8 text-blue-100">
            List your building and start earning from AR advertising rights
          </p>
          <Link
            href="/list-property"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </div>
  )
}
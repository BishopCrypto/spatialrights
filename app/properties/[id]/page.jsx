import Link from 'next/link'
import { notFound } from 'next/navigation'
import { properties, arZones, formatCurrency, formatNumber, getPropertyById, getZonesByProperty, standardSizes } from '../../../lib/sample-data'

export default function PropertyDetailPage({ params }) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  const zones = getZonesByProperty(property.id)
  const availableZones = zones.filter(z => z.availability_status === 'available')
  const bookedZones = zones.filter(z => z.availability_status === 'booked')

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/properties"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← Back to Properties
          </Link>
        </div>

        {/* Property Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Property Image/Visualization */}
          <div className="aspect-video rounded-lg relative overflow-hidden">
            {property.image_url ? (
              <img
                src={property.image_url}
                alt={property.building_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
            )}

            {/* Zone Overlay Visualization */}
            <div className="absolute inset-0">
              {/* This would be an interactive 3D building visualization in production */}
              <div className="absolute top-4 left-4 bg-green-500 bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                North Facade Available
              </div>
              <div className="absolute bottom-4 right-4 bg-red-500 bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                Entrance Booked
              </div>
              <div className="absolute top-1/2 right-4 bg-yellow-500 bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                Side Wall Available
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {property.building_name}
              </h1>
              <p className="text-xl text-gray-600 mb-1">{property.address}</p>
              <p className="text-lg text-gray-500">{property.city}, {property.state}</p>
              <p className="text-gray-500 mt-2">Owned by {property.owner_name}</p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {property.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="stat-card text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {formatCurrency(property.total_monthly_revenue)}
                </div>
                <div className="text-sm text-gray-600">Monthly Revenue Potential</div>
              </div>
              <div className="stat-card text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {zones.length}
                </div>
                <div className="text-sm text-gray-600">AR Advertising Zones</div>
              </div>
              <div className="stat-card text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {formatNumber(property.foot_traffic_daily)}
                </div>
                <div className="text-sm text-gray-600">Daily Foot Traffic</div>
              </div>
              <div className="stat-card text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {property.visibility_score}/10
                </div>
                <div className="text-sm text-gray-600">Visibility Score</div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Building Height:</span>
                <div className="font-medium">{formatNumber(property.building_height_feet)} feet</div>
              </div>
              <div>
                <span className="text-gray-500">Total Facade Area:</span>
                <div className="font-medium">{formatNumber(property.total_facade_area_sqft)} sq ft</div>
              </div>
              <div>
                <span className="text-gray-500">Floors:</span>
                <div className="font-medium">{property.floors}</div>
              </div>
              <div>
                <span className="text-gray-500">Year Built:</span>
                <div className="font-medium">{property.year_built}</div>
              </div>
              <div>
                <span className="text-gray-500">Building Type:</span>
                <div className="font-medium">{property.building_type.replace('_', ' ')}</div>
              </div>
              <div>
                <span className="text-gray-500">Market Tier:</span>
                <div className="font-medium">
                  Tier {property.market_tier} ({property.market_tier === 1 ? 'Premium' : property.market_tier === 2 ? 'Standard' : 'Secondary'})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Availability Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">{availableZones.length}</div>
            <div className="text-gray-600 font-medium">Available Zones</div>
            <div className="text-sm text-gray-500 mt-1">Ready to book now</div>
          </div>
          <div className="card p-6 text-center border-red-200">
            <div className="text-3xl font-bold text-red-600 mb-2">{bookedZones.length}</div>
            <div className="text-gray-600 font-medium">Booked Zones</div>
            <div className="text-sm text-gray-500 mt-1">Currently generating revenue</div>
          </div>
          <div className="card p-6 text-center border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{zones.length}</div>
            <div className="text-gray-600 font-medium">Total AR Zones</div>
            <div className="text-sm text-gray-500 mt-1">Monetization opportunities</div>
          </div>
        </div>

        {/* AR Zones Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">AR Advertising Zones</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          <div className="zone-grid">
            {zones.map(zone => {
              const sizeInfo = standardSizes[zone.zone_type] || standardSizes.custom
              const isAvailable = zone.availability_status === 'available'

              return (
                <div
                  key={zone.id}
                  className={`zone-card ${
                    isAvailable ? 'zone-available' : 'zone-booked'
                  } relative`}
                >
                  {/* Zone Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{zone.zone_name}</h3>
                      <p className="text-sm text-gray-600">{sizeInfo.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {zone.availability_status}
                    </span>
                  </div>

                  {/* Zone Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="font-medium">
                        {zone.width_feet}' × {zone.height_feet}'
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Square Footage:</span>
                      <span className="font-medium">{zone.square_footage} sq ft</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Visibility Score:</span>
                      <span className="font-medium">{zone.visibility_score}/10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Traffic Exposure:</span>
                      <span className="font-medium">{zone.traffic_exposure_score}/10</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-500 text-sm">Monthly Rate:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(zone.base_price_monthly)}
                      </span>
                    </div>

                    {zone.premium_multiplier > 1 && (
                      <div className="text-xs text-blue-600 mb-3">
                        +{Math.round((zone.premium_multiplier - 1) * 100)}% premium location
                      </div>
                    )}

                    {/* Action Button */}
                    {isAvailable ? (
                      <Link
                        href={`/book/${zone.id}`}
                        className="btn btn-primary w-full text-center"
                      >
                        Book This Zone
                      </Link>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">
                          Booked by {zone.current_booking?.advertiser}
                        </div>
                        <div className="text-xs text-gray-500">
                          Available {zone.current_booking?.end_date}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Engagement Rate Badge */}
                  {zone.engagement_rate && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      {Math.round(zone.engagement_rate * 100)}% engagement
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Revenue Calculator */}
        <div className="card p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue Calculator</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Select Zones & Duration</h4>
              <div className="space-y-4">
                {availableZones.slice(0, 3).map(zone => (
                  <label key={zone.id} className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div className="flex-1">
                      <div className="font-medium">{zone.zone_name}</div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(zone.base_price_monthly)}/month
                      </div>
                    </div>
                  </label>
                ))}

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Duration: 3 months
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    defaultValue="3"
                    className="calculator-slider w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 month</span>
                    <span>12 months</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Estimated Campaign Cost</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Zones:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(0)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Campaign Cost:</span>
                    <span className="text-green-600">{formatCurrency(0)}</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full mt-4">
                  Get Detailed Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Investment Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Property Owner */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Property Owner</h3>
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-gray-500">Owner:</span>
                <div className="font-medium">{property.owner_name}</div>
              </div>
              <div>
                <span className="text-gray-500">Property Manager:</span>
                <div className="font-medium">AR Rights Department</div>
              </div>
              <div>
                <span className="text-gray-500">Response Time:</span>
                <div className="font-medium">Within 24 hours</div>
              </div>
            </div>
            <Link
              href={`/contact/${property.id}`}
              className="btn btn-outline w-full text-center"
            >
              Request Information
            </Link>
          </div>

          {/* Investment Opportunity */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Opportunity</h3>
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-gray-500">Fractional Ownership:</span>
                <div className="font-medium">Available</div>
              </div>
              <div>
                <span className="text-gray-500">Minimum Investment:</span>
                <div className="font-medium">{formatCurrency(100000)}</div>
              </div>
              <div>
                <span className="text-gray-500">Expected Return:</span>
                <div className="font-medium">12-18% annually</div>
              </div>
            </div>
            <Link
              href={`/invest/properties/${property.id}`}
              className="btn btn-primary w-full text-center"
            >
              Explore Investment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
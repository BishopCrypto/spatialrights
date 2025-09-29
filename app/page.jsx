import Link from 'next/link'
import { properties, arZones, recentBookings, formatCurrency, formatNumber } from '../lib/sample-data'

export default function HomePage() {
  // Calculate dashboard stats
  const totalProperties = properties.length
  const totalZones = arZones.length
  const availableZones = arZones.filter(z => z.availability_status === 'available').length
  const totalMonthlyRevenue = properties.reduce((sum, p) => sum + (p.total_monthly_revenue || 0), 0)
  const activeBookings = recentBookings.filter(b => b.status === 'active').length

  // Featured properties (top 6 by revenue)
  const featuredProperties = properties
    .sort((a, b) => (b.total_monthly_revenue || 0) - (a.total_monthly_revenue || 0))
    .slice(0, 6)

  // Recent activity
  const recentActivity = recentBookings.slice(0, 5)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Future of AR Advertising
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover, book, and monetize AR advertising rights on premium buildings worldwide.
              From Times Square billboards to shopping mall airspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/properties"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                href="/list-property"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                List Your Building
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {totalProperties}
              </div>
              <div className="text-gray-600 font-medium">Premium Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {availableZones}
              </div>
              <div className="text-gray-600 font-medium">Available AR Zones</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {activeBookings}
              </div>
              <div className="text-gray-600 font-medium">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {formatCurrency(totalMonthlyRevenue)}
              </div>
              <div className="text-gray-600 font-medium">Monthly Revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium AR advertising opportunities from major real estate developers and iconic landmarks
            </p>
          </div>

          <div className="property-grid">
            {featuredProperties.map((property) => {
              const propertyZones = arZones.filter(z => z.property_id === property.id)
              const availableCount = propertyZones.filter(z => z.availability_status === 'available').length

              return (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="card hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold text-center px-4">
                        {property.building_name}
                      </h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium">
                      Tier {property.market_tier}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{property.building_name}</h4>
                        <p className="text-gray-600 text-sm">{property.city}, {property.state}</p>
                        <p className="text-gray-500 text-xs">{property.owner_name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(property.total_monthly_revenue)}
                        </div>
                        <div className="text-xs text-gray-500">monthly potential</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                          {formatNumber(property.foot_traffic_daily)} daily visitors
                        </span>
                      </div>
                      <div className="text-blue-600 font-medium">
                        {availableCount} zones available
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(property.visibility_score)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        ))}
                        <span className="text-xs text-gray-500 ml-2">visibility</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {propertyZones.length} AR zones
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="btn btn-primary text-lg px-8 py-3"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Marketplace Activity</h2>
            <Link href="/marketplace" className="text-blue-600 hover:text-blue-700 font-medium">
              View All Activity →
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((booking) => {
              const zone = arZones.find(z => z.id === booking.zone_id)
              const property = properties.find(p => p.id === zone?.property_id)

              return (
                <div key={booking.id} className="card p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {booking.advertiser_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.campaign_name}</h4>
                        <p className="text-gray-600 text-sm">
                          {booking.advertiser_name} • {zone?.zone_name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {property?.building_name}, {property?.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(booking.total_amount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.start_date} - {booking.end_date}
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        booking.status === 'active' ? 'bg-green-100 text-green-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Insights</h2>
            <p className="text-xl text-gray-600">AR advertising market trends and opportunities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">$31.8B</div>
              <h3 className="text-xl font-semibold mb-2">Total Market Size</h3>
              <p className="text-gray-600">
                Combined outdoor AR ($25B) and indoor AR ($6.8B) market opportunity by 2030
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="text-4xl font-bold text-green-600 mb-4">85%</div>
              <h3 className="text-xl font-semibold mb-2">Engagement Rate</h3>
              <p className="text-gray-600">
                Average engagement rate for AR advertising vs. 8% for traditional billboards
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-4">300%</div>
              <h3 className="text-xl font-semibold mb-2">Revenue Premium</h3>
              <p className="text-gray-600">
                AR advertising commands 3x higher rates than traditional outdoor advertising
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Enter the AR Economy?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join property owners and advertisers already earning millions from AR rights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse AR Opportunities
            </Link>
            <Link
              href="/invest"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Explore Investments
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
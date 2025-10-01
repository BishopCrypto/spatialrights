'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency, formatNumber } from '../../lib/sample-data'

export const dynamic = 'force-dynamic'

export default function ListPropertyPage() {
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    buildingType: '',
    buildingHeight: '',
    floors: '',
    yearBuilt: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownershipProof: '',
    currentAdvertising: '',
    footTraffic: '',
    enforcementLevel: 'standard'
  })

  // Revenue calculator state
  const [calculatorInputs, setCalculatorInputs] = useState({
    buildingHeight: 300,
    footTraffic: 50000,
    location: 'urban',
    zones: 4
  })

  const calculateRevenue = () => {
    const baseRate = 5000
    const heightMultiplier = calculatorInputs.buildingHeight / 100
    const trafficMultiplier = calculatorInputs.footTraffic / 10000
    const locationMultiplier = calculatorInputs.location === 'premium' ? 3 : calculatorInputs.location === 'urban' ? 2 : 1
    const zonesMultiplier = calculatorInputs.zones

    return Math.round(baseRate * heightMultiplier * trafficMultiplier * locationMultiplier * zonesMultiplier)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const nextStep = () => {
    setFormStep(formStep + 1)
  }

  const prevStep = () => {
    setFormStep(formStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would submit to API
    alert('Thank you! We will contact you within 24 hours for property verification.')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Building. Your Airspace. Your Revenue.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Protect your property from unauthorized AR advertising while earning $50K-$500K+ monthly from licensed spatial rights
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-3">🛡️ Protection</h3>
                <p className="text-blue-100">Block unauthorized AR content on your property with 24/7 monitoring and legal enforcement</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-3">💰 Monetization</h3>
                <p className="text-blue-100">Earn passive income from AR advertising rights without any physical changes to your building</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Threat Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⚠️ AR Squatting is Already Happening
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Without registered AR rights, anyone can display advertising on your building in augmented reality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unauthorized AR Graffiti</h3>
              <p className="text-gray-600 mb-4">
                Competitors and bad actors are already placing AR content on buildings without permission, damaging brand reputation.
              </p>
              <div className="text-sm text-red-600 font-medium">
                Documented in 47 major cities
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitor Hijacking</h3>
              <p className="text-gray-600 mb-4">
                Rival businesses displaying AR ads directly on competitor locations, diverting foot traffic and revenue.
              </p>
              <div className="text-sm text-orange-600 font-medium">
                Growing 180% annually
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Platform Violations</h3>
              <p className="text-gray-600 mb-4">
                Meta, Snap, and emerging AR platforms allowing unchecked commercial content on private property.
              </p>
              <div className="text-sm text-yellow-600 font-medium">
                Inadequate enforcement
              </div>
            </div>
          </div>

          <div className="mt-12 bg-red-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Act Now: First-Mover Advantage in Your Market
            </h3>
            <p className="text-xl mb-6">
              Property owners who register first establish legal precedent and command premium rates
            </p>
            <div className="text-3xl font-bold">
              $31.8 Billion AR Market by 2030
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Potential Revenue
            </h2>
            <p className="text-xl text-gray-600">
              See how much your property could earn from AR advertising rights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Property Details</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Height: {calculatorInputs.buildingHeight} feet
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    value={calculatorInputs.buildingHeight}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, buildingHeight: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50 ft</span>
                    <span>1,500 ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Foot Traffic: {formatNumber(calculatorInputs.footTraffic)}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={calculatorInputs.footTraffic}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, footTraffic: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1K</span>
                    <span>500K</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type
                  </label>
                  <select
                    value={calculatorInputs.location}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="suburban">Suburban</option>
                    <option value="urban">Urban</option>
                    <option value="premium">Premium (Times Square, etc.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of AR Zones: {calculatorInputs.zones}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={calculatorInputs.zones}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, zones: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 zone</span>
                    <span>12 zones</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Estimated Monthly Revenue</h3>

              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {formatCurrency(calculateRevenue())}
                </div>
                <div className="text-gray-600">per month</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Revenue:</span>
                  <span className="font-bold text-xl text-green-600">
                    {formatCurrency(calculateRevenue() * 12)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">5-Year Projection:</span>
                  <span className="font-bold text-xl text-blue-600">
                    {formatCurrency(calculateRevenue() * 12 * 5)}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Revenue Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Rate:</span>
                    <span className="font-medium">{formatCurrency(5000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height Bonus:</span>
                    <span className="font-medium">{(calculatorInputs.buildingHeight / 100).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Traffic Bonus:</span>
                    <span className="font-medium">{(calculatorInputs.footTraffic / 10000).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location Tier:</span>
                    <span className="font-medium">{calculatorInputs.location === 'premium' ? '3x' : calculatorInputs.location === 'urban' ? '2x' : '1x'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.scrollTo({top: document.getElementById('registration').offsetTop, behavior: 'smooth'})}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Claim These Rights Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Revenue Examples
            </h2>
            <p className="text-xl text-gray-600">
              See what property owners are earning from AR rights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="text-sm text-blue-600 font-medium mb-2">TIMES SQUARE TOWER</div>
                <h3 className="text-2xl font-bold text-gray-900">$2.1M Annually</h3>
              </div>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-medium">600 feet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Foot Traffic:</span>
                  <span className="font-medium">330K daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AR Zones:</span>
                  <span className="font-medium">8 zones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy:</span>
                  <span className="font-medium text-green-600">100%</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-xs text-gray-500 mb-2">Top Advertisers:</div>
                <div className="text-sm text-gray-700">Disney, Nike, Samsung, Coca-Cola</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="text-sm text-purple-600 font-medium mb-2">WESTFIELD MALL</div>
                <h3 className="text-2xl font-bold text-gray-900">$580K Annually</h3>
              </div>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Size:</span>
                  <span className="font-medium">2M sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Foot Traffic:</span>
                  <span className="font-medium">75K daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AR Zones:</span>
                  <span className="font-medium">12 zones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy:</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-xs text-gray-500 mb-2">Revenue Mix:</div>
                <div className="text-sm text-gray-700">Retail brands, restaurants, entertainment</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="text-sm text-orange-600 font-medium mb-2">DOWNTOWN OFFICE</div>
                <h3 className="text-2xl font-bold text-gray-900">$145K Annually</h3>
              </div>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-medium">280 feet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Foot Traffic:</span>
                  <span className="font-medium">25K daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AR Zones:</span>
                  <span className="font-medium">4 zones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy:</span>
                  <span className="font-medium text-yellow-600">75%</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-xs text-gray-500 mb-2">Growth Trajectory:</div>
                <div className="text-sm text-gray-700">+45% YoY, expanding to 6 zones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From registration to revenue in as little as 14 days
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Register Property',
                description: 'Complete our registration form with property details. Free assessment included.',
                icon: '📝',
                timeline: '1-2 days'
              },
              {
                step: 2,
                title: 'Define AR Zones',
                description: 'Our team maps your building and recommends optimal AR zone configuration.',
                icon: '📍',
                timeline: '3-5 days'
              },
              {
                step: 3,
                title: 'Approve Advertisers',
                description: 'Review advertiser applications and approve campaigns that align with your brand.',
                icon: '✅',
                timeline: '5-7 days'
              },
              {
                step: 4,
                title: 'Collect Revenue',
                description: 'Automatic monthly payments. Track performance in real-time dashboard.',
                icon: '💰',
                timeline: 'Ongoing'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="text-sm text-blue-600 font-medium">{item.timeline}</div>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200" style={{width: 'calc(100% - 4rem)'}}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Benefits Grid */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Protection + Maximum Revenue
            </h2>
            <p className="text-xl text-gray-600">
              Why property owners choose SpatialRights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Protection Column */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                <span className="text-3xl mr-3">🛡️</span>
                Protection Benefits
              </h3>
              <div className="space-y-4">
                {[
                  'Legal precedent establishment in your jurisdiction',
                  '24/7 automated monitoring for unauthorized AR content',
                  'Dedicated enforcement team with platform partnerships',
                  'Real-time violation alerts and takedown requests',
                  'DMCA-style protection framework for spatial rights',
                  'Geographic boundary enforcement (GPS precision)',
                  'Multi-platform compliance (Meta, Snap, Apple, Google)',
                  'Legal representation for rights violations'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Column */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                <span className="text-3xl mr-3">💰</span>
                Revenue Benefits
              </h3>
              <div className="space-y-4">
                {[
                  'Passive income requiring zero physical modifications',
                  'Multiple simultaneous advertisers across platforms',
                  'Dynamic pricing based on foot traffic and events',
                  'Premium placement auctions during high-demand periods',
                  'AI-powered revenue optimization algorithms',
                  'Seasonal rate adjustments (holidays, events)',
                  'Direct monthly deposits with transparent reporting',
                  'Fractional ownership options for investors'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Register Your Property Now
            </h2>
            <p className="text-xl text-gray-600">
              Free assessment • No obligation • Response within 24 hours
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {formStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Property Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Empire State Building"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="350 Fifth Avenue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Type
                  </label>
                  <select
                    name="buildingType"
                    value={formData.buildingType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select building type</option>
                    <option value="office">Office Building</option>
                    <option value="retail">Retail/Shopping Center</option>
                    <option value="mixed_use">Mixed Use</option>
                    <option value="hotel">Hotel/Hospitality</option>
                    <option value="residential">Residential</option>
                    <option value="sports_venue">Sports Venue/Arena</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building Height (feet)
                    </label>
                    <input
                      type="number"
                      name="buildingHeight"
                      value={formData.buildingHeight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Floors
                    </label>
                    <input
                      type="number"
                      name="floors"
                      value={formData.floors}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="25"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Daily Foot Traffic
                  </label>
                  <select
                    name="footTraffic"
                    value={formData.footTraffic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select foot traffic range</option>
                    <option value="1000-5000">1,000 - 5,000</option>
                    <option value="5000-25000">5,000 - 25,000</option>
                    <option value="25000-100000">25,000 - 100,000</option>
                    <option value="100000+">100,000+</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue to Owner Information →
                </button>
              </div>
            )}

            {formStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Owner Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner/Contact Name
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof of Ownership
                  </label>
                  <select
                    name="ownershipProof"
                    value={formData.ownershipProof}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select document type</option>
                    <option value="deed">Property Deed</option>
                    <option value="title">Title Document</option>
                    <option value="management">Management Agreement</option>
                    <option value="other">Other (will provide later)</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Document upload will be requested after initial review
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Physical Advertising
                  </label>
                  <textarea
                    name="currentAdvertising"
                    value={formData.currentAdvertising}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe any existing billboards, signage, or advertising contracts"
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue to Protection Options →
                </button>

                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full text-blue-600 py-2 font-medium hover:text-blue-700"
                >
                  ← Back
                </button>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Protection Level</h3>

                <div className="space-y-4">
                  <label className="block p-6 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="enforcementLevel"
                      value="basic"
                      checked={formData.enforcementLevel === 'basic'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-semibold text-lg">Basic Protection (Included Free)</span>
                    <p className="text-gray-600 mt-2 ml-7">
                      Registration, rights documentation, violation reporting. Best for smaller properties or those new to AR rights.
                    </p>
                  </label>

                  <label className="block p-6 border-2 border-blue-300 bg-blue-50 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="enforcementLevel"
                      value="standard"
                      checked={formData.enforcementLevel === 'standard'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-semibold text-lg">Standard Protection (Recommended)</span>
                    <p className="text-gray-600 mt-2 ml-7">
                      24/7 monitoring, automated takedowns, platform partnerships, monthly reports. Covers 95% of violation scenarios.
                    </p>
                    <span className="inline-block ml-7 mt-2 text-sm text-blue-600 font-medium">Most Popular Choice</span>
                  </label>

                  <label className="block p-6 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="enforcementLevel"
                      value="premium"
                      checked={formData.enforcementLevel === 'premium'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-semibold text-lg">Premium Protection</span>
                    <p className="text-gray-600 mt-2 ml-7">
                      Everything in Standard plus dedicated legal counsel, litigation support, brand reputation monitoring, priority response. For high-value properties.
                    </p>
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">⚠️ Important Note on Unauthorized Use</h4>
                  <p className="text-gray-700 text-sm">
                    If AR advertising is currently being displayed on your property without authorization, check your email after submission.
                    We'll provide immediate guidance on violation documentation and takedown procedures. Most unauthorized content can be
                    removed within 48-72 hours once proper rights are established.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                >
                  Submit Registration →
                </button>

                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full text-blue-600 py-2 font-medium hover:text-blue-700"
                >
                  ← Back
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                  We'll respond within 24 hours with a free property assessment.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'What if someone is already displaying AR ads on my building?',
                a: 'This is AR squatting and it\'s exactly why you need to register now. Once you establish rights through our platform, we can issue takedown notices and pursue legal remedies for past violations. Most unauthorized content is removed within 48-72 hours.'
              },
              {
                q: 'How much can I realistically earn?',
                a: 'Revenue varies based on location, building size, and foot traffic. Typical ranges: Small commercial buildings ($20K-50K annually), Mid-size office buildings ($50K-200K annually), Large urban properties ($200K-500K annually), Premium locations like Times Square ($1M-5M annually). Use our calculator above for your specific property.'
              },
              {
                q: 'What legal rights do I have to AR space around my building?',
                a: 'AR rights are similar to air rights in real estate law. As a property owner, you have the right to control virtual content displayed on your property, just as you control physical signage. Our legal framework establishes precedent and provides enforcement mechanisms. We\'re pioneering this area of law and already have successful takedown cases.'
              },
              {
                q: 'Do I need to make any physical changes to my building?',
                a: 'No. AR advertising exists only in augmented reality apps and devices. There are zero physical modifications required. Your building remains unchanged while earning revenue from virtual advertising rights.'
              },
              {
                q: 'How is enforcement handled?',
                a: 'We use automated monitoring systems to detect unauthorized AR content on your property. When violations occur, we issue immediate takedown requests to platforms (Meta, Snap, Apple, Google) through our partnership agreements. For persistent violators, our legal team pursues formal enforcement including cease and desist letters and litigation if necessary.'
              },
              {
                q: 'Can I approve which advertisers use my property?',
                a: 'Absolutely. You maintain full control over which brands advertise on your building. All advertiser applications require your approval. You can set category restrictions (no alcohol, no competing brands, etc.) and review creative content before it goes live.'
              },
              {
                q: 'What happens if I already have physical billboard contracts?',
                a: 'AR rights are separate from physical advertising rights. Your existing billboard contracts remain unchanged. In fact, many property owners coordinate AR and physical advertising for premium advertisers, commanding even higher rates for integrated campaigns.'
              },
              {
                q: 'How long does it take to start earning revenue?',
                a: 'After registration and property verification (1-2 weeks), we begin marketing your AR zones immediately. First bookings typically occur within 30-60 days, though high-demand properties in premium locations can be booked within days. Revenue compounds as you build a track record with advertisers.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Don't Let Others Profit From Your Property
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Establish your AR rights now and start earning revenue within 30 days
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => window.scrollTo({top: document.getElementById('registration').offsetTop, behavior: 'smooth'})}
              className="bg-white text-purple-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Register Your Property Now
            </button>
            <Link
              href="/properties"
              className="text-white border-2 border-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              See Active Properties
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free Assessment
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Obligation
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              24hr Response
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

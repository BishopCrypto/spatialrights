import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Export createClient function for API routes
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Helper functions for data fetching
export async function getAllProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      ar_zones (
        id,
        zone_name,
        zone_type,
        availability_status,
        base_price_monthly,
        premium_multiplier
      )
    `)
    .order('building_name')

  if (error) {
    console.error('Error fetching properties:', error)
    return []
  }

  return data
}

export async function getPropertyById(id) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      ar_zones (
        id,
        zone_name,
        zone_type,
        facade_direction,
        width_feet,
        height_feet,
        base_price_monthly,
        premium_multiplier,
        availability_status,
        visibility_score,
        traffic_exposure_score,
        content_restrictions
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching property:', error)
    return null
  }

  return data
}

export async function getZoneById(id) {
  const { data, error } = await supabase
    .from('ar_zones')
    .select(`
      *,
      properties (
        building_name,
        address,
        city,
        state,
        owner_name
      ),
      bookings (
        id,
        advertiser_name,
        campaign_name,
        start_date,
        end_date,
        booking_status
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching zone:', error)
    return null
  }

  return data
}

export async function getActiveBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      ar_zones (
        zone_name,
        properties (
          building_name,
          city,
          state
        )
      )
    `)
    .in('booking_status', ['active', 'confirmed'])
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }

  return data
}

export async function getZoneAnalytics(zoneId, days = 30) {
  const { data, error } = await supabase
    .from('zone_analytics')
    .select('*')
    .eq('zone_id', zoneId)
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching analytics:', error)
    return []
  }

  return data
}

export async function getInvestmentProducts() {
  const { data, error } = await supabase
    .from('investment_products')
    .select('*')
    .eq('status', 'active')
    .order('total_value', { ascending: false })

  if (error) {
    console.error('Error fetching investment products:', error)
    return []
  }

  return data
}

// Utility functions
export function calculateZoneRevenue(zone, property) {
  const baseRevenue = zone.base_price_monthly
  const multiplier = zone.premium_multiplier || 1.0
  const tierMultiplier = property.market_tier === 1 ? 1.5 : property.market_tier === 2 ? 1.0 : 0.7
  const visibilityMultiplier = (property.visibility_score || 8) / 10

  return Math.round(baseRevenue * multiplier * tierMultiplier * visibilityMultiplier)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number)
}

export function getStandardSizeInfo(zoneType) {
  const sizes = {
    'bulletin': {
      name: 'Bulletin',
      dimensions: '14\' × 48\'',
      description: 'Large format billboard - maximum impact'
    },
    '30-sheet': {
      name: '30-Sheet Poster',
      dimensions: '12\'3" × 24\'6"',
      description: 'Standard urban billboard format'
    },
    '6-sheet': {
      name: '6-Sheet',
      dimensions: '4\' × 6\'',
      description: 'Small format for high-frequency locations'
    },
    'custom': {
      name: 'Custom Size',
      dimensions: 'Variable',
      description: 'Specialized displays and unique formats'
    },
    'entrance': {
      name: 'Entrance Zone',
      dimensions: 'Variable',
      description: 'High-engagement entrance areas'
    }
  }

  return sizes[zoneType] || sizes['custom']
}
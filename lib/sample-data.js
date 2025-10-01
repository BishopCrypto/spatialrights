// Sample data for AR Property Rights platform demo
// This will be replaced with real Supabase data once connection is working

export const properties = [
  {
    id: 'empire-state-building',
    building_name: 'Empire State Building',
    address: '350 5th Ave',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7484, lng: -73.9857 },
    building_height_feet: 1454,
    total_facade_area_sqft: 45000,
    floors: 102,
    year_built: 1931,
    building_type: 'office',
    foot_traffic_daily: 50000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'Empire State Realty Trust',
    status: 'active',
    image_url: '/images/empire-state-building.jpg',
    description: 'The iconic Empire State Building offers premium AR advertising opportunities with unmatched visibility in Manhattan.',
    total_monthly_revenue: 580000
  },
  {
    id: 'times-square-billboard',
    building_name: 'Times Square Billboard Building',
    address: '1 Times Square',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7580, lng: -73.9857 },
    building_height_feet: 395,
    total_facade_area_sqft: 25000,
    floors: 25,
    year_built: 1904,
    building_type: 'mixed_use',
    foot_traffic_daily: 150000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'Jamestown Properties',
    status: 'active',
    image_url: '/images/times-square-building.jpg',
    description: 'Prime Times Square location with the highest foot traffic and visibility in NYC.',
    total_monthly_revenue: 850000
  },
  {
    id: 'apple-fifth-avenue',
    building_name: 'Apple Fifth Avenue',
    address: '767 5th Ave',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7640, lng: -73.9736 },
    building_height_feet: 32,
    total_facade_area_sqft: 8500,
    floors: 2,
    year_built: 2019,
    building_type: 'retail',
    foot_traffic_daily: 25000,
    visibility_score: 9,
    market_tier: 1,
    owner_name: 'Apple Inc.',
    status: 'active',
    image_url: '/images/apple-fifth-avenue.jpg',
    description: 'Premium retail location with luxury brand alignment and high-end customer demographics.',
    total_monthly_revenue: 320000
  },
  {
    id: 'salesforce-tower-sf',
    building_name: 'Salesforce Tower',
    address: '415 Mission St',
    city: 'San Francisco',
    state: 'CA',
    coordinates: { lat: 37.7897, lng: -122.3972 },
    building_height_feet: 1070,
    total_facade_area_sqft: 38000,
    floors: 61,
    year_built: 2018,
    building_type: 'office',
    foot_traffic_daily: 35000,
    visibility_score: 9,
    market_tier: 1,
    owner_name: 'Boston Properties',
    status: 'active',
    image_url: '/images/salesforce-tower.jpg',
    description: 'San Francisco\'s tallest building with prime downtown visibility and tech industry presence.',
    total_monthly_revenue: 450000
  },
  {
    id: 'willis-tower-chicago',
    building_name: 'Willis Tower',
    address: '233 S Wacker Dr',
    city: 'Chicago',
    state: 'IL',
    coordinates: { lat: 41.8789, lng: -87.6359 },
    building_height_feet: 1450,
    total_facade_area_sqft: 42000,
    floors: 108,
    year_built: 1973,
    building_type: 'office',
    foot_traffic_daily: 40000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'Blackstone Group',
    status: 'active',
    image_url: '/images/willis-tower.jpg',
    description: 'Iconic Chicago landmark with unparalleled visibility across the city skyline.',
    total_monthly_revenue: 520000
  },
  {
    id: 'staples-center-la',
    building_name: 'Crypto.com Arena',
    address: '1111 S Figueroa St',
    city: 'Los Angeles',
    state: 'CA',
    coordinates: { lat: 34.0430, lng: -118.2673 },
    building_height_feet: 150,
    total_facade_area_sqft: 55000,
    floors: 6,
    year_built: 1999,
    building_type: 'arena',
    foot_traffic_daily: 80000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'AEG',
    status: 'active',
    image_url: '/images/crypto-arena.jpg',
    description: 'Premier sports and entertainment venue with massive event-driven foot traffic.',
    total_monthly_revenue: 680000
  },
  {
    id: 'freedom-tower-nyc',
    building_name: 'One World Trade Center',
    address: '285 Fulton St',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7127, lng: -74.0134 },
    building_height_feet: 1776,
    total_facade_area_sqft: 48000,
    floors: 94,
    year_built: 2014,
    building_type: 'office',
    foot_traffic_daily: 45000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'Port Authority of NY & NJ',
    status: 'active',
    image_url: '/images/one-world-trade.jpg',
    description: 'America\'s tallest building with symbolic significance and maximum NYC visibility.',
    total_monthly_revenue: 620000
  },
  {
    id: 'chrysler-building',
    building_name: 'Chrysler Building',
    address: '405 Lexington Ave',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7516, lng: -73.9756 },
    building_height_feet: 1046,
    total_facade_area_sqft: 35000,
    floors: 77,
    year_built: 1930,
    building_type: 'office',
    foot_traffic_daily: 32000,
    visibility_score: 9,
    market_tier: 1,
    owner_name: 'Aby Rosen',
    status: 'active',
    image_url: '/images/chrysler-building.jpg',
    description: 'Art Deco masterpiece with distinctive spire, offering premium AR advertising on iconic architecture.',
    total_monthly_revenue: 420000
  },
  {
    id: 'flatiron-building',
    building_name: 'Flatiron Building',
    address: '175 5th Ave',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7411, lng: -73.9897 },
    building_height_feet: 285,
    total_facade_area_sqft: 18000,
    floors: 22,
    year_built: 1902,
    building_type: 'office',
    foot_traffic_daily: 38000,
    visibility_score: 9,
    market_tier: 1,
    owner_name: 'Sorgente Group',
    status: 'active',
    image_url: '/images/flatiron-building.jpg',
    description: 'Triangular landmark at one of NYC\'s busiest intersections with 360-degree visibility.',
    total_monthly_revenue: 380000
  },
  {
    id: 'madison-square-garden',
    building_name: 'Madison Square Garden',
    address: '4 Pennsylvania Plaza',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7505, lng: -73.9934 },
    building_height_feet: 150,
    total_facade_area_sqft: 45000,
    floors: 7,
    year_built: 1968,
    building_type: 'arena',
    foot_traffic_daily: 65000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'MSG Entertainment',
    status: 'active',
    image_url: '/images/madison-square-garden.jpg',
    description: 'World\'s most famous arena with massive event traffic and Penn Station adjacency.',
    total_monthly_revenue: 720000
  },
  {
    id: 'miami-beach-convention',
    building_name: 'Miami Beach Convention Center',
    address: '1901 Convention Center Dr',
    city: 'Miami Beach',
    state: 'FL',
    coordinates: { lat: 25.7936, lng: -80.1363 },
    building_height_feet: 85,
    total_facade_area_sqft: 62000,
    floors: 4,
    year_built: 2018,
    building_type: 'convention_center',
    foot_traffic_daily: 55000,
    visibility_score: 8,
    market_tier: 2,
    owner_name: 'City of Miami Beach',
    status: 'active',
    image_url: '/images/miami-beach-convention.jpg',
    description: 'Major convention destination with high-value business and tourist demographics.',
    total_monthly_revenue: 340000
  },
  {
    id: 'seattle-space-needle',
    building_name: 'Space Needle',
    address: '400 Broad St',
    city: 'Seattle',
    state: 'WA',
    coordinates: { lat: 47.6205, lng: -122.3493 },
    building_height_feet: 605,
    total_facade_area_sqft: 15000,
    floors: 12,
    year_built: 1962,
    building_type: 'observation_tower',
    foot_traffic_daily: 28000,
    visibility_score: 10,
    market_tier: 1,
    owner_name: 'Space Needle LLC',
    status: 'active',
    image_url: '/images/space-needle.jpg',
    description: 'Seattle\'s most recognizable landmark with panoramic city visibility.',
    total_monthly_revenue: 390000
  },
  {
    id: 'brooklyn-coffee-shop',
    building_name: 'Brooklyn Artisan Coffee',
    address: '234 Bedford Ave',
    city: 'Brooklyn',
    state: 'NY',
    coordinates: { lat: 40.7148, lng: -73.9619 },
    building_height_feet: 45,
    total_facade_area_sqft: 1200,
    floors: 3,
    year_built: 1920,
    building_type: 'retail',
    foot_traffic_daily: 8000,
    visibility_score: 6,
    market_tier: 3,
    owner_name: 'Independent Retail',
    status: 'active',
    image_url: '/images/brooklyn-coffee.jpg',
    description: 'Trendy Williamsburg location targeting millennial and Gen-Z demographics.',
    total_monthly_revenue: 45000
  }
];

export const arZones = [
  // Empire State Building zones
  {
    id: 'esb-north-facade',
    property_id: 'empire-state-building',
    zone_name: 'North Facade Premium',
    zone_type: 'bulletin',
    facade_direction: 'north',
    width_feet: 48.0,
    height_feet: 14.0,
    square_footage: 672,
    base_price_monthly: 250000,
    premium_multiplier: 1.5,
    availability_status: 'available',
    visibility_score: 10,
    traffic_exposure_score: 10,
    description: 'Prime north-facing billboard space with Central Park views and maximum visibility.',
    standard_size: '14\' × 48\' (Bulletin)',
    engagement_rate: 0.085
  },
  {
    id: 'esb-south-facade',
    property_id: 'empire-state-building',
    zone_name: 'South Facade Standard',
    zone_type: 'bulletin',
    facade_direction: 'south',
    width_feet: 48.0,
    height_feet: 14.0,
    square_footage: 672,
    base_price_monthly: 180000,
    premium_multiplier: 1.2,
    availability_status: 'available',
    visibility_score: 8,
    traffic_exposure_score: 8,
    description: 'South-facing billboard with high visibility from downtown Manhattan.',
    standard_size: '14\' × 48\' (Bulletin)',
    engagement_rate: 0.072
  },
  {
    id: 'esb-entrance-zone',
    property_id: 'empire-state-building',
    zone_name: 'Main Entrance Zone',
    zone_type: 'entrance',
    facade_direction: 'entrance',
    width_feet: 22.0,
    height_feet: 10.0,
    square_footage: 220,
    base_price_monthly: 150000,
    premium_multiplier: 1.8,
    availability_status: 'booked',
    visibility_score: 9,
    traffic_exposure_score: 10,
    description: 'High-impact entrance advertising with close visitor proximity.',
    standard_size: '10\' × 22\' (Custom)',
    engagement_rate: 0.125,
    current_booking: {
      advertiser: 'Nike Inc.',
      campaign: 'Air Jordan Launch',
      end_date: '2024-12-31'
    }
  },

  // Times Square building zones
  {
    id: 'ts-led-wall',
    property_id: 'times-square-billboard',
    zone_name: 'Times Square LED Wall',
    zone_type: 'custom',
    facade_direction: 'north',
    width_feet: 68.0,
    height_feet: 42.0,
    square_footage: 2856,
    base_price_monthly: 500000,
    premium_multiplier: 2.0,
    availability_status: 'available',
    visibility_score: 10,
    traffic_exposure_score: 10,
    description: 'Massive LED wall facing the heart of Times Square with maximum exposure.',
    standard_size: '42\' × 68\' (Custom LED)',
    engagement_rate: 0.15
  },
  {
    id: 'ts-street-level',
    property_id: 'times-square-billboard',
    zone_name: 'Street Level Display',
    zone_type: '30-sheet',
    facade_direction: 'west',
    width_feet: 24.5,
    height_feet: 12.25,
    square_footage: 300,
    base_price_monthly: 350000,
    premium_multiplier: 1.8,
    availability_status: 'available',
    visibility_score: 10,
    traffic_exposure_score: 10,
    description: 'Eye-level street display with pedestrian engagement focus.',
    standard_size: '12.25\' × 24.5\' (30-Sheet)',
    engagement_rate: 0.11
  },

  // Apple Fifth Avenue zones
  {
    id: 'apple-window-display',
    property_id: 'apple-fifth-avenue',
    zone_name: 'Fifth Avenue Window Display',
    zone_type: '6-sheet',
    facade_direction: 'east',
    width_feet: 12.0,
    height_feet: 6.0,
    square_footage: 72,
    base_price_monthly: 85000,
    premium_multiplier: 1.4,
    availability_status: 'available',
    visibility_score: 9,
    traffic_exposure_score: 8,
    description: 'Premium window display space on Fifth Avenue with luxury brand alignment.',
    standard_size: '6\' × 12\' (6-Sheet)',
    engagement_rate: 0.095
  },
  {
    id: 'apple-entrance-premium',
    property_id: 'apple-fifth-avenue',
    zone_name: 'Store Entrance Premium',
    zone_type: 'custom',
    facade_direction: 'entrance',
    width_feet: 8.0,
    height_feet: 10.0,
    square_footage: 80,
    base_price_monthly: 120000,
    premium_multiplier: 1.6,
    availability_status: 'available',
    visibility_score: 8,
    traffic_exposure_score: 9,
    description: 'High-end entrance advertising space targeting Apple Store visitors.',
    standard_size: '10\' × 8\' (Custom)',
    engagement_rate: 0.13
  }
];

export const recentBookings = [
  {
    id: 'booking-1',
    zone_id: 'esb-entrance-zone',
    advertiser_name: 'Nike Inc.',
    campaign_name: 'Air Jordan Launch',
    start_date: '2024-10-01',
    end_date: '2024-12-31',
    monthly_rate: 150000,
    total_amount: 450000,
    status: 'active'
  },
  {
    id: 'booking-2',
    zone_id: 'ts-street-level',
    advertiser_name: 'Disney Studios',
    campaign_name: 'Marvel Movie Premiere',
    start_date: '2024-11-15',
    end_date: '2024-12-15',
    monthly_rate: 350000,
    total_amount: 350000,
    status: 'confirmed'
  }
];

// Standard OOH advertising size definitions
export const standardSizes = {
  'bulletin': {
    name: 'Bulletin',
    dimensions: '14\' × 48\'',
    square_feet: 672,
    description: 'Large format highway billboard - maximum impact',
    typical_price_range: '$150K - $500K/month'
  },
  '30-sheet': {
    name: '30-Sheet Poster',
    dimensions: '12\'3\" × 24\'6\"',
    square_feet: 300,
    description: 'Standard urban billboard format',
    typical_price_range: '$75K - $350K/month'
  },
  '6-sheet': {
    name: '6-Sheet',
    dimensions: '4\' × 6\'',
    square_feet: 24,
    description: 'Small format for bus stops and retail',
    typical_price_range: '$25K - $100K/month'
  },
  'custom': {
    name: 'Custom Size',
    dimensions: 'Variable',
    square_feet: 'Variable',
    description: 'Specialized displays and unique formats',
    typical_price_range: '$50K - $1M+/month'
  },
  'entrance': {
    name: 'Entrance Zone',
    dimensions: 'Variable',
    square_feet: 'Variable',
    description: 'High-engagement entrance and lobby areas',
    typical_price_range: '$100K - $400K/month'
  }
};

// Market tier definitions
export const marketTiers = {
  1: {
    name: 'Premium',
    description: 'Tier 1 landmarks and iconic locations',
    multiplier: 1.5,
    examples: ['Times Square', 'Empire State Building', 'Hollywood Sign']
  },
  2: {
    name: 'Standard',
    description: 'High-traffic commercial areas',
    multiplier: 1.0,
    examples: ['Downtown business districts', 'Major shopping centers']
  },
  3: {
    name: 'Secondary',
    description: 'Suburban and secondary market locations',
    multiplier: 0.7,
    examples: ['Suburban malls', 'Secondary city centers']
  }
};

// Helper functions
export function getPropertyById(id) {
  return properties.find(p => p.id === id);
}

export function getZonesByProperty(propertyId) {
  return arZones.filter(z => z.property_id === propertyId);
}

export function getZoneById(id) {
  return arZones.find(z => z.id === id);
}

export function calculateZoneRevenue(zone) {
  const baseRevenue = zone.base_price_monthly;
  const multiplier = zone.premium_multiplier;
  const property = getPropertyById(zone.property_id);
  const tierMultiplier = marketTiers[property.market_tier].multiplier;
  const visibilityMultiplier = property.visibility_score / 10;

  return Math.round(baseRevenue * multiplier * tierMultiplier * visibilityMultiplier);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSquareFeet(sqft) {
  return new Intl.NumberFormat('en-US').format(sqft) + ' sq ft';
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}
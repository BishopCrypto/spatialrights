-- SpatialRights Database Schema
-- AR Property Rights Management Platform

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Properties table - Core building information
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address TEXT NOT NULL,
  building_name TEXT,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT DEFAULT 'US',

  -- Geospatial data
  coordinates GEOGRAPHY(POINT, 4326),
  building_footprint GEOGRAPHY(POLYGON, 4326),

  -- Physical characteristics
  building_height_feet INTEGER,
  total_facade_area_sqft INTEGER,
  floors INTEGER,
  year_built INTEGER,
  building_type TEXT, -- 'office', 'retail', 'mixed_use', 'residential', etc.

  -- Market data
  foot_traffic_daily INTEGER,
  visibility_score INTEGER CHECK (visibility_score >= 1 AND visibility_score <= 10),
  market_tier INTEGER CHECK (market_tier >= 1 AND market_tier <= 3), -- 1=Premium, 2=Standard, 3=Secondary

  -- Ownership & status
  owner_name TEXT,
  owner_email TEXT,
  owner_phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'active', 'inactive')),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Search optimization
  search_vector TSVECTOR
);

-- AR Zones table - Specific advertising zones on buildings
CREATE TABLE ar_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,

  -- Zone identification
  zone_name TEXT NOT NULL, -- 'North Facade', 'Main Entrance', 'Rooftop', etc.
  zone_type TEXT NOT NULL CHECK (zone_type IN ('bulletin', '30-sheet', '6-sheet', 'custom', 'entrance', 'rooftop')),
  facade_direction TEXT CHECK (facade_direction IN ('north', 'south', 'east', 'west', 'rooftop', 'entrance')),

  -- Physical dimensions (standardized sizes)
  width_feet DECIMAL(8,2) NOT NULL,
  height_feet DECIMAL(8,2) NOT NULL,
  square_footage DECIMAL(10,2) GENERATED ALWAYS AS (width_feet * height_feet) STORED,

  -- Zone boundaries (for AR placement precision)
  zone_boundaries GEOGRAPHY(POLYGON, 4326),
  elevation_feet DECIMAL(8,2), -- Height above ground level

  -- Pricing & availability
  base_price_monthly INTEGER NOT NULL, -- Price in cents
  premium_multiplier DECIMAL(3,2) DEFAULT 1.0, -- For corner lots, high traffic, etc.
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'booked', 'maintenance', 'reserved')),

  -- Performance metrics
  visibility_score INTEGER CHECK (visibility_score >= 1 AND visibility_score <= 10),
  traffic_exposure_score INTEGER CHECK (traffic_exposure_score >= 1 AND traffic_exposure_score <= 10),
  engagement_rate DECIMAL(5,4), -- Historical AR content engagement rate

  -- Restrictions
  content_restrictions JSONB, -- Allowed content types, time restrictions, etc.
  max_booking_duration_months INTEGER DEFAULT 12,
  min_booking_duration_months INTEGER DEFAULT 1,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table - AR advertising reservations
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id UUID REFERENCES ar_zones(id) ON DELETE CASCADE,

  -- Client information
  advertiser_name TEXT NOT NULL,
  advertiser_email TEXT NOT NULL,
  advertiser_phone TEXT,
  company_name TEXT,

  -- Campaign details
  campaign_name TEXT NOT NULL,
  campaign_description TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('brand_awareness', 'product_launch', 'event_promotion', 'retail_sales', 'other')),

  -- Booking period
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration_months INTEGER GENERATED ALWAYS AS (
    EXTRACT(EPOCH FROM (end_date - start_date)) / (30.44 * 24 * 3600)
  ) STORED,

  -- Pricing
  monthly_rate INTEGER NOT NULL, -- Price in cents
  total_amount INTEGER GENERATED ALWAYS AS (monthly_rate * duration_months) STORED,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  final_amount INTEGER,

  -- Payment & status
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded', 'failed')),
  booking_status TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),

  -- Contract & legal
  contract_signed BOOLEAN DEFAULT FALSE,
  contract_url TEXT,
  terms_accepted BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure no overlapping bookings for same zone
  CONSTRAINT no_overlapping_bookings EXCLUDE USING gist (
    zone_id WITH =,
    daterange(start_date, end_date, '[]') WITH &&
  ) WHERE (booking_status != 'cancelled')
);

-- Pricing History table - Track pricing changes over time
CREATE TABLE pricing_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id UUID REFERENCES ar_zones(id) ON DELETE CASCADE,

  old_price INTEGER,
  new_price INTEGER NOT NULL,
  price_change_reason TEXT,
  effective_date DATE NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table - Track performance metrics
CREATE TABLE zone_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id UUID REFERENCES ar_zones(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,

  -- Date tracking
  date DATE NOT NULL,

  -- Engagement metrics
  ar_views INTEGER DEFAULT 0,
  unique_viewers INTEGER DEFAULT 0,
  interaction_count INTEGER DEFAULT 0,
  average_view_duration_seconds DECIMAL(8,2),

  -- Traffic metrics
  foot_traffic_count INTEGER DEFAULT 0,
  vehicle_traffic_count INTEGER DEFAULT 0,

  -- Performance scores
  engagement_rate DECIMAL(5,4),
  conversion_rate DECIMAL(5,4),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(zone_id, date)
);

-- Investment Products table - For investment/REIT functionality
CREATE TABLE investment_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('reit_share', 'fractional_ownership', 'growth_fund', 'fixed_income')),

  -- Associated properties
  property_ids UUID[], -- Array of property IDs included in this investment

  -- Investment details
  total_value INTEGER NOT NULL, -- In cents
  shares_outstanding INTEGER,
  price_per_share INTEGER,
  minimum_investment INTEGER,

  -- Returns
  target_annual_return DECIMAL(5,2),
  dividend_frequency TEXT CHECK (dividend_frequency IN ('monthly', 'quarterly', 'annual')),

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'suspended')),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_properties_coordinates ON properties USING GIST (coordinates);
CREATE INDEX idx_properties_search ON properties USING GIN (search_vector);
CREATE INDEX idx_properties_city_state ON properties (city, state);
CREATE INDEX idx_properties_market_tier ON properties (market_tier);
CREATE INDEX idx_properties_status ON properties (status);

CREATE INDEX idx_zones_property_id ON ar_zones (property_id);
CREATE INDEX idx_zones_availability ON ar_zones (availability_status);
CREATE INDEX idx_zones_zone_type ON ar_zones (zone_type);
CREATE INDEX idx_zones_boundaries ON ar_zones USING GIST (zone_boundaries);

CREATE INDEX idx_bookings_zone_id ON bookings (zone_id);
CREATE INDEX idx_bookings_dates ON bookings (start_date, end_date);
CREATE INDEX idx_bookings_status ON bookings (booking_status);
CREATE INDEX idx_bookings_advertiser ON bookings (advertiser_email);

CREATE INDEX idx_analytics_zone_date ON zone_analytics (zone_id, date);
CREATE INDEX idx_analytics_booking ON zone_analytics (booking_id);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION update_property_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    COALESCE(NEW.building_name, '') || ' ' ||
    COALESCE(NEW.address, '') || ' ' ||
    COALESCE(NEW.city, '') || ' ' ||
    COALESCE(NEW.state, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
CREATE TRIGGER update_property_search_trigger
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_property_search_vector();

-- Function to calculate zone revenue potential
CREATE OR REPLACE FUNCTION calculate_zone_revenue_potential(zone_id UUID)
RETURNS INTEGER AS $$
DECLARE
  zone_record ar_zones%ROWTYPE;
  property_record properties%ROWTYPE;
  base_revenue INTEGER;
  multiplier DECIMAL;
BEGIN
  SELECT * INTO zone_record FROM ar_zones WHERE id = zone_id;
  SELECT * INTO property_record FROM properties WHERE id = zone_record.property_id;

  base_revenue := zone_record.base_price_monthly;
  multiplier := zone_record.premium_multiplier;

  -- Apply market tier multiplier
  CASE property_record.market_tier
    WHEN 1 THEN multiplier := multiplier * 1.5; -- Premium market
    WHEN 2 THEN multiplier := multiplier * 1.0; -- Standard market
    WHEN 3 THEN multiplier := multiplier * 0.7; -- Secondary market
  END CASE;

  -- Apply visibility score multiplier
  multiplier := multiplier * (property_record.visibility_score / 10.0);

  RETURN (base_revenue * multiplier)::INTEGER;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) setup
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (property owners, admins)
CREATE POLICY "Properties viewable by all" ON properties FOR SELECT USING (true);
CREATE POLICY "Zones viewable by all" ON ar_zones FOR SELECT USING (true);
CREATE POLICY "Bookings viewable by all" ON bookings FOR SELECT USING (true);

-- Insert sample data for demonstration
INSERT INTO properties (
  building_name, address, city, state, coordinates,
  building_height_feet, total_facade_area_sqft, floors, year_built, building_type,
  foot_traffic_daily, visibility_score, market_tier,
  owner_name, owner_email, status
) VALUES
(
  'Empire State Building', '350 5th Ave', 'New York', 'NY',
  ST_GeogFromText('POINT(-73.9857 40.7484)'),
  1454, 45000, 102, 1931, 'office',
  50000, 10, 1,
  'Empire State Realty Trust', 'info@esrtreit.com', 'active'
),
(
  'Times Square Billboard Building', '1 Times Square', 'New York', 'NY',
  ST_GeogFromText('POINT(-73.9857 40.7580)'),
  395, 25000, 25, 1904, 'mixed_use',
  150000, 10, 1,
  'Jamestown Properties', 'contact@jamestownlp.com', 'active'
),
(
  'Apple Fifth Avenue', '767 5th Ave', 'New York', 'NY',
  ST_GeogFromText('POINT(-73.9736 40.7640)'),
  32, 8500, 2, 2019, 'retail',
  25000, 9, 1,
  'Apple Inc.', 'realestate@apple.com', 'active'
);

-- Sample AR zones for Empire State Building
INSERT INTO ar_zones (
  property_id, zone_name, zone_type, facade_direction,
  width_feet, height_feet, base_price_monthly, premium_multiplier,
  availability_status, visibility_score, traffic_exposure_score
) VALUES
(
  (SELECT id FROM properties WHERE building_name = 'Empire State Building'),
  'North Facade Premium', 'bulletin', 'north',
  48.0, 14.0, 250000, 1.5, 'available', 10, 10
),
(
  (SELECT id FROM properties WHERE building_name = 'Empire State Building'),
  'South Facade Standard', 'bulletin', 'south',
  48.0, 14.0, 180000, 1.2, 'available', 8, 8
),
(
  (SELECT id FROM properties WHERE building_name = 'Empire State Building'),
  'Main Entrance Zone', 'entrance', 'entrance',
  22.0, 10.0, 150000, 1.8, 'available', 9, 10
);

-- Sample AR zones for Times Square building
INSERT INTO ar_zones (
  property_id, zone_name, zone_type, facade_direction,
  width_feet, height_feet, base_price_monthly, premium_multiplier,
  availability_status, visibility_score, traffic_exposure_score
) VALUES
(
  (SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building'),
  'Times Square LED Wall', 'custom', 'north',
  68.0, 42.0, 500000, 2.0, 'available', 10, 10
),
(
  (SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building'),
  'Street Level Display', '30-sheet', 'west',
  24.5, 12.25, 350000, 1.8, 'available', 10, 10
);

-- Sample booking
INSERT INTO bookings (
  zone_id, advertiser_name, advertiser_email, company_name,
  campaign_name, campaign_description, content_type,
  start_date, end_date, monthly_rate, final_amount,
  payment_status, booking_status
) VALUES
(
  (SELECT id FROM ar_zones WHERE zone_name = 'Main Entrance Zone'),
  'John Smith', 'john.smith@nike.com', 'Nike Inc.',
  'Air Jordan Launch', 'New Air Jordan shoe launch campaign', 'product_launch',
  '2024-10-01', '2024-12-31', 150000, 450000,
  'paid', 'confirmed'
);

-- Comments for documentation
COMMENT ON TABLE properties IS 'Core building/property information for AR rights management';
COMMENT ON TABLE ar_zones IS 'Specific advertising zones within properties with standardized dimensions';
COMMENT ON TABLE bookings IS 'AR advertising campaign reservations and contracts';
COMMENT ON TABLE zone_analytics IS 'Performance tracking for AR zones and campaigns';
COMMENT ON TABLE investment_products IS 'Investment vehicles for AR property rights (REITs, funds, etc.)';

COMMENT ON COLUMN ar_zones.zone_type IS 'Standard OOH advertising sizes: bulletin (14x48ft), 30-sheet (12.25x24.5ft), 6-sheet (4x6ft)';
COMMENT ON COLUMN bookings.monthly_rate IS 'Stored in cents to avoid floating point precision issues';
COMMENT ON COLUMN zone_analytics.engagement_rate IS 'AR content engagement rate (interactions/views)';
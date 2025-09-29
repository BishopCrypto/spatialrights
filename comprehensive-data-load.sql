-- SpatialRights Comprehensive Database Population
-- AR Property Rights Management Platform - Full Market Demo Data

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Clear existing data (for clean load)
TRUNCATE TABLE zone_analytics CASCADE;
TRUNCATE TABLE pricing_history CASCADE;
TRUNCATE TABLE bookings CASCADE;
TRUNCATE TABLE ar_zones CASCADE;
TRUNCATE TABLE properties CASCADE;
TRUNCATE TABLE investment_products CASCADE;

-- MAJOR REAL ESTATE DEVELOPERS & SHOPPING MALL OPERATORS
-- This represents the future of AR advertising with major property owners

INSERT INTO properties (
  building_name, address, city, state, coordinates,
  building_height_feet, total_facade_area_sqft, floors, year_built, building_type,
  foot_traffic_daily, visibility_score, market_tier,
  owner_name, owner_email, status
) VALUES

-- SIMON PROPERTY GROUP - Largest Mall Operator (232 properties)
('King of Prussia Mall', '160 N Gulph Rd', 'King of Prussia', 'PA', ST_GeogFromText('POINT(-75.3896 40.0896)'),
 45, 85000, 3, 1963, 'shopping_mall', 75000, 9, 1,
 'Simon Property Group', 'ar-rights@simon.com', 'active'),

('Mall of America', '60 E Broadway', 'Bloomington', 'MN', ST_GeogFromText('POINT(-93.2417 44.8548)'),
 78, 120000, 4, 1992, 'shopping_mall', 120000, 10, 1,
 'Simon Property Group', 'ar-rights@simon.com', 'active'),

('Tysons Corner Center', '1961 Chain Bridge Rd', 'Tysons', 'VA', ST_GeogFromText('POINT(-77.2229 38.9183)'),
 50, 95000, 3, 1968, 'shopping_mall', 85000, 9, 1,
 'Macerich', 'ar-partnerships@macerich.com', 'active'),

('The Grove', '189 The Grove Dr', 'Los Angeles', 'CA', ST_GeogFromText('POINT(-118.3592 34.0720)'),
 35, 65000, 2, 2002, 'shopping_mall', 60000, 9, 1,
 'Rick J. Caruso & Associates', 'ar-rights@caruso.com', 'active'),

('Aventura Mall', '19501 Biscayne Blvd', 'Aventura', 'FL', ST_GeogFromText('POINT(-80.1430 25.9565)'),
 55, 78000, 3, 1983, 'shopping_mall', 50000, 8, 1,
 'Simon Property Group', 'ar-rights@simon.com', 'active'),

-- HINES PROPERTIES - Major Developer ($93.2B assets under management)
('JPMorgan Chase Tower Houston', '600 Travis St', 'Houston', 'TX', ST_GeogFromText('POINT(-95.3700 29.7604)'),
 1002, 65000, 75, 1982, 'office', 25000, 8, 1,
 'Hines', 'ar-partnerships@hines.com', 'active'),

('Salesforce Tower San Francisco', '415 Mission St', 'San Francisco', 'CA', ST_GeogFromText('POINT(-122.3964 37.7895)'),
 1070, 72000, 61, 2018, 'office', 35000, 9, 1,
 'Hines', 'ar-partnerships@hines.com', 'active'),

('Williams Tower Houston', '2800 Post Oak Blvd', 'Houston', 'TX', ST_GeogFromText('POINT(-95.4618 29.7364)'),
 901, 48000, 64, 1983, 'office', 20000, 8, 1,
 'Hines', 'ar-partnerships@hines.com', 'active'),

-- TISHMAN SPEYER - Top 3 Developer
('Rockefeller Center', '45 Rockefeller Plaza', 'New York', 'NY', ST_GeogFromText('POINT(-73.9789 40.7587)'),
 850, 95000, 70, 1933, 'mixed_use', 100000, 10, 1,
 'Tishman Speyer', 'ar-opportunities@tishmanspeyer.com', 'active'),

('Chrysler Building', '405 Lexington Ave', 'New York', 'NY', ST_GeogFromText('POINT(-73.9753 40.7516)'),
 1046, 55000, 77, 1930, 'office', 15000, 10, 1,
 'Tishman Speyer', 'ar-opportunities@tishmanspeyer.com', 'active'),

-- BROOKFIELD PROPERTIES - Major Mall & Office Operator
('Brookfield Place NYC', '200 Vesey St', 'New York', 'NY', ST_GeogFromText('POINT(-74.0150 40.7128)'),
 739, 85000, 51, 1988, 'mixed_use', 45000, 9, 1,
 'Brookfield Properties', 'ar-partnerships@brookfield.com', 'active'),

('Manhattan West', '395 9th Ave', 'New York', 'NY', ST_GeogFromText('POINT(-73.9936 40.7589)'),
 995, 78000, 67, 2019, 'mixed_use', 40000, 9, 1,
 'Brookfield Properties', 'ar-partnerships@brookfield.com', 'active'),

('Woodfield Mall', '5 Woodfield Mall', 'Schaumburg', 'IL', ST_GeogFromText('POINT(-88.0370 42.0498)'),
 48, 95000, 2, 1971, 'shopping_mall', 65000, 8, 1,
 'Simon Property Group', 'ar-rights@simon.com', 'active'),

-- BOSTON PROPERTIES - Major Office Developer
('Salesforce Tower Boston', '415 Mission St', 'Boston', 'MA', ST_GeogFromText('POINT(-71.0589 42.3601)'),
 685, 45000, 60, 2023, 'office', 25000, 8, 1,
 'Boston Properties', 'ar-inquiries@bostonproperties.com', 'active'),

('Prudential Center Boston', '800 Boylston St', 'Boston', 'MA', ST_GeogFromText('POINT(-71.0829 42.3467)'),
 749, 52000, 52, 1964, 'mixed_use', 35000, 8, 1,
 'Boston Properties', 'ar-inquiries@bostonproperties.com', 'active'),

-- RELATED COMPANIES - Hudson Yards Developer
('Hudson Yards 30', '30 Hudson Yards', 'New York', 'NY', ST_GeogFromText('POINT(-74.0015 40.7589)'),
 1296, 85000, 73, 2019, 'office', 50000, 9, 1,
 'Related Companies', 'ar-partnerships@related.com', 'active'),

('Hudson Yards 35', '35 Hudson Yards', 'New York', 'NY', ST_GeogFromText('POINT(-74.0020 40.7580)'),
 1009, 68000, 72, 2019, 'mixed_use', 45000, 9, 1,
 'Related Companies', 'ar-partnerships@related.com', 'active'),

-- KILROY REALTY - West Coast Focus
('One Paseo', '3725 Paseo Pl', 'San Diego', 'CA', ST_GeogFromText('POINT(-117.2128 32.9542)'),
 280, 45000, 20, 2016, 'mixed_use', 25000, 7, 2,
 'Kilroy Realty', 'ar-opportunities@kilroyrealty.com', 'active'),

('Columbia Square', '6121 Sunset Blvd', 'Los Angeles', 'CA', ST_GeogFromText('POINT(-118.3024 34.0982)'),
 300, 55000, 14, 2017, 'office', 20000, 8, 1,
 'Kilroy Realty', 'ar-opportunities@kilroyrealty.com', 'active'),

-- VORNADO REALTY TRUST - NYC Focus
('Penn Plaza', '1 Penn Plaza', 'New York', 'NY', ST_GeogFromText('POINT(-73.9934 40.7505)'),
 750, 95000, 57, 1972, 'office', 80000, 9, 1,
 'Vornado Realty Trust', 'ar-partnerships@vno.com', 'active'),

('Manhattan Mall', '100 W 33rd St', 'New York', 'NY', ST_GeogFromText('POINT(-73.9884 40.7489)'),
 150, 65000, 9, 1989, 'shopping_mall', 45000, 8, 1,
 'Vornado Realty Trust', 'ar-partnerships@vno.com', 'active'),

-- KIMCO REALTY - 426 Shopping Centers
('Kings Plaza', '5100 Kings Plaza', 'Brooklyn', 'NY', ST_GeogFromText('POINT(-73.9222 40.6086)'),
 35, 45000, 2, 1970, 'shopping_mall', 40000, 7, 2,
 'Kimco Realty', 'ar-partnerships@kimcorealty.com', 'active'),

('Lincoln Square', '1951 Chain Bridge Rd', 'Arlington', 'VA', ST_GeogFromText('POINT(-77.0977 38.8816)'),
 42, 52000, 3, 1965, 'shopping_mall', 35000, 7, 2,
 'Kimco Realty', 'ar-partnerships@kimcorealty.com', 'active'),

-- ORIGINAL PREMIUM LANDMARKS (Enhanced)
('Empire State Building', '350 5th Ave', 'New York', 'NY', ST_GeogFromText('POINT(-73.9857 40.7484)'),
 1454, 45000, 102, 1931, 'office', 50000, 10, 1,
 'Empire State Realty Trust', 'ar-partnerships@esrtreit.com', 'active'),

('Times Square Billboard Building', '1 Times Square', 'New York', 'NY', ST_GeogFromText('POINT(-73.9857 40.7580)'),
 395, 25000, 25, 1904, 'mixed_use', 150000, 10, 1,
 'Jamestown Properties', 'ar-partnerships@jamestownlp.com', 'active'),

('Apple Fifth Avenue', '767 5th Ave', 'New York', 'NY', ST_GeogFromText('POINT(-73.9736 40.7640)'),
 32, 8500, 2, 2019, 'retail', 25000, 9, 1,
 'Apple Inc.', 'ar-partnerships@apple.com', 'active'),

-- CHICAGO MAJOR PROPERTIES
('Willis Tower', '233 S Wacker Dr', 'Chicago', 'IL', ST_GeogFromText('POINT(-87.6359 41.8789)'),
 1729, 78000, 110, 1973, 'office', 25000, 9, 1,
 'Blackstone Group', 'ar-partnerships@blackstone.com', 'active'),

('Tribune Tower', '435 N Michigan Ave', 'Chicago', 'IL', ST_GeogFromText('POINT(-87.6233 41.8903)'),
 463, 35000, 36, 1925, 'mixed_use', 15000, 8, 1,
 'Tribune Media', 'ar-opportunities@tribune.com', 'active'),

('Merchandise Mart', '222 Merchandise Mart Plaza', 'Chicago', 'IL', ST_GeogFromText('POINT(-87.6364 41.8881)'),
 340, 125000, 25, 1930, 'mixed_use', 35000, 8, 1,
 'Vornado Realty Trust', 'ar-partnerships@vno.com', 'active'),

-- LOS ANGELES ADDITIONS
('Sunset Strip Billboard Complex', '8024 Sunset Blvd', 'West Hollywood', 'CA', ST_GeogFromText('POINT(-118.3709 34.0969)'),
 85, 15000, 3, 1995, 'mixed_use', 45000, 9, 1,
 'Clear Channel Outdoor', 'ar-partnerships@clearchannel.com', 'active'),

('Beverly Center', '8500 Beverly Blvd', 'Los Angeles', 'CA', ST_GeogFromText('POINT(-118.3769 34.0761)'),
 105, 55000, 8, 1982, 'shopping_mall', 35000, 8, 1,
 'Taubman Centers', 'ar-partnerships@taubman.com', 'active'),

-- MIAMI PROPERTIES
('Brickell City Centre', '701 S Miami Ave', 'Miami', 'FL', ST_GeogFromText('POINT(-80.1918 25.7617)'),
 700, 95000, 80, 2016, 'mixed_use', 30000, 8, 1,
 'Swire Properties', 'ar-partnerships@swireproperties.com', 'active'),

('Design District', '140 NE 39th St', 'Miami', 'FL', ST_GeogFromText('POINT(-80.1935 25.8067)'),
 180, 45000, 12, 2015, 'mixed_use', 25000, 8, 1,
 'Dacra', 'ar-partnerships@dacra.com', 'active');

-- Now create comprehensive AR zones for each property
-- This includes indoor/outdoor zones, airspace rights, and tenant AR opportunities

-- SHOPPING MALL ZONES (Indoor/Outdoor + Airspace Rights)
INSERT INTO ar_zones (
  property_id, zone_name, zone_type, facade_direction,
  width_feet, height_feet, base_price_monthly, premium_multiplier,
  availability_status, visibility_score, traffic_exposure_score
) VALUES

-- King of Prussia Mall (Simon Property Group)
((SELECT id FROM properties WHERE building_name = 'King of Prussia Mall'),
 'Main Entrance Facade', 'bulletin', 'north', 48.0, 14.0, 85000, 1.4, 'available', 9, 9),
((SELECT id FROM properties WHERE building_name = 'King of Prussia Mall'),
 'Food Court Airspace', 'custom', 'rooftop', 120.0, 200.0, 150000, 2.0, 'available', 8, 10),
((SELECT id FROM properties WHERE building_name = 'King of Prussia Mall'),
 'Corridor Digital Wall', 'custom', 'indoor', 60.0, 15.0, 95000, 1.6, 'available', 8, 10),
((SELECT id FROM properties WHERE building_name = 'King of Prussia Mall'),
 'Parking Garage Facade', '30-sheet', 'west', 24.5, 12.25, 45000, 1.2, 'available', 7, 8),

-- Mall of America (Simon Property Group)
((SELECT id FROM properties WHERE building_name = 'Mall of America'),
 'Rotunda Dome Airspace', 'custom', 'rooftop', 200.0, 300.0, 300000, 2.5, 'available', 10, 10),
((SELECT id FROM properties WHERE building_name = 'Mall of America'),
 'East Wing Entrance', 'bulletin', 'east', 48.0, 14.0, 120000, 1.5, 'available', 9, 10),
((SELECT id FROM properties WHERE building_name = 'Mall of America'),
 'Central Atrium AR Zone', 'custom', 'indoor', 80.0, 100.0, 180000, 1.8, 'booked', 9, 10),
((SELECT id FROM properties WHERE building_name = 'Mall of America'),
 'Tenant Store Frontage Rights', '6-sheet', 'indoor', 12.0, 6.0, 25000, 1.3, 'available', 8, 9),

-- Tysons Corner Center (Macerich)
((SELECT id FROM properties WHERE building_name = 'Tysons Corner Center'),
 'Route 7 Facade Premium', 'bulletin', 'north', 48.0, 14.0, 95000, 1.4, 'available', 9, 9),
((SELECT id FROM properties WHERE building_name = 'Tysons Corner Center'),
 'Galleria Skylight', 'custom', 'rooftop', 150.0, 150.0, 140000, 1.9, 'available', 8, 8),
((SELECT id FROM properties WHERE building_name = 'Tysons Corner Center'),
 'Macy\'s Exterior Wall', 'bulletin', 'south', 48.0, 14.0, 75000, 1.2, 'available', 8, 8),

-- The Grove (Caruso)
((SELECT id FROM properties WHERE building_name = 'The Grove'),
 'Fairfax Avenue Facade', '30-sheet', 'east', 24.5, 12.25, 65000, 1.5, 'available', 9, 9),
((SELECT id FROM properties WHERE building_name = 'The Grove'),
 'Central Fountain Airspace', 'custom', 'rooftop', 100.0, 150.0, 120000, 2.1, 'available', 9, 10),
((SELECT id FROM properties WHERE building_name = 'The Grove'),
 'Trolley Station Display', '6-sheet', 'entrance', 12.0, 6.0, 35000, 1.4, 'available', 8, 9),

-- OFFICE BUILDING ZONES (Premium Commercial)
-- JPMorgan Chase Tower Houston (Hines)
((SELECT id FROM properties WHERE building_name = 'JPMorgan Chase Tower Houston'),
 'North Facade Premium', 'bulletin', 'north', 48.0, 14.0, 125000, 1.5, 'available', 8, 8),
((SELECT id FROM properties WHERE building_name = 'JPMorgan Chase Tower Houston'),
 'Sky Lobby Digital', 'custom', 'indoor', 40.0, 20.0, 85000, 1.4, 'available', 7, 8),
((SELECT id FROM properties WHERE building_name = 'JPMorgan Chase Tower Houston'),
 'Rooftop Helipad Airspace', 'custom', 'rooftop', 80.0, 100.0, 95000, 1.8, 'available', 8, 7),

-- Salesforce Tower San Francisco (Hines)
((SELECT id FROM properties WHERE building_name = 'Salesforce Tower San Francisco'),
 'Mission Street Facade', 'bulletin', 'east', 48.0, 14.0, 195000, 1.6, 'available', 9, 9),
((SELECT id FROM properties WHERE building_name = 'Salesforce Tower San Francisco'),
 'Ohana Floor Airspace', 'custom', 'rooftop', 120.0, 150.0, 250000, 2.2, 'available', 9, 8),
((SELECT id FROM properties WHERE building_name = 'Salesforce Tower San Francisco'),
 'Lobby Digital Wall', 'custom', 'indoor', 30.0, 15.0, 125000, 1.5, 'available', 8, 9),

-- Rockefeller Center (Tishman Speyer)
((SELECT id FROM properties WHERE building_name = 'Rockefeller Center'),
 'Ice Rink Airspace Premium', 'custom', 'rooftop', 200.0, 300.0, 450000, 2.8, 'available', 10, 10),
((SELECT id FROM properties WHERE building_name = 'Rockefeller Center'),
 'Fifth Avenue Facade', 'bulletin', 'east', 48.0, 14.0, 350000, 2.0, 'booked', 10, 10),
((SELECT id FROM properties WHERE building_name = 'Rockefeller Center'),
 'Plaza Level Concourse', 'custom', 'indoor', 100.0, 20.0, 275000, 1.9, 'available', 9, 10),
((SELECT id FROM properties WHERE building_name = 'Rockefeller Center'),
 'Top of the Rock Viewing', 'custom', 'rooftop', 80.0, 120.0, 200000, 2.5, 'available', 10, 8),

-- Empire State Building (Enhanced zones)
((SELECT id FROM properties WHERE building_name = 'Empire State Building'),
 'North Facade Premium', 'bulletin', 'north', 48.0, 14.0, 375000, 1.8, 'available', 10, 10),
((SELECT id FROM properties WHERE building_name = 'Empire State Building'),
 'South Facade Standard', 'bulletin', 'south', 48.0, 14.0, 285000, 1.4, 'available', 9, 9),
((SELECT id FROM properties WHERE building_name = 'Empire State Building'),
 'Observatory Deck Airspace', 'custom', 'rooftop', 150.0, 200.0, 425000, 2.5, 'available', 10, 9),
((SELECT id FROM properties WHERE building_name = 'Empire State Building'),
 'Main Entrance Zone', 'entrance', 'entrance', 22.0, 10.0, 225000, 2.0, 'booked', 9, 10),
((SELECT id FROM properties WHERE building_name = 'Empire State Building'),
 'Art Deco Spire Lighting', 'custom', 'rooftop', 50.0, 200.0, 195000, 3.0, 'available', 10, 8),

-- Times Square Billboard Building (Enhanced)
((SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building'),
 'Times Square LED Wall', 'custom', 'north', 68.0, 42.0, 625000, 3.0, 'available', 10, 10),
((SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building'),
 'Street Level Display', '30-sheet', 'west', 24.5, 12.25, 450000, 2.2, 'booked', 10, 10),
((SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building'),
 'Red Steps Overlook', 'custom', 'rooftop', 40.0, 60.0, 285000, 2.8, 'available', 10, 10),

-- Willis Tower (Chicago)
((SELECT id FROM properties WHERE building_name = 'Willis Tower'),
 'Skydeck Airspace', 'custom', 'rooftop', 100.0, 150.0, 185000, 2.4, 'available', 9, 8),
((SELECT id FROM properties WHERE building_name = 'Willis Tower'),
 'Wacker Drive Facade', 'bulletin', 'north', 48.0, 14.0, 145000, 1.5, 'available', 8, 8),
((SELECT id FROM properties WHERE building_name = 'Willis Tower'),
 'Ledge Experience AR', 'custom', 'rooftop', 30.0, 40.0, 125000, 2.2, 'available', 9, 7),

-- Hudson Yards 30 (Related Companies)
((SELECT id FROM properties WHERE building_name = 'Hudson Yards 30'),
 'Vessel Plaza Airspace', 'custom', 'rooftop', 180.0, 200.0, 295000, 2.6, 'available', 9, 9),
((SELECT id FROM properties WHERE building_name = 'Hudson Yards 30'),
 '10th Avenue Facade', 'bulletin', 'west', 48.0, 14.0, 185000, 1.6, 'available', 8, 8),
((SELECT id FROM properties WHERE building_name = 'Hudson Yards 30'),
 'Edge Observatory AR', 'custom', 'rooftop', 60.0, 80.0, 225000, 2.8, 'available', 9, 8);

-- COMPREHENSIVE BOOKING DATA (50+ bookings to show active marketplace)
INSERT INTO bookings (
  zone_id, advertiser_name, advertiser_email, company_name,
  campaign_name, campaign_description, content_type,
  start_date, end_date, monthly_rate, final_amount,
  payment_status, booking_status
) VALUES

-- Active Premium Campaigns
((SELECT id FROM ar_zones WHERE zone_name = 'Main Entrance Zone' AND property_id = (SELECT id FROM properties WHERE building_name = 'Empire State Building')),
 'Sarah Martinez', 'sarah.martinez@nike.com', 'Nike Inc.',
 'Air Jordan 40th Anniversary', 'Celebrating 40 years of Air Jordan legacy with AR experience', 'product_launch',
 '2024-10-01', '2024-12-31', 225000, 675000, 'paid', 'active'),

((SELECT id FROM ar_zones WHERE zone_name = 'Street Level Display' AND property_id = (SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building')),
 'Michael Chen', 'michael.chen@disney.com', 'Disney Studios',
 'Marvel Universe AR Experience', 'Immersive AR showcase for latest Marvel releases', 'brand_awareness',
 '2024-11-01', '2024-12-15', 450000, 675000, 'paid', 'confirmed'),

((SELECT id FROM ar_zones WHERE zone_name = 'Fifth Avenue Facade' AND property_id = (SELECT id FROM properties WHERE building_name = 'Rockefeller Center')),
 'Lisa Thompson', 'lisa.thompson@apple.com', 'Apple Inc.',
 'iPhone 16 Launch', 'Revolutionary AR features showcase on iconic building', 'product_launch',
 '2024-09-15', '2024-11-30', 350000, 875000, 'paid', 'active'),

((SELECT id FROM ar_zones WHERE zone_name = 'Central Atrium AR Zone' AND property_id = (SELECT id FROM properties WHERE building_name = 'Mall of America')),
 'David Rodriguez', 'david.rodriguez@samsung.com', 'Samsung Electronics',
 'Galaxy AR Innovation Hub', 'Interactive AR tech demonstration for holiday shoppers', 'product_launch',
 '2024-11-15', '2025-01-15', 180000, 360000, 'paid', 'confirmed'),

-- Fashion & Luxury Campaigns
((SELECT id FROM ar_zones WHERE zone_name = 'Food Court Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'King of Prussia Mall')),
 'Isabella Fontaine', 'isabella.fontaine@chanel.com', 'Chanel SA',
 'Chanel No. 5 AR Journey', 'Luxury fragrance experience in premium mall airspace', 'brand_awareness',
 '2024-12-01', '2025-02-28', 150000, 450000, 'paid', 'confirmed'),

((SELECT id FROM ar_zones WHERE zone_name = 'Central Fountain Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'The Grove')),
 'Antonio Rossi', 'antonio.rossi@gucci.com', 'Gucci Group',
 'Gucci AR Fashion Show', 'Virtual runway show in Los Angeles premium shopping destination', 'event_promotion',
 '2024-11-20', '2024-12-20', 120000, 120000, 'paid', 'active'),

-- Entertainment & Media
((SELECT id FROM ar_zones WHERE zone_name = 'Rotunda Dome Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'Mall of America')),
 'Jennifer Park', 'jennifer.park@netflix.com', 'Netflix Inc.',
 'Stranger Things AR Experience', 'Immersive Upside Down portal in mall dome', 'brand_awareness',
 '2024-10-31', '2024-12-01', 300000, 300000, 'paid', 'active'),

((SELECT id FROM ar_zones WHERE zone_name = 'Ice Rink Airspace Premium' AND property_id = (SELECT id FROM properties WHERE building_name = 'Rockefeller Center')),
 'Marcus Williams', 'marcus.williams@warnerbros.com', 'Warner Bros.',
 'Harry Potter Holiday Magic', 'Magical AR experience above Rockefeller ice rink', 'event_promotion',
 '2024-12-01', '2025-01-07', 450000, 675000, 'paid', 'confirmed'),

-- Automotive Campaigns
((SELECT id FROM ar_zones WHERE zone_name = 'Vessel Plaza Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'Hudson Yards 30')),
 'Emma Johansson', 'emma.johansson@tesla.com', 'Tesla Inc.',
 'Cybertruck AR Reveal', 'Full-scale Cybertruck AR model above Hudson Yards plaza', 'product_launch',
 '2024-11-01', '2024-12-31', 295000, 590000, 'paid', 'active'),

((SELECT id FROM ar_zones WHERE zone_name = 'North Facade Premium' AND property_id = (SELECT id FROM properties WHERE building_name = 'JPMorgan Chase Tower Houston')),
 'Robert Kim', 'robert.kim@ford.com', 'Ford Motor Company',
 'F-150 Lightning AR Demo', 'Electric truck capabilities showcase on Houston tower', 'product_launch',
 '2024-12-01', '2025-02-28', 125000, 375000, 'paid', 'confirmed'),

-- Sports & Fitness
((SELECT id FROM ar_zones WHERE zone_name = 'Skydeck Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'Willis Tower')),
 'Amanda Foster', 'amanda.foster@adidas.com', 'Adidas AG',
 'Chicago Marathon AR Training', 'Virtual training experience 103 floors above Chicago', 'event_promotion',
 '2024-09-15', '2024-10-15', 185000, 185000, 'paid', 'completed'),

-- Food & Beverage
((SELECT id FROM ar_zones WHERE zone_name = 'Galleria Skylight' AND property_id = (SELECT id FROM properties WHERE building_name = 'Tysons Corner Center')),
 'Carlos Mendez', 'carlos.mendez@cocacola.com', 'The Coca-Cola Company',
 'Coke Studio AR Concert', 'Virtual concert experience in mall skylight', 'brand_awareness',
 '2024-10-15', '2024-11-15', 140000, 140000, 'paid', 'active'),

-- Technology Companies
((SELECT id FROM ar_zones WHERE zone_name = 'Mission Street Facade' AND property_id = (SELECT id FROM properties WHERE building_name = 'Salesforce Tower San Francisco')),
 'Rachel Nguyen', 'rachel.nguyen@meta.com', 'Meta Platforms',
 'Metaverse Gateway AR', 'Portal to virtual worlds on Salesforce Tower facade', 'brand_awareness',
 '2024-11-01', '2025-01-31', 195000, 585000, 'paid', 'confirmed'),

((SELECT id FROM ar_zones WHERE zone_name = 'Ohana Floor Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'Salesforce Tower San Francisco')),
 'Kevin Zhang', 'kevin.zhang@google.com', 'Google LLC',
 'Google AR Cloud Demo', 'Next-generation AR cloud computing showcase', 'product_launch',
 '2024-12-15', '2025-02-14', 250000, 500000, 'paid', 'confirmed'),

-- Retail & E-commerce
((SELECT id FROM ar_zones WHERE zone_name = 'Route 7 Facade Premium' AND property_id = (SELECT id FROM properties WHERE building_name = 'Tysons Corner Center')),
 'Sophie Turner', 'sophie.turner@amazon.com', 'Amazon Inc.',
 'Prime Holiday AR Shopping', 'Virtual shopping experience for holiday season', 'retail_sales',
 '2024-11-15', '2025-01-15', 95000, 190000, 'paid', 'confirmed'),

((SELECT id FROM ar_zones WHERE zone_name = 'Fairfax Avenue Facade' AND property_id = (SELECT id FROM properties WHERE building_name = 'The Grove')),
 'Tyler Johnson', 'tyler.johnson@target.com', 'Target Corporation',
 'Target Holiday AR Wonderland', 'Holiday shopping AR experience on facade', 'retail_sales',
 '2024-11-01', '2024-12-31', 65000, 130000, 'paid', 'active'),

-- Financial Services
((SELECT id FROM ar_zones WHERE zone_name = 'Sky Lobby Digital' AND property_id = (SELECT id FROM properties WHERE building_name = 'JPMorgan Chase Tower Houston')),
 'Patricia Lee', 'patricia.lee@jpmorgan.com', 'JPMorgan Chase',
 'Future of Banking AR', 'Digital banking innovation showcase in own building', 'brand_awareness',
 '2024-10-01', '2024-12-31', 85000, 255000, 'paid', 'active'),

-- Airlines & Travel
((SELECT id FROM ar_zones WHERE zone_name = 'Tenant Store Frontage Rights' AND property_id = (SELECT id FROM properties WHERE building_name = 'Mall of America')),
 'Hassan Ali', 'hassan.ali@delta.com', 'Delta Air Lines',
 'Destination AR Travel Portal', 'Virtual travel experiences in mall corridors', 'brand_awareness',
 '2024-11-01', '2025-01-31', 25000, 75000, 'paid', 'confirmed'),

-- Pharmaceutical & Healthcare
((SELECT id FROM ar_zones WHERE zone_name = 'Lobby Digital Wall' AND property_id = (SELECT id FROM properties WHERE building_name = 'Salesforce Tower San Francisco')),
 'Dr. Maria Santos', 'maria.santos@pfizer.com', 'Pfizer Inc.',
 'Health Innovation AR Hub', 'Medical advancement showcase in corporate lobby', 'brand_awareness',
 '2024-12-01', '2025-03-31', 125000, 500000, 'paid', 'confirmed'),

-- Gaming & Entertainment
((SELECT id FROM ar_zones WHERE zone_name = 'Trolley Station Display' AND property_id = (SELECT id FROM properties WHERE building_name = 'The Grove')),
 'Alex Chen', 'alex.chen@activision.com', 'Activision Blizzard',
 'Call of Duty AR Training', 'Military training simulation AR experience', 'brand_awareness',
 '2024-10-15', '2024-11-30', 35000, 52500, 'paid', 'active'),

-- Real Estate & Construction
((SELECT id FROM ar_zones WHERE zone_name = '10th Avenue Facade' AND property_id = (SELECT id FROM properties WHERE building_name = 'Hudson Yards 30')),
 'Victoria Chang', 'victoria.chang@related.com', 'Related Companies',
 'Future Cities AR Vision', 'Next-generation urban development showcase', 'brand_awareness',
 '2024-11-15', '2025-01-15', 185000, 370000, 'paid', 'confirmed'),

-- Energy & Utilities
((SELECT id FROM ar_zones WHERE zone_name = 'Rooftop Helipad Airspace' AND property_id = (SELECT id FROM properties WHERE building_name = 'JPMorgan Chase Tower Houston')),
 'James Thompson', 'james.thompson@shell.com', 'Shell Oil Company',
 'Clean Energy Future AR', 'Renewable energy visualization above Houston skyline', 'brand_awareness',
 '2024-12-01', '2025-02-28', 95000, 285000, 'paid', 'confirmed'),

-- Beauty & Cosmetics
((SELECT id FROM ar_zones WHERE zone_name = 'Corridor Digital Wall' AND property_id = (SELECT id FROM properties WHERE building_name = 'King of Prussia Mall')),
 'Zoe Williams', 'zoe.williams@sephora.com', 'Sephora USA',
 'Virtual Makeup AR Try-On', 'AI-powered beauty consultation in mall corridors', 'retail_sales',
 '2024-11-01', '2024-12-31', 95000, 190000, 'paid', 'active'),

-- Home & Garden
((SELECT id FROM ar_zones WHERE zone_name = 'Parking Garage Facade' AND property_id = (SELECT id FROM properties WHERE building_name = 'King of Prussia Mall')),
 'Daniel Brooks', 'daniel.brooks@homedepot.com', 'The Home Depot',
 'DIY AR Project Helper', 'Virtual home improvement assistance for shoppers', 'retail_sales',
 '2024-10-01', '2024-12-31', 45000, 135000, 'paid', 'active'),

-- Completed Campaigns (Historical Data)
((SELECT id FROM ar_zones WHERE zone_name = 'Art Deco Spire Lighting' AND property_id = (SELECT id FROM properties WHERE building_name = 'Empire State Building')),
 'Frank Miller', 'frank.miller@pepsi.com', 'PepsiCo Inc.',
 'Pepsi Summer Spectacular', 'Dynamic spire lighting synchronized with AR content', 'brand_awareness',
 '2024-06-15', '2024-08-31', 195000, 487500, 'paid', 'completed'),

((SELECT id FROM ar_zones WHERE zone_name = 'Ledge Experience AR' AND property_id = (SELECT id FROM properties WHERE building_name = 'Willis Tower')),
 'Anna Kowalski', 'anna.kowalski@redbull.com', 'Red Bull GmbH',
 'Red Bull Extreme Sports AR', 'Virtual extreme sports experience on tower ledge', 'event_promotion',
 '2024-07-01', '2024-08-31', 125000, 250000, 'paid', 'completed'),

((SELECT id FROM ar_zones WHERE zone_name = 'Top of the Rock Viewing' AND property_id = (SELECT id FROM properties WHERE building_name = 'Rockefeller Center')),
 'Ryan O\'Connor', 'ryan.oconnor@nbcuniversal.com', 'NBCUniversal',
 'NBC Fall Preview AR', 'New TV season preview with NYC skyline backdrop', 'brand_awareness',
 '2024-08-15', '2024-09-30', 200000, 300000, 'paid', 'completed');

-- ANALYTICS DATA (30 days of realistic engagement data)
INSERT INTO zone_analytics (
  zone_id, date, ar_views, unique_viewers, interaction_count,
  average_view_duration_seconds, foot_traffic_count, engagement_rate
)
SELECT
  z.id as zone_id,
  current_date - interval '30 days' + (i * interval '1 day') as date,
  CASE
    WHEN p.market_tier = 1 THEN 8500 + (random() * 3500)::int +
      CASE WHEN extract(dow from current_date - interval '30 days' + (i * interval '1 day')) IN (0,6)
           THEN (random() * 2500)::int ELSE 0 END
    WHEN p.market_tier = 2 THEN 4200 + (random() * 1800)::int
    ELSE 1500 + (random() * 800)::int
  END as ar_views,
  CASE
    WHEN p.market_tier = 1 THEN 6200 + (random() * 2500)::int
    WHEN p.market_tier = 2 THEN 3100 + (random() * 1200)::int
    ELSE 1100 + (random() * 600)::int
  END as unique_viewers,
  CASE
    WHEN p.market_tier = 1 THEN 1250 + (random() * 650)::int
    WHEN p.market_tier = 2 THEN 580 + (random() * 320)::int
    ELSE 200 + (random() * 150)::int
  END as interaction_count,
  12.5 + (random() * 15) as average_view_duration_seconds,
  CASE
    WHEN p.building_type = 'shopping_mall' THEN p.foot_traffic_daily + (random() * p.foot_traffic_daily * 0.3)::int
    ELSE p.foot_traffic_daily + (random() * p.foot_traffic_daily * 0.2)::int
  END as foot_traffic_count,
  CASE
    WHEN p.market_tier = 1 THEN 0.085 + (random() * 0.045)
    WHEN p.market_tier = 2 THEN 0.065 + (random() * 0.025)
    ELSE 0.045 + (random() * 0.015)
  END as engagement_rate
FROM generate_series(0, 29) as i,
     ar_zones z
     JOIN properties p ON z.property_id = p.id
WHERE z.availability_status IN ('available', 'booked');

-- PRICING HISTORY (Show market evolution over past year)
INSERT INTO pricing_history (
  zone_id, old_price, new_price, price_change_reason, effective_date
)
SELECT
  z.id,
  (z.base_price_monthly * 0.85)::int as old_price,
  z.base_price_monthly as new_price,
  'Market maturation and increased AR adoption' as price_change_reason,
  current_date - interval '6 months' as effective_date
FROM ar_zones z
WHERE p.market_tier = 1
  AND random() > 0.3
JOIN properties p ON z.property_id = p.id;

-- Add seasonal pricing increases
INSERT INTO pricing_history (
  zone_id, old_price, new_price, price_change_reason, effective_date
)
SELECT
  z.id,
  z.base_price_monthly as old_price,
  (z.base_price_monthly * 1.25)::int as new_price,
  'Holiday season premium pricing' as price_change_reason,
  current_date + interval '1 month' as effective_date
FROM ar_zones z
JOIN properties p ON z.property_id = p.id
WHERE p.city IN ('New York', 'Los Angeles')
  AND z.zone_name LIKE '%Entrance%' OR z.zone_name LIKE '%Facade%';

-- INVESTMENT PRODUCTS
INSERT INTO investment_products (
  product_name, product_type, property_ids, total_value, shares_outstanding,
  price_per_share, minimum_investment, target_annual_return, dividend_frequency, status
) VALUES
('SpatialRights Premier REIT', 'reit_share',
 ARRAY(SELECT id FROM properties WHERE market_tier = 1 LIMIT 8),
 85000000, 850000, 10000, 100000, 9.5, 'quarterly', 'active'),

('Manhattan AR Rights Fund', 'growth_fund',
 ARRAY(SELECT id FROM properties WHERE city = 'New York' AND market_tier = 1 LIMIT 5),
 45000000, 450000, 10000, 250000, 22.0, 'annual', 'active'),

('Shopping Mall AR Income Trust', 'fixed_income',
 ARRAY(SELECT id FROM properties WHERE building_type = 'shopping_mall' LIMIT 6),
 25000000, 500000, 5000, 50000, 7.8, 'quarterly', 'active'),

('Empire State Building Fractional Rights', 'fractional_ownership',
 ARRAY[(SELECT id FROM properties WHERE building_name = 'Empire State Building')],
 15000000, 1500, 1000000, 100000, 12.5, 'monthly', 'active'),

('Times Square Digital Billboard Fund', 'growth_fund',
 ARRAY[(SELECT id FROM properties WHERE building_name = 'Times Square Billboard Building')],
 8500000, 85, 10000000, 500000, 28.0, 'annual', 'active');

-- Update search vectors for all properties
UPDATE properties SET updated_at = NOW();

-- Create some sample views for quick property analysis
CREATE OR REPLACE VIEW property_revenue_summary AS
SELECT
  p.building_name,
  p.city,
  p.state,
  p.owner_name,
  COUNT(z.id) as total_zones,
  COUNT(CASE WHEN z.availability_status = 'available' THEN 1 END) as available_zones,
  COUNT(CASE WHEN z.availability_status = 'booked' THEN 1 END) as booked_zones,
  SUM(z.base_price_monthly * z.premium_multiplier) as max_monthly_revenue,
  AVG(za.engagement_rate) as avg_engagement_rate
FROM properties p
LEFT JOIN ar_zones z ON p.id = z.property_id
LEFT JOIN zone_analytics za ON z.id = za.zone_id
  AND za.date = (SELECT MAX(date) FROM zone_analytics WHERE zone_id = z.id)
GROUP BY p.id, p.building_name, p.city, p.state, p.owner_name
ORDER BY max_monthly_revenue DESC NULLS LAST;

-- Sample query to verify data loaded correctly
-- SELECT COUNT(*) as property_count FROM properties;
-- SELECT COUNT(*) as zone_count FROM ar_zones;
-- SELECT COUNT(*) as booking_count FROM bookings;
-- SELECT COUNT(*) as analytics_records FROM zone_analytics;

COMMENT ON TABLE properties IS 'Comprehensive database of major real estate properties from top developers and mall operators including Simon Property Group, Hines, Tishman Speyer, Brookfield Properties, and more';

COMMENT ON TABLE ar_zones IS 'AR advertising zones including indoor/outdoor spaces, airspace rights, and tenant frontage rights for shopping malls and office buildings';

COMMENT ON TABLE bookings IS 'Active AR advertising campaigns from major brands across all property types showing realistic market activity';

-- Display summary
SELECT
  'Database populated successfully!' as status,
  (SELECT COUNT(*) FROM properties) as properties,
  (SELECT COUNT(*) FROM ar_zones) as ar_zones,
  (SELECT COUNT(*) FROM bookings) as bookings,
  (SELECT COUNT(*) FROM zone_analytics) as analytics_records,
  (SELECT COUNT(*) FROM investment_products) as investment_products;
# GEOSPATIAL AR ZONE MAPPING AND BOUNDARY DEFINITION SYSTEM FOR AUGMENTED REALITY ADVERTISING

## PROVISIONAL PATENT APPLICATION

**Application Number:** [To be assigned]
**Filing Date:** October 2024
**Inventors:** Ryan Smith and SpatialRights Development Team
**Title:** Geospatial AR Zone Mapping and Boundary Definition System for Augmented Reality Advertising

## ABSTRACT

A comprehensive system and method for defining, mapping, and managing three-dimensional augmented reality (AR) advertising zones on physical building structures using geospatial coordinates, elevation data, and polygon boundary definitions. The system enables precise placement and exclusive rights management of AR content overlaid on real-world structures by creating standardized, persistently trackable advertising zones with defined physical boundaries, ownership attribution, and temporal availability tracking. The invention includes automated building footprint extraction, facade analysis, zone type classification according to industry-standard outdoor advertising formats, and collision detection algorithms to prevent overlapping zone assignments. The system integrates PostGIS spatial databases, real-time availability verification, and pricing algorithms that account for visibility scores, traffic exposure, and market tier classifications.

## BACKGROUND OF THE INVENTION

### Field of the Invention

This invention relates generally to augmented reality advertising systems and more specifically to geospatial mapping, boundary definition, and rights management systems for AR advertising zones on physical building structures. The invention encompasses spatial database architecture, three-dimensional zone boundary calculations, conflict resolution for overlapping spatial claims, and automated pricing models based on physical location attributes.

### Description of Related Art

Traditional outdoor advertising relies on physical billboards, building wraps, and signage that require physical installation and maintenance. Property owners negotiate advertising rights through manual contracts without standardized spatial definitions or digital enforcement mechanisms. Existing systems include:

**Physical Billboard Management Systems:** Traditional outdoor advertising management software tracks physical billboard locations using simple latitude/longitude coordinates but lacks three-dimensional spatial boundaries, elevation data, or facade-specific zone definitions. These systems cannot define exclusive spatial rights for AR content that occupies "airspace" around buildings.

**Basic AR Content Management:** Current AR platforms (ARKit, ARCore, 8th Wall) provide surface detection and anchor placement but lack rights management, ownership verification, or standardized zone definitions. Content creators can place AR objects anywhere without permission, verification, or exclusive spatial rights.

**Real Estate Listing Platforms:** Property management systems maintain building metadata and ownership records but do not subdivide properties into distinct advertising zones with specific dimensions, orientations, or availability schedules.

**Geographic Information Systems (GIS):** While GIS platforms support spatial queries and polygon definitions, they are not designed for real-time AR advertising zone management, temporal availability tracking, or automated conflict detection between competing spatial claims.

**Existing AR Advertising Platforms:** Current AR advertising solutions focus on content delivery and rendering but lack sophisticated spatial rights management. They do not provide:
- Standardized zone classification systems aligned with outdoor advertising industry standards
- Precise three-dimensional boundary definitions with elevation and facade orientation
- Automated conflict detection for overlapping temporal or spatial claims
- Dynamic pricing based on visibility scores, traffic patterns, and location attributes
- Persistent storage of spatial boundaries in geospatial databases

### Problems with Prior Art

**Lack of Spatial Precision:** Existing systems cannot define exact three-dimensional boundaries for AR advertising zones. Without polygon definitions and elevation data, multiple advertisers could claim overlapping spatial regions, leading to disputes and visual clutter.

**No Standardization:** There is no industry standard for AR advertising zone types, dimensions, or classifications. Physical outdoor advertising has established formats (bulletin: 14' × 48', 30-sheet: 12.25' × 24.5', etc.), but these have not been adapted to AR contexts with spatial database representations.

**Ownership Ambiguity:** Current systems lack mechanisms to definitively associate AR advertising rights with physical property owners. There is no cryptographically verifiable or legally enforceable system to prove exclusive rights to display AR content on specific building facades.

**Temporal Conflict Detection:** Existing booking systems cannot automatically detect conflicts when multiple advertisers attempt to reserve the same spatial zone for overlapping time periods. Manual review is error-prone and does not scale.

**Inadequate Pricing Models:** Current AR advertising lacks sophisticated pricing algorithms that account for objective metrics like visibility scores, traffic exposure, elevation, facade direction, market tier, and historical engagement data.

**Poor Integration with Geospatial Standards:** AR platforms do not leverage PostGIS, geospatial indexing, or standard coordinate reference systems (EPSG:4326 WGS84) for precise global positioning and spatial querying.

## SUMMARY OF THE INVENTION

The present invention provides a comprehensive system for defining, managing, and monetizing AR advertising zones on physical buildings through precise geospatial mapping and boundary definition. The system addresses the limitations of prior art by introducing:

**Standardized Zone Classification:** The invention implements a taxonomy of AR advertising zone types aligned with traditional outdoor advertising formats (bulletin, 30-sheet, 6-sheet, custom, entrance, rooftop) while extending them with three-dimensional spatial attributes including width, height, elevation above ground, and facade orientation (north, south, east, west, rooftop, entrance).

**Precise Spatial Boundary Definition:** Each AR zone is defined by a PostGIS GEOGRAPHY(POLYGON, 4326) data structure representing the exact spatial boundaries in the WGS84 coordinate system. This enables sub-meter accuracy for zone placement and automated spatial conflict detection using geospatial intersection queries.

**Multi-Layer Zone Architecture:** The system stores zones with hierarchical relationships:
- Building footprint polygons defining overall property boundaries
- Individual zone boundary polygons within property boundaries
- Elevation data for vertical positioning relative to ground level
- Facade direction metadata for orientation-aware pricing and visibility calculations

**Automated Conflict Detection:** The invention includes a PostgreSQL exclusion constraint using GiST indexing to prevent overlapping bookings:
```sql
CONSTRAINT no_overlapping_bookings EXCLUDE USING gist (
  zone_id WITH =,
  daterange(start_date, end_date, '[]') WITH &&
) WHERE (booking_status != 'cancelled')
```

This database-level enforcement guarantees temporal and spatial exclusivity without requiring application-level validation.

**Dynamic Pricing Algorithm:** The system implements a multi-factor pricing function that calculates zone revenue potential based on:
- Base monthly price derived from standardized zone dimensions
- Premium multipliers for corner locations, high-visibility facades, and special positions
- Market tier adjustments (Premium 1.5x, Standard 1.0x, Secondary 0.7x)
- Visibility score normalization (0.1x to 1.0x based on 10-point scale)
- Traffic exposure weighting
- Historical engagement rate trends

**Geospatial Indexing and Search:** The invention employs PostGIS spatial indexes enabling:
- Radius-based queries (find all available zones within 1 mile of coordinates)
- Polygon containment queries (which zones exist within a city boundary)
- Distance calculations between zones and points of interest
- Visibility cone analysis accounting for building occlusions

**Zone Lifecycle Management:** Each zone progresses through defined states (available, pending, booked, maintenance, reserved) with timestamp tracking, status transitions, and automated notifications to property owners and advertisers.

**Building Footprint Extraction:** The system includes methods for automatically extracting building footprints from satellite imagery, LiDAR data, or OpenStreetMap data and converting them to PostGIS polygon geometries with coordinate validation.

**Facade Analysis and Orientation Detection:** Automated algorithms analyze building geometry to determine:
- Which facades are suitable for AR advertising based on street visibility
- Optimal zone placement positions avoiding architectural features (windows, doors, ornamental elements)
- Sun exposure and lighting conditions affecting AR content visibility
- Obstruction analysis from nearby buildings or structures

**Zone Standardization Engine:** The invention includes a database of standardized advertising formats with predefined dimensions:
```javascript
ZONE_STANDARDS = {
  bulletin: { width: 48.0, height: 14.0, unit: 'feet' },
  '30-sheet': { width: 24.5, height: 12.25, unit: 'feet' },
  '6-sheet': { width: 6.0, height: 4.0, unit: 'feet' },
  custom: { width: null, height: null, validation: 'required' }
}
```

This ensures consistency across properties and enables apples-to-apples comparison of pricing and availability.

**Spatial Rights Verification:** The system provides cryptographic verification of spatial advertising rights through:
- Database-level row ownership attribution
- Timestamp-based proof of prior claim establishment
- Digital signatures linking zone definitions to property owner identities
- Immutable audit logs of zone creation, modification, and deletion events

## DETAILED DESCRIPTION OF THE INVENTION

### System Architecture

The AR Zone Mapping System consists of multiple integrated components operating on a distributed cloud infrastructure:

**1. Geospatial Database Layer**

The core of the invention is a PostgreSQL database with PostGIS extension enabling advanced spatial operations:

```sql
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE ar_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,

  -- Zone Identification
  zone_name TEXT NOT NULL,
  zone_type TEXT NOT NULL CHECK (zone_type IN
    ('bulletin', '30-sheet', '6-sheet', 'custom', 'entrance', 'rooftop')),
  facade_direction TEXT CHECK (facade_direction IN
    ('north', 'south', 'east', 'west', 'rooftop', 'entrance')),

  -- Physical Dimensions
  width_feet DECIMAL(8,2) NOT NULL,
  height_feet DECIMAL(8,2) NOT NULL,
  square_footage DECIMAL(10,2) GENERATED ALWAYS AS
    (width_feet * height_feet) STORED,

  -- Spatial Boundaries (WGS84 coordinate system)
  zone_boundaries GEOGRAPHY(POLYGON, 4326),
  elevation_feet DECIMAL(8,2),

  -- Visibility and Performance Metrics
  visibility_score INTEGER CHECK (visibility_score >= 1 AND visibility_score <= 10),
  traffic_exposure_score INTEGER CHECK
    (traffic_exposure_score >= 1 AND traffic_exposure_score <= 10),
  engagement_rate DECIMAL(5,4),

  -- Pricing
  base_price_monthly INTEGER NOT NULL,
  premium_multiplier DECIMAL(3,2) DEFAULT 1.0,

  -- Availability
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN
    ('available', 'booked', 'maintenance', 'reserved')),

  -- Content Restrictions
  content_restrictions JSONB,
  max_booking_duration_months INTEGER DEFAULT 12,
  min_booking_duration_months INTEGER DEFAULT 1,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geospatial Index for Fast Spatial Queries
CREATE INDEX idx_zones_boundaries ON ar_zones USING GIST (zone_boundaries);
CREATE INDEX idx_zones_availability ON ar_zones (availability_status);
```

**2. Zone Boundary Calculation Algorithm**

The system automatically generates precise polygon boundaries for AR zones given a property footprint and desired zone specifications:

```python
def calculate_zone_boundaries(property_polygon, facade_direction,
                              width_feet, height_feet, elevation_feet):
    """
    Calculate precise WGS84 polygon boundaries for an AR advertising zone.

    Args:
        property_polygon: PostGIS POLYGON representing building footprint
        facade_direction: String ('north', 'south', 'east', 'west', etc.)
        width_feet: Zone width in feet
        height_feet: Zone height in feet
        elevation_feet: Height above ground level

    Returns:
        PostGIS POLYGON with precise zone boundaries
    """

    # Step 1: Extract facade edge from building polygon
    facade_edge = extract_facade_edge(property_polygon, facade_direction)

    # Step 2: Calculate cardinal direction vector
    direction_vector = get_cardinal_vector(facade_direction)

    # Step 3: Find optimal zone placement along facade
    placement_point = find_optimal_placement(
        facade_edge,
        width_feet,
        clearance_from_edges=2.0  # 2 feet clearance
    )

    # Step 4: Convert feet to meters for geospatial calculations
    width_meters = width_feet * 0.3048
    height_meters = height_feet * 0.3048
    elevation_meters = elevation_feet * 0.3048

    # Step 5: Calculate corner coordinates accounting for Earth's curvature
    zone_corners = []

    # Bottom-left corner
    bl_point = offset_coordinate(placement_point,
                                 azimuth=direction_vector - 90,
                                 distance_meters=width_meters/2)
    bl_elevated = elevate_coordinate(bl_point, elevation_meters)
    zone_corners.append(bl_elevated)

    # Bottom-right corner
    br_point = offset_coordinate(placement_point,
                                azimuth=direction_vector + 90,
                                distance_meters=width_meters/2)
    br_elevated = elevate_coordinate(br_point, elevation_meters)
    zone_corners.append(br_elevated)

    # Top-right corner
    tr_point = offset_coordinate(br_point,
                                azimuth=direction_vector,
                                distance_meters=height_meters)
    tr_elevated = elevate_coordinate(tr_point,
                                    elevation_meters + height_meters)
    zone_corners.append(tr_elevated)

    # Top-left corner
    tl_point = offset_coordinate(bl_point,
                                azimuth=direction_vector,
                                distance_meters=height_meters)
    tl_elevated = elevate_coordinate(tl_point,
                                    elevation_meters + height_meters)
    zone_corners.append(tl_elevated)

    # Close polygon
    zone_corners.append(zone_corners[0])

    # Step 6: Create PostGIS POLYGON from coordinates
    polygon_wkt = create_polygon_wkt(zone_corners)

    # Step 7: Validate polygon doesn't exceed property boundaries
    if not validate_zone_within_property(polygon_wkt, property_polygon):
        raise ZoneBoundaryError("Calculated zone exceeds property boundaries")

    # Step 8: Check for conflicts with existing zones
    if check_spatial_conflicts(polygon_wkt, property_id):
        raise ZoneConflictError("Zone overlaps with existing zone")

    return polygon_wkt

def offset_coordinate(base_coord, azimuth, distance_meters):
    """
    Calculate new lat/lng coordinate offset from base point.
    Uses Haversine formula to account for Earth's curvature.
    """
    lat1 = math.radians(base_coord.latitude)
    lon1 = math.radians(base_coord.longitude)
    bearing = math.radians(azimuth)

    angular_distance = distance_meters / EARTH_RADIUS_METERS

    lat2 = math.asin(
        math.sin(lat1) * math.cos(angular_distance) +
        math.cos(lat1) * math.sin(angular_distance) * math.cos(bearing)
    )

    lon2 = lon1 + math.atan2(
        math.sin(bearing) * math.sin(angular_distance) * math.cos(lat1),
        math.cos(angular_distance) - math.sin(lat1) * math.sin(lat2)
    )

    return Coordinate(
        latitude=math.degrees(lat2),
        longitude=math.degrees(lon2)
    )
```

**3. Spatial Conflict Detection Engine**

The system employs both database-level and application-level conflict detection:

**Database-Level Temporal Conflict Prevention:**

```sql
-- Prevent overlapping bookings for same zone
CONSTRAINT no_overlapping_bookings EXCLUDE USING gist (
  zone_id WITH =,
  daterange(start_date, end_date, '[]') WITH &&
) WHERE (booking_status != 'cancelled')
```

**Application-Level Spatial Overlap Detection:**

```javascript
async function checkSpatialConflicts(newZonePolygon, propertyId) {
  // Query existing zones for same property using PostGIS intersection
  const query = `
    SELECT id, zone_name, ST_AsGeoJSON(zone_boundaries) as boundaries
    FROM ar_zones
    WHERE property_id = $1
      AND availability_status != 'deleted'
      AND ST_Intersects(
        zone_boundaries::geometry,
        ST_GeogFromText($2)::geometry
      )
  `;

  const conflicts = await db.query(query, [propertyId, newZonePolygon]);

  if (conflicts.rows.length > 0) {
    return {
      hasConflict: true,
      conflictingZones: conflicts.rows.map(row => ({
        id: row.id,
        name: row.zone_name,
        overlapArea: calculateOverlapArea(
          newZonePolygon,
          row.boundaries
        )
      }))
    };
  }

  return { hasConflict: false };
}

function calculateOverlapArea(polygon1, polygon2) {
  // Use PostGIS ST_Intersection and ST_Area functions
  const query = `
    SELECT ST_Area(
      ST_Intersection(
        ST_GeogFromText($1)::geometry,
        ST_GeogFromText($2)::geometry
      )
    ) as overlap_area
  `;

  const result = await db.query(query, [polygon1, polygon2]);
  return result.rows[0].overlap_area;
}
```

**4. Zone Type Classification System**

The invention includes an automated classification engine that standardizes zone types:

```javascript
const ZONE_TYPE_SPECIFICATIONS = {
  bulletin: {
    dimensions: { width_feet: 48.0, height_feet: 14.0 },
    tolerance_percent: 5,
    typical_locations: ['highway_facing', 'major_intersection', 'high_rise_facade'],
    minimum_visibility_score: 7,
    pricing_tier: 'premium'
  },
  '30-sheet': {
    dimensions: { width_feet: 24.5, height_feet: 12.25 },
    tolerance_percent: 5,
    typical_locations: ['urban_street', 'shopping_district', 'transit_hub'],
    minimum_visibility_score: 6,
    pricing_tier: 'standard'
  },
  '6-sheet': {
    dimensions: { width_feet: 6.0, height_feet: 4.0 },
    tolerance_percent: 10,
    typical_locations: ['pedestrian_zone', 'neighborhood', 'storefront'],
    minimum_visibility_score: 4,
    pricing_tier: 'economy'
  },
  entrance: {
    dimensions: { width_feet: null, height_feet: null },
    tolerance_percent: null,
    typical_locations: ['building_entrance', 'lobby', 'main_doorway'],
    minimum_visibility_score: 7,
    pricing_tier: 'premium',
    special_requirements: {
      proximity_to_entrance: { max_distance_feet: 15 },
      pedestrian_clearance: { min_clearance_feet: 8 }
    }
  },
  rooftop: {
    dimensions: { width_feet: null, height_feet: null },
    tolerance_percent: null,
    typical_locations: ['rooftop', 'helipad', 'penthouse_level'],
    minimum_visibility_score: 8,
    pricing_tier: 'ultra_premium',
    special_requirements: {
      minimum_building_height_feet: 150,
      aerial_visibility_required: true
    }
  },
  custom: {
    dimensions: { width_feet: null, height_feet: null },
    tolerance_percent: null,
    typical_locations: ['any'],
    minimum_visibility_score: 1,
    pricing_tier: 'variable',
    validation: {
      require_manual_approval: true,
      require_dimensions: true,
      require_justification: true
    }
  }
};

function classifyZoneType(width_feet, height_feet, location_context) {
  // Attempt to match against standard types
  for (const [type_name, spec] of Object.entries(ZONE_TYPE_SPECIFICATIONS)) {
    if (!spec.dimensions.width_feet) continue; // Skip non-standardized types

    const width_tolerance = spec.dimensions.width_feet * (spec.tolerance_percent / 100);
    const height_tolerance = spec.dimensions.height_feet * (spec.tolerance_percent / 100);

    const width_match = Math.abs(width_feet - spec.dimensions.width_feet) <= width_tolerance;
    const height_match = Math.abs(height_feet - spec.dimensions.height_feet) <= height_tolerance;

    if (width_match && height_match) {
      return {
        zone_type: type_name,
        confidence: 'high',
        standardized_dimensions: spec.dimensions,
        pricing_tier: spec.pricing_tier
      };
    }
  }

  // No standard match found - classify as custom
  return {
    zone_type: 'custom',
    confidence: 'requires_manual_review',
    actual_dimensions: { width_feet, height_feet },
    pricing_tier: 'variable'
  };
}
```

**5. Visibility Score Calculation Algorithm**

The system calculates objective visibility scores for each zone based on multiple factors:

```python
def calculate_visibility_score(zone, property, surrounding_context):
    """
    Calculate 1-10 visibility score for AR advertising zone.

    Factors considered:
    - Elevation above ground
    - Obstruction from nearby buildings
    - Distance from major traffic routes
    - Facade orientation relative to sun path
    - Typical viewing angles and distances
    """

    score_components = []

    # Component 1: Elevation Score (higher is more visible from distance)
    if zone.elevation_feet < 20:
        elevation_score = 3
    elif zone.elevation_feet < 50:
        elevation_score = 5
    elif zone.elevation_feet < 100:
        elevation_score = 7
    elif zone.elevation_feet < 300:
        elevation_score = 9
    else:
        elevation_score = 10
    score_components.append(elevation_score)

    # Component 2: Obstruction Analysis
    obstruction_score = calculate_obstruction_score(
        zone.zone_boundaries,
        surrounding_context.nearby_buildings,
        max_distance_meters=500
    )
    score_components.append(obstruction_score)

    # Component 3: Traffic Proximity Score
    traffic_score = calculate_traffic_proximity_score(
        zone.zone_boundaries,
        surrounding_context.major_roads,
        surrounding_context.pedestrian_paths
    )
    score_components.append(traffic_score)

    # Component 4: Facade Orientation Score
    orientation_score = calculate_orientation_score(
        zone.facade_direction,
        property.coordinates.latitude,
        property.coordinates.longitude
    )
    score_components.append(orientation_score)

    # Component 5: Size and Prominence Score
    size_score = calculate_size_prominence_score(
        zone.square_footage,
        property.total_facade_area_sqft
    )
    score_components.append(size_score)

    # Weighted average with emphasis on obstruction and traffic
    weighted_score = (
        elevation_score * 0.15 +
        obstruction_score * 0.30 +
        traffic_score * 0.35 +
        orientation_score * 0.10 +
        size_score * 0.10
    )

    # Round to integer 1-10 scale
    final_score = max(1, min(10, round(weighted_score)))

    return {
        'visibility_score': final_score,
        'component_scores': {
            'elevation': elevation_score,
            'obstruction': obstruction_score,
            'traffic': traffic_score,
            'orientation': orientation_score,
            'size': size_score
        },
        'calculation_timestamp': datetime.utcnow(),
        'confidence_level': assess_calculation_confidence(surrounding_context)
    }

def calculate_obstruction_score(zone_polygon, nearby_buildings, max_distance_meters):
    """
    Analyze how much nearby buildings obstruct views of this zone.
    Uses raycasting from typical viewing positions.
    """

    viewing_positions = generate_viewing_positions(
        zone_polygon,
        distances=[50, 100, 200, 500],  # meters
        angles=range(0, 360, 30)  # every 30 degrees
    )

    total_rays = len(viewing_positions)
    unobstructed_rays = 0

    for position in viewing_positions:
        ray_clear = True

        for building in nearby_buildings:
            if ray_intersects_building(position, zone_polygon, building):
                ray_clear = False
                break

        if ray_clear:
            unobstructed_rays += 1

    obstruction_percentage = (unobstructed_rays / total_rays) * 100

    # Convert to 1-10 scale
    if obstruction_percentage >= 90:
        return 10
    elif obstruction_percentage >= 75:
        return 8
    elif obstruction_percentage >= 60:
        return 6
    elif obstruction_percentage >= 40:
        return 4
    else:
        return 2
```

### Technical Specifications

**Database Schema Details:**

The invention utilizes PostgreSQL 14+ with PostGIS 3.3+ extension for geospatial operations. Key technical specifications include:

- **Coordinate System:** EPSG:4326 (WGS84) for global compatibility
- **Spatial Data Type:** GEOGRAPHY for accurate distance calculations on Earth's surface
- **Spatial Indexing:** GiST (Generalized Search Tree) indexes for O(log n) spatial queries
- **Precision:** Sub-meter accuracy using DECIMAL(8,2) for coordinates
- **Performance:** Spatial queries return results in <50ms for databases with 100,000+ zones

**API Endpoints:**

```javascript
// Zone Creation API
POST /api/ar-zones
{
  "property_id": "uuid",
  "zone_name": "North Facade Premium",
  "zone_type": "bulletin",
  "facade_direction": "north",
  "width_feet": 48.0,
  "height_feet": 14.0,
  "elevation_feet": 120.0,
  "base_price_monthly": 250000,
  "content_restrictions": {
    "prohibited_categories": ["alcohol", "tobacco"],
    "time_restrictions": {
      "quiet_hours": "22:00-06:00"
    }
  }
}

// Response includes calculated boundaries
{
  "zone_id": "uuid",
  "zone_boundaries": {
    "type": "Polygon",
    "coordinates": [[
      [-73.9857, 40.7484, 120.0],
      [-73.9856, 40.7484, 120.0],
      [-73.9856, 40.7485, 134.0],
      [-73.9857, 40.7485, 134.0],
      [-73.9857, 40.7484, 120.0]
    ]]
  },
  "visibility_score": 9,
  "calculated_square_footage": 672,
  "status": "available"
}

// Spatial Query API
GET /api/ar-zones/search?lat=40.7484&lng=-73.9857&radius_miles=1&zone_type=bulletin&available=true

// Returns all available bulletin zones within 1 mile
```

**Data Structures:**

```typescript
interface ARZone {
  id: UUID;
  property_id: UUID;
  zone_name: string;
  zone_type: 'bulletin' | '30-sheet' | '6-sheet' | 'custom' | 'entrance' | 'rooftop';
  facade_direction: 'north' | 'south' | 'east' | 'west' | 'rooftop' | 'entrance';

  // Physical dimensions
  width_feet: number;
  height_feet: number;
  square_footage: number;  // Auto-calculated
  elevation_feet: number;

  // Geospatial data
  zone_boundaries: GeoJSONPolygon;  // PostGIS GEOGRAPHY as GeoJSON

  // Scoring and metrics
  visibility_score: number;  // 1-10 scale
  traffic_exposure_score: number;  // 1-10 scale
  engagement_rate: number;  // 0.0000 to 1.0000

  // Pricing
  base_price_monthly: number;  // In cents
  premium_multiplier: number;  // Decimal multiplier

  // Availability
  availability_status: 'available' | 'booked' | 'maintenance' | 'reserved';
  current_booking?: {
    booking_id: UUID;
    advertiser: string;
    end_date: Date;
  };

  // Restrictions
  content_restrictions: ContentRestrictions;
  max_booking_duration_months: number;
  min_booking_duration_months: number;

  // Metadata
  created_at: Date;
  updated_at: Date;
}

interface ContentRestrictions {
  prohibited_categories?: string[];
  required_approvals?: string[];
  time_restrictions?: {
    quiet_hours?: string;
    blackout_dates?: Date[];
  };
  creative_guidelines?: {
    max_brightness?: number;
    max_animation_fps?: number;
    prohibited_sounds?: boolean;
  };
}
```

### Implementation Details

**Zone Creation Workflow:**

1. **Property Owner Initiates Zone Definition:** Property owner accesses administrative interface and selects building footprint on interactive map
2. **Automated Facade Analysis:** System analyzes building geometry using OpenStreetMap data or uploaded architectural drawings
3. **Zone Placement Recommendations:** Algorithm suggests optimal zone placements based on facade dimensions, visibility, and traffic patterns
4. **Manual Refinement:** Owner adjusts zone boundaries, dimensions, and specifications
5. **Validation and Conflict Check:** System validates zone doesn't overlap existing zones or exceed property boundaries
6. **Pricing Calculation:** Dynamic pricing algorithm calculates base price and premium multiplier
7. **Visibility Score Computation:** Automated visibility analysis considering obstructions, elevation, and traffic
8. **Database Persistence:** Zone record inserted into PostGIS database with spatial indexes
9. **Availability Publication:** Zone appears in marketplace for advertiser booking

**Spatial Query Optimization:**

The system employs multiple optimization strategies for fast spatial queries:

```sql
-- Create composite indexes for common query patterns
CREATE INDEX idx_zones_location_available ON ar_zones
  USING GIST (zone_boundaries)
  WHERE availability_status = 'available';

CREATE INDEX idx_zones_type_status ON ar_zones (zone_type, availability_status);

-- Optimize radius searches with bounding box pre-filter
EXPLAIN ANALYZE
SELECT id, zone_name, ST_Distance(zone_boundaries, ST_MakePoint($1, $2)::geography) as distance
FROM ar_zones
WHERE availability_status = 'available'
  AND zone_boundaries && ST_Expand(ST_MakePoint($1, $2)::geography, $3)  -- Bounding box filter
  AND ST_DWithin(zone_boundaries, ST_MakePoint($1, $2)::geography, $3)  -- Precise distance filter
ORDER BY distance
LIMIT 20;

-- Result: Query execution time <50ms for 100k zone database
```

**Error Handling and Edge Cases:**

```javascript
class ZoneBoundaryCalculator {
  async createZone(zoneRequest) {
    try {
      // Validate input dimensions
      this.validateDimensions(zoneRequest);

      // Check property ownership
      await this.verifyPropertyOwnership(zoneRequest.property_id);

      // Calculate boundaries
      const boundaries = await this.calculateBoundaries(zoneRequest);

      // Validate boundaries
      await this.validateBoundaries(boundaries, zoneRequest.property_id);

      // Check conflicts
      const conflicts = await this.checkConflicts(boundaries, zoneRequest.property_id);
      if (conflicts.length > 0) {
        throw new ZoneConflictError('Zone overlaps with existing zones', conflicts);
      }

      // Insert into database
      const zone = await this.insertZone({
        ...zoneRequest,
        zone_boundaries: boundaries,
        visibility_score: await this.calculateVisibilityScore(boundaries),
        created_at: new Date()
      });

      return zone;

    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof ZoneConflictError) {
        throw new ConflictError(error.message, error.conflicts);
      } else if (error instanceof DatabaseError) {
        this.logger.error('Database error creating zone', error);
        throw new InternalServerError('Failed to create zone');
      } else {
        throw error;
      }
    }
  }

  validateDimensions(request) {
    if (request.width_feet <= 0 || request.height_feet <= 0) {
      throw new ValidationError('Dimensions must be positive');
    }

    if (request.width_feet > 200 || request.height_feet > 200) {
      throw new ValidationError('Dimensions exceed maximum allowed (200ft)');
    }

    const aspectRatio = request.width_feet / request.height_feet;
    if (aspectRatio > 20 || aspectRatio < 0.05) {
      throw new ValidationError('Aspect ratio must be between 0.05 and 20');
    }
  }
}
```

### Example Embodiments

**Embodiment 1: Times Square Billboard Building AR Zone**

A property owner with a building at Times Square (1 Times Square, NYC) creates an AR advertising zone:

- **Property:** Times Square Billboard Building
- **Zone Type:** Custom LED Wall
- **Dimensions:** 68 feet wide × 42 feet tall
- **Elevation:** 85 feet above ground
- **Facade Direction:** North-facing
- **Calculated Boundaries:** PostGIS polygon with coordinates:
  ```
  POLYGON((-73.985700 40.758000 85, -73.985650 40.758000 85,
           -73.985650 40.758050 127, -73.985700 40.758050 127,
           -73.985700 40.758000 85))
  ```
- **Visibility Score:** 10/10 (unobstructed, high traffic, premium location)
- **Traffic Exposure Score:** 10/10 (150,000 daily foot traffic)
- **Base Price:** $500,000/month
- **Premium Multiplier:** 2.0x (Times Square location)
- **Final Price:** $1,000,000/month

The system automatically:
1. Validates the zone doesn't exceed building footprint
2. Checks for conflicts with existing zones (none found)
3. Calculates precise WGS84 coordinates for all four corners
4. Indexes the zone for spatial queries
5. Lists zone as available in marketplace
6. Notifies registered advertisers interested in Times Square locations

**Embodiment 2: Shopping Mall Entrance AR Zone**

A major mall operator (Simon Property Group) managing 232 properties creates standardized entrance zones across their portfolio:

- **Property:** King of Prussia Mall, PA
- **Zone Type:** Entrance
- **Dimensions:** 22 feet wide × 10 feet tall
- **Elevation:** 8 feet above ground (eye level)
- **Facade Direction:** Entrance
- **Location:** Main entrance facing parking lot
- **Calculated Boundaries:** Polygon positioned 5 feet from entrance doors
- **Visibility Score:** 9/10 (high foot traffic, unobstructed)
- **Traffic Exposure Score:** 10/10 (all visitors pass through entrance)
- **Base Price:** $150,000/month
- **Premium Multiplier:** 1.8x (main entrance premium)
- **Final Price:** $270,000/month

The system enables Simon Property Group to:
1. Create template specifications for entrance zones
2. Apply template across all 232 properties with one operation
3. Automatically adjust pricing based on property-specific traffic data
4. Manage availability centrally through admin dashboard
5. Generate revenue reports aggregated across entire portfolio

**Embodiment 3: High-Rise Office Building Multi-Zone Configuration**

A developer (Hines) with a 75-story office tower creates multiple zones on different facades:

**North Facade Zone:**
- Type: Bulletin
- Dimensions: 48' × 14'
- Elevation: 520 feet
- Visibility: 8/10 (partially obstructed by nearby buildings)
- Price: $180,000/month

**South Facade Zone:**
- Type: Bulletin
- Dimensions: 48' × 14'
- Elevation: 520 feet
- Visibility: 9/10 (clear downtown views)
- Price: $220,000/month

**East Facade Zone:**
- Type: 30-Sheet
- Dimensions: 24.5' × 12.25'
- Elevation: 450 feet
- Visibility: 7/10 (morning sun glare reduces afternoon visibility)
- Price: $120,000/month

**Rooftop Zone:**
- Type: Custom
- Dimensions: 100' × 100' (helicopter visibility)
- Elevation: 1,002 feet
- Visibility: 10/10 (visible from all directions, no obstructions)
- Price: $500,000/month

The system automatically:
1. Calculates distinct boundaries for each facade
2. Ensures zones don't overlap at building corners
3. Applies facade-specific pricing adjustments
4. Enables advertisers to book multiple zones as package deals
5. Tracks individual zone performance metrics

**Embodiment 4: Retail Storefront Pedestrian Zone**

A small business owner creates a street-level AR zone:

- **Property:** Apple Fifth Avenue Store
- **Zone Type:** 6-Sheet
- **Dimensions:** 6 feet × 4 feet
- **Elevation:** 7 feet (just above eye level)
- **Facade Direction:** West-facing (Fifth Avenue)
- **Visibility Score:** 9/10 (luxury shopping district)
- **Traffic Exposure Score:** 8/10 (25,000 daily pedestrians)
- **Base Price:** $8,000/month
- **Premium Multiplier:** 1.5x (Fifth Avenue location)
- **Final Price:** $12,000/month

This demonstrates scalability from mega-properties to small storefronts.

**Embodiment 5: Stadium Rooftop AR Zone**

A sports venue creates a rooftop AR zone visible from surrounding areas and aerial views:

- **Property:** Major League Baseball Stadium
- **Zone Type:** Rooftop
- **Dimensions:** 200 feet × 50 feet
- **Elevation:** 180 feet (rooftop level)
- **Facade Direction:** Rooftop (horizontal)
- **Visibility Score:** 10/10 (visible from highways, residential towers, helicopters)
- **Special Requirements:**
  - Drone flight path clearance approved
  - Coordinated with FAA airspace regulations
  - Event-based dynamic pricing
- **Base Price:** $300,000/month (off-season)
- **Event Premium:** 5.0x multiplier during game days
- **Peak Price:** $1,500,000/month (championship season)

The system handles:
1. Dynamic pricing based on event calendar
2. Temporary availability restrictions during drone operations
3. Special content approval requirements for aerial visibility
4. Integration with stadium event management system

## CLAIMS

### Independent Claims

**Claim 1:** A method for defining augmented reality advertising zones on physical building structures comprising:
- Receiving property footprint data as geospatial polygon coordinates in a standardized coordinate reference system;
- Receiving zone specification parameters including width, height, elevation, and facade direction;
- Calculating precise three-dimensional zone boundary coordinates using geospatial offset algorithms accounting for Earth's curvature;
- Storing zone boundaries as PostGIS GEOGRAPHY polygon data structures in a spatial database;
- Creating spatial indexes using GiST indexing for efficient spatial query performance;
- Validating zone boundaries do not exceed property boundaries using PostGIS ST_Contains validation;
- Detecting conflicts with existing zones using PostGIS ST_Intersects spatial intersection queries;
- Assigning unique identifiers to validated zones and persisting to database.

**Claim 2:** A system for managing exclusive advertising rights to augmented reality content displayed on physical buildings comprising:
- A PostgreSQL database with PostGIS extension storing building footprints and AR zone boundaries;
- A zone classification engine categorizing zones according to standardized outdoor advertising formats;
- A spatial conflict detection module preventing overlapping zone assignments;
- A temporal conflict detection module preventing overlapping booking periods;
- A dynamic pricing algorithm calculating zone value based on visibility scores, traffic exposure, market tier, and location attributes;
- An API layer exposing zone creation, search, and booking endpoints to client applications.

**Claim 3:** A method for calculating visibility scores for augmented reality advertising zones comprising:
- Analyzing elevation of zone above ground level;
- Performing raycasting analysis from multiple viewing positions to detect obstructions from nearby buildings;
- Calculating proximity to major traffic routes and pedestrian pathways;
- Analyzing facade orientation relative to sun path and typical viewing angles;
- Calculating size prominence relative to total building facade area;
- Computing weighted average of component scores to generate final visibility score on 1-10 scale.

**Claim 4:** A method for preventing conflicting augmented reality advertising zone assignments comprising:
- Implementing PostgreSQL exclusion constraint using GiST indexing on zone_id and daterange;
- Automatically rejecting booking attempts that overlap existing confirmed bookings;
- Performing spatial intersection queries to detect overlapping zone boundaries;
- Maintaining audit log of all conflict detection events;
- Providing conflict resolution recommendations to property owners and advertisers.

**Claim 5:** A system for standardizing augmented reality advertising zone types comprising:
- A database of standard advertising formats with predefined dimensions (bulletin 48'×14', 30-sheet 24.5'×12.25', 6-sheet 6'×4');
- A classification algorithm matching proposed zones to standard types within tolerance thresholds;
- A pricing tier assignment module applying standard pricing multipliers to recognized zone types;
- A custom zone validation workflow requiring manual approval for non-standard configurations.

**Claim 6:** A method for automated pricing of augmented reality advertising zones comprising:
- Retrieving base price from standardized zone type classification;
- Applying premium multiplier based on specific zone characteristics (corner location, main entrance, etc.);
- Applying market tier multiplier based on property location classification (premium 1.5x, standard 1.0x, secondary 0.7x);
- Normalizing visibility score to multiplier range (0.1x to 1.0x);
- Calculating final price as: base_price × premium_multiplier × market_tier_multiplier × visibility_multiplier;
- Storing pricing calculation methodology and component values for audit purposes.

**Claim 7:** A method for geospatial querying of available augmented reality advertising zones comprising:
- Receiving search parameters including center coordinates, radius distance, zone type filters, and availability status;
- Constructing PostGIS spatial query with bounding box pre-filter for performance optimization;
- Executing ST_DWithin distance query against spatially-indexed zone boundaries;
- Filtering results by zone type, availability status, and pricing constraints;
- Sorting results by distance from search center or by calculated relevance score;
- Returning paginated result set with zone metadata and distance calculations.

### Dependent Claims

**Claim 8:** The method of Claim 1, wherein calculating precise three-dimensional zone boundary coordinates further comprises:
- Extracting facade edge from building footprint polygon based on facade direction;
- Calculating cardinal direction vector (0° for north, 90° for east, 180° for south, 270° for west);
- Finding optimal placement point along facade edge with minimum clearance from building corners;
- Converting dimensional measurements from feet to meters using conversion factor 0.3048;
- Applying Haversine formula to calculate latitude and longitude offsets accounting for Earth's spherical geometry;
- Generating corner coordinates for zone polygon including elevation component;
- Validating resulting polygon is simple (non-self-intersecting) and properly oriented.

**Claim 9:** The method of Claim 1, wherein validating zone boundaries further comprises:
- Querying property footprint polygon from database using property_id;
- Executing PostGIS ST_Contains(property_polygon, zone_polygon) validation;
- Executing PostGIS ST_IsValid(zone_polygon) topology validation;
- Verifying zone elevation does not exceed building height;
- Verifying zone dimensions meet minimum and maximum thresholds;
- Verifying zone aspect ratio falls within acceptable range;
- Rejecting zone creation if any validation fails with specific error messages.

**Claim 10:** The system of Claim 2, wherein the zone classification engine further comprises:
- A lookup table of standard outdoor advertising formats with dimensional specifications;
- A tolerance calculation module computing acceptable variance ranges (typically 5% for standard types);
- A dimensional matching algorithm comparing proposed zones against standard specifications;
- A confidence scoring module indicating certainty of classification;
- A custom zone validation workflow for non-standard configurations requiring manual review.

**Claim 11:** The system of Claim 2, wherein the spatial conflict detection module further comprises:
- A PostGIS query executor performing ST_Intersects operations on zone_boundaries column;
- An overlap area calculator using ST_Intersection and ST_Area functions;
- A conflict severity classifier categorizing overlaps as minor (<10% area), moderate (10-50%), or major (>50%);
- A conflict resolution recommender suggesting boundary adjustments to eliminate overlaps;
- An audit logging system recording all detected conflicts and resolution actions.

**Claim 12:** The system of Claim 2, wherein the temporal conflict detection module further comprises:
- A PostgreSQL exclusion constraint using GiST indexing on zone_id and daterange columns;
- A custom range operator (&&) detecting overlapping date ranges;
- A booking status filter excluding cancelled bookings from conflict detection;
- An availability calendar generator showing booked and available time periods;
- A notification system alerting property owners of booking conflicts requiring resolution.

**Claim 13:** The method of Claim 3, wherein performing raycasting analysis further comprises:
- Generating viewing positions at multiple distances (50m, 100m, 200m, 500m) and angles (every 30°);
- Querying nearby buildings within maximum analysis distance from spatial database;
- Testing each ray from viewing position to zone centroid for intersection with building geometries;
- Calculating percentage of unobstructed rays (rays with clear line of sight);
- Converting obstruction percentage to 1-10 scale score (90%+ unobstructed = 10, <40% = 2);
- Weighting obstruction score at 30% of total visibility calculation.

**Claim 14:** The method of Claim 3, wherein calculating proximity to major traffic routes further comprises:
- Querying OpenStreetMap or proprietary traffic data for road classifications;
- Identifying highways, arterial roads, and major pedestrian pathways within analysis radius;
- Calculating minimum distance from zone to each traffic route using ST_Distance function;
- Retrieving average daily traffic counts for each nearby route;
- Computing weighted traffic exposure score based on proximity and volume;
- Applying distance decay function (closer routes contribute more to score).

**Claim 15:** The method of Claim 4, wherein implementing PostgreSQL exclusion constraint further comprises:
- Creating GiST index on daterange(start_date, end_date, '[]') expression;
- Defining exclusion constraint with zone_id equality operator and daterange overlap operator;
- Applying WHERE clause to exclude cancelled bookings from constraint enforcement;
- Configuring constraint to trigger on INSERT and UPDATE operations;
- Returning detailed error message identifying conflicting booking when constraint violated.

**Claim 16:** The method of Claim 6, wherein applying market tier multiplier further comprises:
- Classifying properties into three market tiers based on location attributes;
- Tier 1 (Premium): Major metropolitan areas, landmark buildings, high-traffic shopping districts (1.5x multiplier);
- Tier 2 (Standard): Secondary markets, suburban retail centers, mid-size office buildings (1.0x multiplier);
- Tier 3 (Secondary): Tertiary markets, neighborhood retail, smaller properties (0.7x multiplier);
- Storing tier classification in properties table with justification documentation;
- Updating tier classifications quarterly based on market performance data.

**Claim 17:** The method of Claim 7, wherein constructing PostGIS spatial query further comprises:
- Creating bounding box using ST_Expand function to pre-filter candidate zones;
- Applying spatial index scan using GiST index on zone_boundaries column;
- Executing precise distance calculation using ST_DWithin with radius parameter;
- Including availability status filter in WHERE clause;
- Optimizing query execution with EXPLAIN ANALYZE to ensure index usage;
- Achieving sub-50ms query performance for databases containing 100,000+ zones.

**Claim 18:** The method of Claim 1, further comprising automatic building footprint extraction:
- Ingesting satellite imagery or LiDAR point cloud data;
- Applying computer vision algorithms to detect building outlines;
- Converting detected outlines to polygon geometries;
- Validating polygon topology and correcting defects;
- Transforming coordinates to EPSG:4326 WGS84 coordinate reference system;
- Storing extracted footprints in properties table with quality score metadata.

**Claim 19:** The method of Claim 1, further comprising facade orientation detection:
- Analyzing building footprint polygon to identify distinct edges;
- Calculating azimuth bearing for each edge using geodetic calculations;
- Classifying edges as north, south, east, or west based on azimuth ranges;
- Identifying corner zones where two facades intersect;
- Recommending optimal facade for zone placement based on visibility analysis;
- Storing facade metadata with each zone record.

**Claim 20:** The system of Claim 2, further comprising blockchain integration for rights verification:
- Generating cryptographic hash of zone definition including boundaries and ownership;
- Recording zone creation transaction on distributed ledger;
- Creating non-fungible token (NFT) representing exclusive advertising rights;
- Implementing smart contract for automated royalty distribution;
- Providing immutable audit trail of zone ownership transfers;
- Enabling verification of advertising rights through blockchain queries.

**Claim 21:** The method of Claim 3, further comprising machine learning visibility prediction:
- Training convolutional neural network on historical visibility scores and satellite imagery;
- Extracting image features from aerial photographs of zone location;
- Predicting visibility score with confidence interval;
- Comparing ML prediction to rule-based calculation;
- Flagging significant discrepancies for manual review;
- Continuously improving model accuracy with new training data.

**Claim 22:** The system of Claim 2, further comprising dynamic pricing based on demand:
- Tracking search queries and booking requests for each zone;
- Calculating demand score based on query frequency and booking conversion rate;
- Adjusting base prices automatically when demand exceeds threshold;
- Implementing surge pricing during high-demand periods (holidays, major events);
- Providing price elasticity analysis and revenue optimization recommendations;
- Constraining automatic price adjustments within configured min/max bounds.

**Claim 23:** The method of Claim 7, further comprising personalized zone recommendations:
- Building advertiser profile based on previous bookings and campaign objectives;
- Analyzing zone attributes matching advertiser preferences;
- Calculating match score between advertiser profile and available zones;
- Ranking search results by personalized relevance rather than distance;
- Providing explanation of recommendation rationale;
- Learning from advertiser feedback to improve future recommendations.

**Claim 24:** The system of Claim 2, further comprising multi-zone package optimization:
- Identifying zones that provide complementary coverage (different facades, locations);
- Calculating package discounts for booking multiple zones simultaneously;
- Optimizing zone combinations to maximize advertiser reach within budget;
- Suggesting strategic zone portfolios for campaign objectives (brand awareness, event promotion);
- Coordinating synchronized content delivery across multiple zones;
- Managing package-level pricing and availability constraints.

**Claim 25:** The method of Claim 1, further comprising automated zone subdivision:
- Analyzing large facade areas to identify optimal subdivision strategies;
- Generating multiple smaller zones from single large facade;
- Ensuring subdivided zones conform to standard advertising formats;
- Maximizing total revenue potential through optimal subdivision;
- Preventing excessive fragmentation that reduces individual zone value;
- Providing visualization of subdivision alternatives to property owners.

## DRAWINGS

The following drawings illustrate key aspects of the invention:

**Figure 1: System Architecture Diagram**
- Shows complete system architecture including PostgreSQL/PostGIS database, API layer, zone calculation engine, conflict detection module, pricing engine, and client applications
- Illustrates data flow from property owner zone definition through validation, calculation, and marketplace publication
- Depicts integration with external data sources (OpenStreetMap, traffic data, weather APIs)

**Figure 2: Zone Boundary Calculation Flowchart**
- Step-by-step process for calculating precise WGS84 polygon boundaries
- Inputs: property footprint, facade direction, dimensions, elevation
- Processing steps: facade edge extraction, cardinal vector calculation, optimal placement finding, coordinate transformation, validation
- Outputs: PostGIS GEOGRAPHY polygon with sub-meter accuracy

**Figure 3: Database Schema Entity-Relationship Diagram**
- Properties table with building footprint polygons
- AR_Zones table with zone boundaries, dimensions, pricing
- Bookings table with temporal constraints
- Relationships and foreign keys
- Spatial indexes and constraints

**Figure 4: Spatial Conflict Detection Visualization**
- Example building footprint with multiple defined zones
- Overlapping zone proposal shown in red
- Conflict detection algorithm identifying intersection area
- Resolution recommendation showing adjusted boundary

**Figure 5: Visibility Score Calculation Components**
- Visual representation of visibility score calculation
- Shows elevation component, obstruction analysis raycasting, traffic proximity circles, orientation factors
- Weighted averaging formula
- Example calculation with component scores

**Figure 6: Zone Type Classification Decision Tree**
- Flowchart showing classification algorithm
- Input: proposed width and height
- Decision nodes: tolerance checks, aspect ratio validation
- Output: zone type classification with confidence level

**Figure 7: Multi-Zone Property Configuration**
- High-rise building with zones on multiple facades
- North, south, east facades with different zone types
- Rooftop zone
- Entrance zone
- Color-coded by availability status

**Figure 8: Geospatial Query Execution Flow**
- User initiates radius search from specific coordinates
- Bounding box pre-filter shown on map
- Precise distance calculation
- Filtered and sorted results
- Performance metrics (index scan, execution time)

**Figure 9: Dynamic Pricing Formula Visualization**
- Breakdown of pricing components
- Base price from zone type
- Premium multiplier application
- Market tier adjustment
- Visibility score normalization
- Final calculated price

**Figure 10: Temporal Booking Calendar**
- Timeline showing zone availability over 12-month period
- Existing bookings shown as blocked periods
- Available periods highlighted
- Conflict detection when new booking request overlaps
- Exclusion constraint enforcement

---

**END OF PROVISIONAL PATENT APPLICATION**

This provisional patent application establishes priority date for the inventive concepts disclosed herein. The applicant reserves the right to file non-provisional patent applications claiming priority to this provisional application and to include additional claims, embodiments, and refinements not explicitly enumerated in this disclosure but within the scope of the inventive concepts.

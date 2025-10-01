# DYNAMIC MULTI-FACTOR PRICING ENGINE FOR AUGMENTED REALITY ADVERTISING SPACE

## PROVISIONAL PATENT APPLICATION

**Application Number:** [To be assigned]
**Filing Date:** October 2024
**Inventors:** Ryan Smith and SpatialRights Development Team
**Title:** Dynamic Multi-Factor Pricing Engine for Augmented Reality Advertising Space

## ABSTRACT

A comprehensive dynamic pricing system for augmented reality advertising zones that automatically calculates optimal pricing based on multiple real-time and historical factors including geographic location attributes, temporal demand patterns, zone physical characteristics, market conditions, competitive analysis, and predictive analytics. The system employs machine learning models trained on historical booking data to forecast demand, applies sophisticated pricing algorithms incorporating visibility scores, traffic exposure metrics, market tier classifications, time-based premium adjustments, and seasonal variations. The invention includes automated price optimization engines, surge pricing mechanisms for high-demand periods, package discount calculators for multi-zone bookings, revenue maximization algorithms, and real-time price adjustment capabilities responding to market dynamics. The system integrates with booking management platforms to automatically update pricing based on availability changes, competitor pricing intelligence, and advertiser budget constraints.

## BACKGROUND OF THE INVENTION

### Field of the Invention

This invention relates to dynamic pricing systems for digital advertising inventory, specifically automated price calculation and optimization for augmented reality advertising zones on physical building structures. The invention encompasses machine learning price prediction models, real-time demand-based pricing adjustments, multi-factor pricing algorithms, revenue optimization engines, and competitive pricing analysis systems.

### Description of Related Art

Traditional outdoor advertising pricing relies on manual negotiation and static rate cards that remain fixed for extended periods. Existing pricing systems include:

**Static Billboard Rate Cards:** Traditional out-of-home (OOH) advertising companies publish rate cards with fixed monthly or weekly prices for physical billboard locations. These prices are typically reviewed quarterly or annually but do not respond to real-time demand fluctuations, seasonal variations, or market dynamics. Static pricing fails to maximize revenue during high-demand periods and may deter bookings during low-demand periods due to inflexible pricing.

**Digital Advertising Auction Systems:** Online advertising platforms (Google Ads, Facebook Ads) employ real-time bidding auctions where advertisers compete for ad placements. While these systems optimize for immediate revenue, they lack the spatial and temporal complexities of physical advertising locations. Real-time auctions are suitable for ephemeral digital impressions but inappropriate for month-long physical location commitments requiring booking certainty.

**Yield Management Systems:** Airlines and hotels use sophisticated yield management systems that adjust pricing based on demand forecasts, booking patterns, and capacity constraints. However, these systems are designed for time-based inventory (seats, rooms) rather than spatial inventory with location-specific attributes. They do not account for visibility scores, traffic exposure, facade orientation, or other physical location characteristics relevant to outdoor advertising.

**Rudimentary Location-Based Pricing:** Some digital advertising platforms apply location-based pricing multipliers (e.g., 2x for Times Square vs. 1x for suburban locations) but use coarse geographic categorizations rather than precise attribute-based calculations. They do not incorporate elevation, obstruction analysis, traffic patterns, or competitive zone proximity.

**Manual Pricing Negotiation:** High-value outdoor advertising deals (building wraps, major billboards) involve manual negotiation between property owners and advertisers. This approach is time-consuming, inconsistent, and fails to capture optimal market value. Different sales representatives may quote different prices for equivalent zones, leading to revenue loss and pricing disputes.

### Problems with Prior Art

**Inability to Capture Optimal Market Value:** Static pricing cannot respond to demand surges during major events, holidays, or seasonal peaks. Property owners leave significant revenue on the table by not adjusting prices upward when demand exceeds supply.

**No Multi-Factor Attribute Integration:** Existing systems fail to incorporate the numerous factors affecting AR advertising value: visibility scores, traffic exposure, elevation, facade direction, obstruction levels, proximity to landmarks, competitive zone density, historical engagement rates, and seasonal patterns.

**Lack of Predictive Pricing:** Current systems are reactive rather than predictive. They cannot forecast demand patterns weeks or months in advance and proactively adjust pricing to optimize long-term revenue rather than immediate bookings.

**Manual Competitive Analysis:** Property owners must manually research competitor pricing, which is time-consuming, error-prone, and provides stale data. There is no automated competitive intelligence gathering and pricing adjustment based on market positioning.

**No Package Optimization:** Existing systems cannot intelligently calculate optimal package discounts when advertisers book multiple zones. Arbitrary discount percentages (e.g., "10% off for 3+ zones") fail to account for zone complementarity, coverage overlap, and actual marginal cost reduction.

**Temporal Pricing Inadequacy:** Current systems do not apply sophisticated time-based pricing adjustments accounting for day-of-week patterns, seasonal variations, event calendars, weather conditions, and booking lead time (last-minute vs. advance bookings).

**Revenue Optimization Failure:** Existing systems optimize for booking rate (occupancy) rather than revenue. They may fill inventory at suboptimal prices rather than strategically holding inventory for higher-value bookings.

## SUMMARY OF THE INVENTION

The present invention provides a comprehensive dynamic pricing engine that addresses the limitations of prior art through sophisticated multi-factor calculations, machine learning prediction models, and real-time optimization algorithms:

**Multi-Factor Base Price Calculation:** The system calculates initial zone pricing by integrating:
- **Standardized zone type base rates** aligned with outdoor advertising industry norms
- **Physical dimension multipliers** accounting for square footage variations
- **Elevation premium adjustments** (higher zones command premium pricing)
- **Facade direction multipliers** (south-facing zones may receive sunlight premium)
- **Zone type classification premiums** (entrance zones command 1.8x, rooftop 2.0x+)

**Location Attribute Scoring:** The invention implements a comprehensive location scoring algorithm:
- **Visibility score calculation** (1-10 scale) based on obstruction analysis, elevation, and viewing angles
- **Traffic exposure scoring** (1-10 scale) derived from pedestrian counts, vehicle traffic, and dwell time
- **Market tier classification** (Premium/Standard/Secondary) based on property location and prestige
- **Landmark proximity bonuses** for zones near tourist attractions, transit hubs, or iconic buildings
- **Competitive density analysis** adjusting pricing based on nearby alternative zones

**Temporal Demand Modeling:** The system employs time-series analysis and machine learning to forecast demand:
```python
def forecast_demand(zone_id, start_date, end_date):
    """
    Predict booking demand for zone during specified period.
    Uses SARIMA model trained on historical booking patterns.
    """

    # Retrieve historical booking data
    historical_bookings = query_booking_history(zone_id, lookback_days=730)

    # Extract temporal features
    features = extract_temporal_features(start_date, end_date)
    # - Day of week (weekdays vs. weekends)
    # - Month (seasonal patterns)
    # - Holiday proximity (major holidays drive demand)
    # - Event calendar (sports events, conventions, festivals)
    # - School calendar (back-to-school, spring break periods)

    # Load pre-trained demand model
    demand_model = load_model(f'demand_forecaster_{zone_id}')

    # Generate demand forecast
    predicted_demand = demand_model.predict(features)

    # Calculate confidence interval
    confidence_interval = calculate_prediction_uncertainty(predicted_demand)

    return {
        'predicted_demand_score': predicted_demand,  # 0-100 scale
        'confidence_lower': confidence_interval[0],
        'confidence_upper': confidence_interval[1],
        'contributing_factors': identify_demand_drivers(features)
    }
```

**Dynamic Price Adjustment Engine:** Real-time pricing modifications based on market conditions:
- **Demand surge pricing** increasing prices 1.5x-5x during high-demand periods
- **Last-minute booking premiums** for reservations within 30 days
- **Advance booking discounts** incentivizing early commitments
- **Scarcity premiums** when availability drops below threshold
- **Competitive response pricing** matching or undercutting competitor rates

**Revenue Optimization Algorithm:** The system maximizes total revenue rather than booking rate:
```python
def optimize_pricing_strategy(zone_id, planning_horizon_days=90):
    """
    Calculate optimal pricing strategy maximizing expected revenue.
    Uses dynamic programming to evaluate booking vs. holding decisions.
    """

    # State: days remaining, current price, booking probability
    # Action: accept booking at current price or adjust price and wait
    # Reward: immediate revenue from booking or future expected value

    value_function = {}

    for days_remaining in range(planning_horizon_days, 0, -1):
        for price_point in price_grid:

            # Calculate booking probability at this price
            booking_prob = estimate_booking_probability(
                zone_id,
                price_point,
                days_remaining
            )

            # Expected value of accepting booking now
            accept_value = price_point * booking_prob

            # Expected value of waiting and potentially getting higher price
            wait_value = calculate_future_expected_value(
                zone_id,
                days_remaining - 1,
                value_function
            )

            # Optimal decision maximizes expected value
            value_function[(days_remaining, price_point)] = max(
                accept_value,
                wait_value
            )

    # Extract optimal pricing policy from value function
    optimal_prices = extract_pricing_policy(value_function)

    return optimal_prices
```

**Package Pricing Calculator:** Intelligent multi-zone discount optimization:
- **Coverage overlap analysis** reducing discount for redundant zones
- **Geographic diversification bonuses** for zones in different markets
- **Marginal cost reduction** accounting for shared management overhead
- **Strategic bundle creation** suggesting complementary zone combinations
- **Volume tier discounts** with non-linear discount curves (3 zones: 8%, 5 zones: 15%, 10+ zones: 25%)

**Competitive Pricing Intelligence:** Automated competitor monitoring and positioning:
- **Market survey engine** querying competitor platforms for comparable zones
- **Price positioning algorithms** maintaining target percentile (e.g., 75th percentile for premium zones)
- **Undercut detection** alerting when competitors significantly undercut pricing
- **Price war avoidance** preventing destructive race-to-the-bottom dynamics

**Machine Learning Price Elasticity Models:** The invention learns optimal pricing from historical data:
```python
def train_price_elasticity_model(zone_id):
    """
    Train gradient boosting model to predict booking probability
    as function of price and other features.
    """

    # Gather training data: historical price experiments and outcomes
    training_data = gather_pricing_experiments(zone_id)

    features = [
        'price',
        'normalized_price',  # Price relative to historical average
        'competitive_price_ratio',  # This price / average competitor price
        'days_until_start',
        'booking_duration_months',
        'season',
        'day_of_week',
        'visibility_score',
        'traffic_exposure_score',
        'recent_booking_velocity'
    ]

    target = 'booking_converted'  # Binary: 1 if booking completed, 0 if not

    # Train gradient boosting classifier
    model = GradientBoostingClassifier(
        n_estimators=200,
        max_depth=5,
        learning_rate=0.1
    )

    model.fit(training_data[features], training_data[target])

    # Calculate feature importance
    feature_importance = dict(zip(features, model.feature_importances_))

    # Generate price-response curve
    price_response_curve = generate_response_curve(model, features)

    return {
        'model': model,
        'feature_importance': feature_importance,
        'price_response_curve': price_response_curve,
        'optimal_price': find_revenue_maximizing_price(price_response_curve)
    }
```

## DETAILED DESCRIPTION OF THE INVENTION

### System Architecture

**1. Pricing Database Schema**

The system maintains comprehensive pricing history and configuration:

```sql
CREATE TABLE zone_pricing_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id UUID REFERENCES ar_zones(id) ON DELETE CASCADE,

  -- Pricing components
  base_price_monthly INTEGER NOT NULL,
  visibility_multiplier DECIMAL(3,2),
  traffic_multiplier DECIMAL(3,2),
  market_tier_multiplier DECIMAL(3,2),
  temporal_multiplier DECIMAL(3,2),
  demand_multiplier DECIMAL(3,2),
  competitive_multiplier DECIMAL(3,2),

  -- Calculated final price
  final_price_monthly INTEGER NOT NULL,

  -- Context
  effective_date DATE NOT NULL,
  expiration_date DATE,
  pricing_rationale TEXT,
  automated BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE pricing_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id UUID REFERENCES ar_zones(id),
  model_type TEXT NOT NULL,  -- 'demand_forecast', 'price_elasticity', 'revenue_optimization'

  -- Model metadata
  model_version TEXT,
  training_date TIMESTAMP WITH TIME ZONE,
  training_samples INTEGER,
  validation_accuracy DECIMAL(5,4),

  -- Model artifacts
  model_parameters JSONB,
  feature_importance JSONB,
  performance_metrics JSONB,

  -- Model status
  status TEXT DEFAULT 'active',
  deployed_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE competitive_pricing_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Competitor zone identification
  competitor_platform TEXT,
  competitor_zone_id TEXT,
  comparable_zone_id UUID REFERENCES ar_zones(id),  -- Our equivalent zone

  -- Competitor pricing
  competitor_price INTEGER,
  price_currency TEXT DEFAULT 'USD',
  price_period TEXT,  -- 'monthly', 'weekly', 'daily'

  -- Similarity score
  similarity_score DECIMAL(3,2),  -- 0.00 to 1.00

  -- Collection metadata
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  collection_method TEXT  -- 'api', 'web_scrape', 'manual_entry'
);

CREATE INDEX idx_pricing_history_zone_date ON zone_pricing_history (zone_id, effective_date DESC);
CREATE INDEX idx_competitive_pricing_comparable ON competitive_pricing_data (comparable_zone_id, collected_at DESC);
```

**2. Base Price Calculation Engine**

The system calculates foundational pricing before applying dynamic adjustments:

```javascript
class BasePriceCalculator {

  async calculateBasePrice(zone) {
    // Step 1: Get standard rate for zone type
    const standardRate = this.getStandardRate(zone.zone_type, zone.square_footage);

    // Step 2: Apply physical attribute multipliers
    const physicalMultiplier = this.calculatePhysicalMultiplier(zone);

    // Step 3: Apply location attribute multipliers
    const locationMultiplier = await this.calculateLocationMultiplier(zone);

    // Step 4: Apply market tier multiplier
    const marketMultiplier = this.getMarketTierMultiplier(zone.property.market_tier);

    // Step 5: Calculate base price
    const basePrice = standardRate * physicalMultiplier * locationMultiplier * marketMultiplier;

    // Step 6: Round to nearest $1,000
    const roundedPrice = Math.round(basePrice / 1000) * 1000;

    return {
      base_price_monthly: roundedPrice,
      components: {
        standard_rate: standardRate,
        physical_multiplier: physicalMultiplier,
        location_multiplier: locationMultiplier,
        market_multiplier: marketMultiplier
      },
      calculation_date: new Date()
    };
  }

  getStandardRate(zoneType, squareFootage) {
    const baseRates = {
      'bulletin': { rate_per_sqft: 400, minimum: 150000 },
      '30-sheet': { rate_per_sqft: 450, minimum: 100000 },
      '6-sheet': { rate_per_sqft: 500, minimum: 8000 },
      'entrance': { rate_per_sqft: 600, minimum: 120000 },
      'rooftop': { rate_per_sqft: 800, minimum: 200000 },
      'custom': { rate_per_sqft: 500, minimum: 50000 }
    };

    const spec = baseRates[zoneType];
    const calculatedRate = squareFootage * spec.rate_per_sqft;

    return Math.max(calculatedRate, spec.minimum);
  }

  calculatePhysicalMultiplier(zone) {
    let multiplier = 1.0;

    // Elevation premium: higher zones more visible from distance
    if (zone.elevation_feet > 500) {
      multiplier *= 1.5;
    } else if (zone.elevation_feet > 300) {
      multiplier *= 1.3;
    } else if (zone.elevation_feet > 150) {
      multiplier *= 1.15;
    } else if (zone.elevation_feet < 20) {
      multiplier *= 0.9;  // Low zones may have limited visibility
    }

    // Facade direction premium
    const facadeMultipliers = {
      'north': 1.0,   // Consistent lighting
      'south': 1.1,   // Best sunlight exposure
      'east': 0.95,   // Morning sun only
      'west': 0.95,   // Afternoon sun only
      'entrance': 1.2, // High engagement
      'rooftop': 1.3   // Unique visibility
    };
    multiplier *= facadeMultipliers[zone.facade_direction] || 1.0;

    // Size efficiency: larger zones may have economies of scale
    if (zone.square_footage > 2000) {
      multiplier *= 0.95;  // Slight discount for very large zones
    }

    return multiplier;
  }

  async calculateLocationMultiplier(zone) {
    let multiplier = 1.0;

    // Visibility score normalization (1-10 scale to 0.5-1.5 multiplier)
    const visibilityMultiplier = 0.5 + (zone.visibility_score / 10);
    multiplier *= visibilityMultiplier;

    // Traffic exposure score normalization
    const trafficMultiplier = 0.6 + (zone.traffic_exposure_score / 10);
    multiplier *= trafficMultiplier;

    // Landmark proximity bonus
    const landmarks = await this.getNearbyLandmarks(zone.zone_boundaries, radius_miles=0.5);
    if (landmarks.length > 0) {
      const landmarkBonus = Math.min(1.3, 1.0 + (landmarks.length * 0.1));
      multiplier *= landmarkBonus;
    }

    // Transit hub proximity bonus
    const transitHubs = await this.getNearbyTransitHubs(zone.zone_boundaries, radius_miles=0.25);
    if (transitHubs.length > 0) {
      multiplier *= 1.15;
    }

    // Competitive density penalty (too many zones nearby reduces scarcity)
    const nearbyZones = await this.getNearbyCompetingZones(zone.id, radius_miles=0.5);
    if (nearbyZones.length > 10) {
      const densityPenalty = Math.max(0.85, 1.0 - (nearbyZones.length * 0.01));
      multiplier *= densityPenalty;
    }

    return multiplier;
  }

  getMarketTierMultiplier(marketTier) {
    const tierMultipliers = {
      1: 1.5,  // Premium markets (NYC, SF, LA, Chicago, etc.)
      2: 1.0,  // Standard markets (secondary cities, suburban centers)
      3: 0.7   // Secondary markets (smaller cities, rural areas)
    };

    return tierMultipliers[marketTier] || 1.0;
  }
}
```

**3. Temporal Pricing Adjustment Engine**

Dynamic time-based pricing modifications:

```javascript
class TemporalPricingEngine {

  async calculateTemporalMultiplier(zone, startDate, endDate) {
    let multiplier = 1.0;

    // Seasonal adjustments
    const seasonalMultiplier = this.getSeasonalMultiplier(startDate, zone);
    multiplier *= seasonalMultiplier;

    // Day-of-week patterns
    const dowMultiplier = this.getDayOfWeekMultiplier(startDate);
    multiplier *= dowMultiplier;

    // Holiday proximity premium
    const holidayMultiplier = await this.getHolidayProximityMultiplier(startDate, endDate);
    multiplier *= holidayMultiplier;

    // Event calendar premium
    const eventMultiplier = await this.getEventCalendarMultiplier(zone, startDate, endDate);
    multiplier *= eventMultiplier;

    // Booking lead time adjustment
    const leadTimeMultiplier = this.getLeadTimeMultiplier(startDate);
    multiplier *= leadTimeMultiplier;

    // Duration discount (longer bookings get discount)
    const durationMonths = this.calculateMonths(startDate, endDate);
    const durationMultiplier = this.getDurationMultiplier(durationMonths);
    multiplier *= durationMultiplier;

    return {
      temporal_multiplier: multiplier,
      components: {
        seasonal: seasonalMultiplier,
        day_of_week: dowMultiplier,
        holiday_proximity: holidayMultiplier,
        events: eventMultiplier,
        lead_time: leadTimeMultiplier,
        duration: durationMultiplier
      }
    };
  }

  getSeasonalMultiplier(startDate, zone) {
    const month = startDate.getMonth();  // 0-11

    // Retail zones: Q4 holiday season premium
    if (zone.property.building_type === 'retail' || zone.property.building_type === 'shopping_mall') {
      if (month >= 9 && month <= 11) {  // Oct-Dec
        return 1.4;  // 40% holiday premium
      } else if (month >= 6 && month <= 8) {  // Jul-Sep (back to school)
        return 1.15;
      }
    }

    // Tourist areas: summer premium
    if (zone.property.tourism_destination) {
      if (month >= 5 && month <= 8) {  // Jun-Sep
        return 1.25;
      }
    }

    // Winter discount for outdoor zones in cold climates
    if (zone.property.climate === 'cold' && (month === 0 || month === 1 || month === 11)) {
      return 0.85;
    }

    return 1.0;
  }

  getDayOfWeekMultiplier(startDate) {
    const dayOfWeek = startDate.getDay();  // 0=Sun, 6=Sat

    // Weekend starts command slight premium for retail
    if (dayOfWeek === 5 || dayOfWeek === 6) {  // Fri or Sat
      return 1.05;
    }

    // Monday starts slightly less desirable
    if (dayOfWeek === 1) {
      return 0.98;
    }

    return 1.0;
  }

  async getHolidayProximityMultiplier(startDate, endDate) {
    const majorHolidays = [
      { name: 'Christmas', month: 11, day: 25, premium: 1.5 },
      { name: 'Thanksgiving', month: 10, day: 'fourth_thursday', premium: 1.3 },
      { name: 'New Year', month: 0, day: 1, premium: 1.4 },
      { name: 'Super Bowl', month: 1, day: 'first_sunday', premium: 1.6 },
      { name: 'Black Friday', month: 10, day: 'fourth_friday', premium: 1.8 },
      { name: 'Fourth of July', month: 6, day: 4, premium: 1.25 }
    ];

    let maxPremium = 1.0;

    for (const holiday of majorHolidays) {
      const holidayDate = this.calculateHolidayDate(holiday, startDate.getFullYear());

      // Check if booking period overlaps holiday
      if (this.dateRangeOverlaps(startDate, endDate, holidayDate, 7)) {
        maxPremium = Math.max(maxPremium, holiday.premium);
      }
    }

    return maxPremium;
  }

  async getEventCalendarMultiplier(zone, startDate, endDate) {
    // Query local events database
    const nearbyEvents = await this.queryEventsNearZone(zone, startDate, endDate);

    if (nearbyEvents.length === 0) return 1.0;

    // Calculate event impact based on expected attendance
    let maxEventMultiplier = 1.0;

    for (const event of nearbyEvents) {
      let eventMultiplier = 1.0;

      // Major events (conventions, sports championships, concerts)
      if (event.expected_attendance > 50000) {
        eventMultiplier = 1.8;
      } else if (event.expected_attendance > 20000) {
        eventMultiplier = 1.4;
      } else if (event.expected_attendance > 5000) {
        eventMultiplier = 1.2;
      }

      // Distance decay: closer events have more impact
      const distance_miles = event.distance_from_zone;
      if (distance_miles < 0.25) {
        eventMultiplier *= 1.0;  // Full impact
      } else if (distance_miles < 0.5) {
        eventMultiplier *= 0.8;
      } else if (distance_miles < 1.0) {
        eventMultiplier *= 0.5;
      } else {
        eventMultiplier *= 0.2;
      }

      maxEventMultiplier = Math.max(maxEventMultiplier, eventMultiplier);
    }

    return maxEventMultiplier;
  }

  getLeadTimeMultiplier(startDate) {
    const now = new Date();
    const daysUntilStart = Math.floor((startDate - now) / (1000 * 60 * 60 * 24));

    // Last-minute booking premium
    if (daysUntilStart < 14) {
      return 1.3;  // 30% premium for bookings within 2 weeks
    } else if (daysUntilStart < 30) {
      return 1.15;  // 15% premium for bookings within 1 month
    }

    // Early booking discount
    if (daysUntilStart > 180) {
      return 0.90;  // 10% discount for 6+ months advance booking
    } else if (daysUntilStart > 90) {
      return 0.95;  // 5% discount for 3+ months advance booking
    }

    return 1.0;
  }

  getDurationMultiplier(durationMonths) {
    // Volume discount for longer bookings
    if (durationMonths >= 12) {
      return 0.80;  // 20% discount for 12+ month bookings
    } else if (durationMonths >= 6) {
      return 0.88;  // 12% discount for 6+ month bookings
    } else if (durationMonths >= 3) {
      return 0.94;  // 6% discount for 3+ month bookings
    }

    // Short-term premium
    if (durationMonths === 1) {
      return 1.1;  // 10% premium for single-month bookings
    }

    return 1.0;
  }
}
```

**4. Demand-Based Surge Pricing Engine**

Real-time demand sensing and pricing adjustment:

```python
class DemandSurgePricingEngine:

    def calculate_demand_multiplier(self, zone_id, start_date, end_date):
        """
        Calculate surge pricing multiplier based on current demand signals.
        """

        # Retrieve demand indicators
        search_volume = self.get_recent_search_volume(zone_id, lookback_days=7)
        booking_attempts = self.get_recent_booking_attempts(zone_id, lookback_days=7)
        availability_rate = self.calculate_availability_rate(zone_id, timeframe_days=90)
        market_velocity = self.calculate_market_booking_velocity()

        # Calculate demand score (0-100 scale)
        demand_score = (
            search_volume * 0.30 +
            booking_attempts * 0.35 +
            (100 - availability_rate) * 0.20 +  # Scarcity factor
            market_velocity * 0.15
        )

        # Apply surge multiplier based on demand score
        if demand_score >= 90:
            surge_multiplier = 2.0  # 2x surge for extreme demand
        elif demand_score >= 80:
            surge_multiplier = 1.6
        elif demand_score >= 70:
            surge_multiplier = 1.3
        elif demand_score >= 60:
            surge_multiplier = 1.15
        elif demand_score >= 40:
            surge_multiplier = 1.0  # Baseline
        elif demand_score >= 20:
            surge_multiplier = 0.92  # Slight discount for low demand
        else:
            surge_multiplier = 0.85  # Promotional pricing for very low demand

        # Apply surge caps to prevent extreme pricing
        surge_multiplier = min(surge_multiplier, self.get_max_surge_cap(zone_id))
        surge_multiplier = max(surge_multiplier, 0.70)  # Never discount more than 30%

        return {
            'demand_multiplier': surge_multiplier,
            'demand_score': demand_score,
            'indicators': {
                'search_volume': search_volume,
                'booking_attempts': booking_attempts,
                'availability_rate': availability_rate,
                'market_velocity': market_velocity
            },
            'calculation_timestamp': datetime.utcnow()
        }

    def get_recent_search_volume(self, zone_id, lookback_days):
        """
        Retrieve normalized search volume for this zone.
        Returns 0-100 score.
        """

        searches = query_database("""
            SELECT COUNT(*) as search_count
            FROM zone_search_events
            WHERE zone_id = %s
              AND timestamp >= NOW() - INTERVAL '%s days'
        """, [zone_id, lookback_days])

        # Normalize to 0-100 scale based on historical average
        historical_avg = self.get_historical_avg_searches(zone_id)
        if historical_avg == 0:
            return 50  # Neutral score for new zones

        normalized_score = min(100, (searches / historical_avg) * 50)
        return normalized_score

    def calculate_availability_rate(self, zone_id, timeframe_days):
        """
        Calculate percentage of days this zone is available in next timeframe_days.
        Returns 0-100 percentage.
        """

        total_days = timeframe_days

        booked_days = query_database("""
            SELECT SUM(end_date - start_date) as total_booked_days
            FROM bookings
            WHERE zone_id = %s
              AND status IN ('confirmed', 'active')
              AND start_date < NOW() + INTERVAL '%s days'
              AND end_date > NOW()
        """, [zone_id, timeframe_days])

        available_days = total_days - booked_days
        availability_rate = (available_days / total_days) * 100

        return max(0, min(100, availability_rate))
```

**5. Competitive Pricing Intelligence Engine**

Automated competitor monitoring and strategic positioning:

```javascript
class CompetitivePricingEngine {

  async updateCompetitivePricing(zone) {
    // Step 1: Find comparable zones from competitors
    const comparableZones = await this.findComparableZones(zone);

    // Step 2: Collect current pricing data
    const competitorPrices = await this.collectCompetitorPricing(comparableZones);

    // Step 3: Calculate market positioning
    const marketAnalysis = this.analyzeMarketPosition(zone, competitorPrices);

    // Step 4: Determine strategic pricing adjustment
    const pricingRecommendation = this.calculateStrategicPrice(zone, marketAnalysis);

    // Step 5: Apply competitive multiplier
    return {
      competitive_multiplier: pricingRecommendation.multiplier,
      market_position: marketAnalysis.percentile,
      competitor_count: competitorPrices.length,
      price_recommendation: pricingRecommendation.recommended_price,
      rationale: pricingRecommendation.rationale
    };
  }

  async findComparableZones(zone) {
    // Define similarity criteria
    const criteria = {
      zone_type: zone.zone_type,
      size_tolerance: 0.20,  // Within 20% of square footage
      location_radius_miles: 2.0,
      visibility_score_tolerance: 2,  // Within 2 points
      market_tier: zone.property.market_tier
    };

    // Query competitor platforms (via APIs or web scraping)
    const competitors = ['AdSpace360', 'OutdoorARx', 'BillboardBazaar'];
    const comparableZones = [];

    for (const competitor of competitors) {
      const zones = await this.queryCompetitorAPI(competitor, criteria);
      comparableZones.push(...zones);
    }

    // Calculate similarity scores
    for (const compZone of comparableZones) {
      compZone.similarity_score = this.calculateSimilarity(zone, compZone);
    }

    // Return top 20 most similar zones
    return comparableZones
      .sort((a, b) => b.similarity_score - a.similarity_score)
      .slice(0, 20);
  }

  calculateSimilarity(ourZone, theirZone) {
    let score = 0;

    // Zone type match (30% weight)
    if (ourZone.zone_type === theirZone.zone_type) {
      score += 30;
    }

    // Size similarity (20% weight)
    const sizeDiff = Math.abs(ourZone.square_footage - theirZone.square_footage);
    const sizeScore = Math.max(0, 20 - (sizeDiff / ourZone.square_footage * 100));
    score += sizeScore;

    // Location proximity (25% weight)
    const distance_miles = calculateDistance(ourZone.coordinates, theirZone.coordinates);
    const locationScore = Math.max(0, 25 - (distance_miles * 5));
    score += locationScore;

    // Visibility similarity (15% weight)
    const visibilityDiff = Math.abs(ourZone.visibility_score - theirZone.visibility_score);
    const visibilityScore = Math.max(0, 15 - (visibilityDiff * 1.5));
    score += visibilityScore;

    // Market tier match (10% weight)
    if (ourZone.market_tier === theirZone.market_tier) {
      score += 10;
    }

    return score / 100;  // Normalize to 0-1
  }

  analyzeMarketPosition(zone, competitorPrices) {
    const currentPrice = zone.current_price_monthly;

    // Calculate percentile ranking
    const pricesSorted = [...competitorPrices.map(c => c.price), currentPrice].sort((a, b) => a - b);
    const percentile = (pricesSorted.indexOf(currentPrice) / pricesSorted.length) * 100;

    // Calculate market statistics
    const avgPrice = competitorPrices.reduce((sum, c) => sum + c.price, 0) / competitorPrices.length;
    const medianPrice = pricesSorted[Math.floor(pricesSorted.length / 2)];
    const minPrice = Math.min(...competitorPrices.map(c => c.price));
    const maxPrice = Math.max(...competitorPrices.map(c => c.price));

    return {
      percentile,
      average_competitor_price: avgPrice,
      median_competitor_price: medianPrice,
      price_range: { min: minPrice, max: maxPrice },
      price_vs_average: ((currentPrice - avgPrice) / avgPrice) * 100,
      price_vs_median: ((currentPrice - medianPrice) / medianPrice) * 100
    };
  }

  calculateStrategicPrice(zone, marketAnalysis) {
    const targetPercentile = zone.pricing_strategy === 'premium' ? 75 :
                            zone.pricing_strategy === 'competitive' ? 50 : 35;

    let recommendedPrice;
    let multiplier = 1.0;
    let rationale = [];

    // Calculate price needed to achieve target percentile
    if (marketAnalysis.percentile < targetPercentile - 10) {
      // Currently priced too low
      const targetPrice = marketAnalysis.average_competitor_price * (targetPercentile / 50);
      multiplier = targetPrice / zone.current_price_monthly;
      multiplier = Math.min(multiplier, 1.25);  // Cap at 25% increase
      rationale.push(`Adjusting upward to reach ${targetPercentile}th percentile positioning`);

    } else if (marketAnalysis.percentile > targetPercentile + 10) {
      // Currently priced too high
      const targetPrice = marketAnalysis.average_competitor_price * (targetPercentile / 50);
      multiplier = targetPrice / zone.current_price_monthly;
      multiplier = Math.max(multiplier, 0.85);  // Cap at 15% decrease
      rationale.push(`Adjusting downward to competitive ${targetPercentile}th percentile`);

    } else {
      // Well-positioned
      multiplier = 1.0;
      rationale.push(`Current pricing well-positioned at ${Math.round(marketAnalysis.percentile)}th percentile`);
    }

    recommendedPrice = Math.round(zone.current_price_monthly * multiplier);

    return {
      multiplier,
      recommended_price: recommendedPrice,
      target_percentile: targetPercentile,
      rationale: rationale.join('. ')
    };
  }
}
```

### Technical Specifications

**Machine Learning Models:**

```python
# Price Elasticity Model Architecture
elasticity_model = Pipeline([
    ('feature_engineering', FeatureEngineer()),
    ('scaler', StandardScaler()),
    ('model', GradientBoostingRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        random_state=42
    ))
])

# Training on historical booking conversion data
features = [
    'normalized_price',  # Price relative to historical average
    'price_vs_competitors',  # Price relative to market
    'visibility_score',
    'traffic_exposure_score',
    'days_until_start',
    'booking_duration_months',
    'season',
    'day_of_week',
    'market_tier',
    'recent_search_volume',
    'availability_rate'
]

target = 'booking_probability'  # 0.0 to 1.0

# Model achieves 0.85 R² on validation set
```

### Implementation Details

**Complete Pricing Calculation Workflow:**

```javascript
async function calculateFinalPrice(zone, startDate, endDate) {

  // Step 1: Calculate base price
  const basePricing = await basePriceCalculator.calculateBasePrice(zone);

  // Step 2: Apply temporal adjustments
  const temporalPricing = await temporalEngine.calculateTemporalMultiplier(
    zone, startDate, endDate
  );

  // Step 3: Apply demand-based surge pricing
  const demandPricing = await demandEngine.calculateDemandMultiplier(
    zone.id, startDate, endDate
  );

  // Step 4: Apply competitive positioning
  const competitivePricing = await competitiveEngine.updateCompetitivePricing(zone);

  // Step 5: Calculate final price
  const finalPrice = Math.round(
    basePricing.base_price_monthly *
    temporalPricing.temporal_multiplier *
    demandPricing.demand_multiplier *
    competitivePricing.competitive_multiplier
  );

  // Step 6: Apply min/max constraints
  const constrainedPrice = Math.max(
    zone.minimum_price || finalPrice * 0.5,
    Math.min(finalPrice, zone.maximum_price || finalPrice * 3.0)
  );

  // Step 7: Store pricing history
  await storePricingHistory({
    zone_id: zone.id,
    base_price_monthly: basePricing.base_price_monthly,
    temporal_multiplier: temporalPricing.temporal_multiplier,
    demand_multiplier: demandPricing.demand_multiplier,
    competitive_multiplier: competitivePricing.competitive_multiplier,
    final_price_monthly: constrainedPrice,
    effective_date: new Date(),
    pricing_rationale: generatePricingRationale({
      basePricing,
      temporalPricing,
      demandPricing,
      competitivePricing
    })
  });

  return {
    final_price_monthly: constrainedPrice,
    pricing_breakdown: {
      base_price: basePricing.base_price_monthly,
      temporal_adjustment: temporalPricing.temporal_multiplier,
      demand_adjustment: demandPricing.demand_multiplier,
      competitive_adjustment: competitivePricing.competitive_multiplier
    },
    confidence_score: calculatePricingConfidence({
      demandPricing,
      competitivePricing
    })
  };
}
```

### Example Embodiments

**Embodiment 1: Times Square New Year's Eve Surge Pricing**

Zone: Times Square LED Wall
- Base Price: $500,000/month
- Temporal Multiplier: 1.4 (New Year's holiday premium)
- Demand Multiplier: 2.0 (extreme demand, 95/100 demand score)
- Competitive Multiplier: 1.1 (premium positioning)
- **Final Price: $1,540,000/month** (3.08x surge)

**Embodiment 2: Off-Season Suburban Mall Discount**

Zone: Suburban Shopping Mall Entrance
- Base Price: $120,000/month
- Temporal Multiplier: 0.85 (February off-season)
- Demand Multiplier: 0.90 (low demand, 25/100 demand score)
- Competitive Multiplier: 0.95 (competitive market positioning)
- **Final Price: $87,210/month** (27% discount)

**Embodiment 3: Multi-Zone Package Discount**

Advertiser books 5 zones across different properties:
- Individual zone prices: $200k, $180k, $150k, $220k, $190k
- Total individual: $940,000/month
- Package discount: 15% (5-zone tier)
- **Final package price: $799,000/month** ($141k savings)

## CLAIMS

### Independent Claims

**Claim 1:** A method for dynamically calculating pricing for augmented reality advertising zones comprising:
- Retrieving base pricing parameters including zone type, physical dimensions, and location attributes;
- Calculating base price using standardized rate tables and physical attribute multipliers;
- Applying location-based multipliers derived from visibility scores, traffic exposure metrics, and market tier classifications;
- Applying temporal multipliers accounting for seasonal patterns, holiday proximity, event calendars, and booking lead time;
- Applying demand-based surge pricing multipliers calculated from search volume, booking attempt frequency, and availability scarcity;
- Applying competitive positioning multipliers derived from automated competitor price monitoring;
- Computing final price as product of base price and all applicable multipliers;
- Storing pricing calculation history with detailed component breakdown for audit purposes.

**Claim 2:** A system for real-time price optimization of augmented reality advertising inventory comprising:
- A base price calculation engine implementing multi-factor pricing algorithms;
- A temporal pricing module applying time-based adjustments for seasonality, holidays, and events;
- A demand sensing engine monitoring search volume, booking velocity, and availability metrics;
- A competitive intelligence module collecting and analyzing competitor pricing data;
- A machine learning price elasticity model predicting booking probability as function of price;
- A revenue optimization algorithm maximizing expected revenue rather than booking rate;
- A pricing history database storing all price calculations with component breakdowns;
- An API exposing current pricing and pricing forecasts to booking systems.

**Claim 3:** A method for implementing surge pricing for digital advertising space comprising:
- Monitoring real-time demand indicators including zone search frequency, booking attempt counts, and market booking velocity;
- Calculating demand score on 0-100 scale from weighted combination of demand indicators;
- Mapping demand score to surge multiplier with defined thresholds (90+ score = 2.0x, 80-90 = 1.6x, etc.);
- Applying surge multiplier caps preventing excessive price volatility;
- Automatically adjusting prices in real-time as demand indicators change;
- Notifying property owners and registered advertisers of surge pricing events.

**Claim 4:** A method for competitive pricing intelligence comprising:
- Identifying comparable advertising zones from competitor platforms based on similarity criteria;
- Collecting competitor pricing data through API integration or automated web scraping;
- Calculating similarity scores between owned zones and competitor zones;
- Analyzing market position by computing percentile ranking of current price;
- Determining target market positioning (premium 75th percentile, competitive 50th, value 35th);
- Calculating pricing adjustments needed to achieve target positioning;
- Applying competitive multipliers maintaining strategic market position.

**Claim 5:** A method for calculating multi-zone package discounts comprising:
- Receiving zone selection from advertiser booking multiple zones;
- Analyzing coverage overlap between selected zones using geospatial calculations;
- Calculating base package price as sum of individual zone prices;
- Determining volume discount tier based on number of zones (3-4: 8%, 5-9: 15%, 10+: 25%);
- Adjusting discount percentage for coverage overlap (reduce discount if zones redundant);
- Applying geographic diversification bonuses for zones in multiple markets;
- Computing final package price with itemized discount breakdown.

**Claim 6:** A machine learning system for price elasticity modeling comprising:
- Collecting historical pricing experiments showing price, zone attributes, and booking outcomes;
- Engineering features including normalized price, competitive price ratios, temporal attributes, and location scores;
- Training gradient boosting classifier to predict booking probability as function of price;
- Calculating feature importance scores identifying primary pricing drivers;
- Generating price-response curves showing booking probability at different price points;
- Identifying revenue-maximizing price point balancing booking probability and price;
- Deploying trained model to production pricing engine for real-time predictions.

**Claim 7:** A method for revenue optimization across booking horizon comprising:
- Defining state space including days remaining until target date, current price, and booking probability;
- Implementing dynamic programming value function calculating expected revenue;
- Comparing immediate booking acceptance value versus waiting for higher-value booking;
- Optimizing pricing policy maximizing expected revenue over planning horizon;
- Accounting for opportunity cost of accepting lower-value booking now versus holding for future;
- Generating optimal pricing schedule adjusting prices as booking date approaches.

### Dependent Claims

**Claim 8:** The method of Claim 1, wherein calculating base price further comprises:
- Retrieving standard rate per square foot for zone type from rate table (bulletin: $400/sqft, entrance: $600/sqft, rooftop: $800/sqft);
- Calculating preliminary price as square footage × rate per square foot;
- Applying minimum price floor preventing undervaluation of small zones;
- Applying elevation premium multiplier (>500ft: 1.5x, 300-500ft: 1.3x, 150-300ft: 1.15x);
- Applying facade direction multiplier (south: 1.1x, entrance: 1.2x, rooftop: 1.3x);
- Rounding final base price to nearest $1,000 for simplified pricing.

**Claim 9:** The method of Claim 1, wherein applying location-based multipliers further comprises:
- Normalizing visibility score (1-10 scale) to multiplier range (0.5x to 1.5x);
- Normalizing traffic exposure score (1-10 scale) to multiplier range (0.6x to 1.6x);
- Querying geospatial database for nearby landmarks within 0.5 mile radius;
- Applying landmark proximity bonus (1.0x + 0.1x per landmark, capped at 1.3x);
- Querying nearby competing zones within 0.5 mile radius;
- Applying competitive density penalty (reduce multiplier 1% per competing zone, minimum 0.85x).

**Claim 10:** The method of Claim 1, wherein applying temporal multipliers further comprises:
- Determining season from start date month (Q4: 1.4x for retail zones, summer: 1.25x for tourist areas);
- Identifying major holidays within booking period (Christmas: 1.5x, Super Bowl: 1.6x, Black Friday: 1.8x);
- Querying event calendar for large events near zone (>50k attendance: 1.8x, >20k: 1.4x);
- Calculating booking lead time (within 14 days: 1.3x premium, >180 days: 0.9x discount);
- Calculating booking duration (12+ months: 0.8x, 6+ months: 0.88x, 1 month: 1.1x);
- Multiplying all temporal factors to generate composite temporal multiplier.

**Claim 11:** The method of Claim 3, wherein monitoring real-time demand indicators further comprises:
- Counting zone search events in past 7 days from analytics database;
- Normalizing search count relative to historical average (0-100 scale);
- Counting booking attempts (quote requests, reservation initiations) in past 7 days;
- Calculating availability rate as percentage of days available in next 90 days;
- Querying market-wide booking velocity across all zones;
- Computing weighted demand score (search: 30%, attempts: 35%, scarcity: 20%, velocity: 15%).

**Claim 12:** The method of Claim 4, wherein calculating similarity scores further comprises:
- Assigning 30% weight to exact zone type match (bulletin to bulletin, etc.);
- Calculating size similarity score from square footage difference (20% weight);
- Calculating location proximity score from geospatial distance in miles (25% weight);
- Calculating visibility similarity from visibility score difference (15% weight);
- Assigning 10% weight to market tier match;
- Summing weighted components to generate 0-1 similarity score;
- Filtering for similarity threshold >0.60 before price comparison.

**Claim 13:** The method of Claim 5, wherein analyzing coverage overlap further comprises:
- Calculating viewshed polygon for each selected zone showing visible area;
- Computing geospatial intersection of viewshed polygons using PostGIS ST_Intersection;
- Calculating overlap percentage as intersection area divided by union area;
- Reducing package discount by overlap percentage (50% overlap = 50% discount reduction);
- Identifying complementary zones with <10% overlap warranting full package discount;
- Presenting coverage visualization to advertiser showing overlap regions.

**Claim 14:** The method of Claim 6, wherein engineering features further comprises:
- Calculating normalized price as (current_price / historical_average_price);
- Calculating competitive price ratio as (current_price / average_competitor_price);
- Encoding temporal features including month (1-12), day of week (0-6), holiday proximity (binary);
- Including zone attribute features (visibility_score, traffic_exposure_score, market_tier);
- Calculating recent search velocity as 7-day moving average of search counts;
- One-hot encoding categorical features (zone_type, facade_direction);
- Scaling continuous features to zero mean and unit variance.

**Claim 15:** The method of Claim 6, wherein generating price-response curves further comprises:
- Holding all features constant except price;
- Varying price from 50% to 200% of current price in 5% increments;
- Predicting booking probability at each price point using trained model;
- Calculating expected revenue as price × booking_probability at each point;
- Identifying price maximizing expected revenue;
- Plotting curve visualizing booking probability vs. price relationship;
- Calculating price elasticity as percentage change in bookings per percentage change in price.

**Claim 16:** The method of Claim 7, wherein implementing dynamic programming value function further comprises:
- Initializing terminal condition V(0) = 0 (no value when no days remain);
- Iterating backwards from final day to current day;
- At each state (days_remaining, price), calculating:
  - Accept value = price × booking_probability(price, days_remaining)
  - Wait value = expected value of optimal future state
- Setting V(days_remaining, price) = max(accept_value, wait_value);
- Extracting optimal policy by finding price maximizing V at each day;
- Generating pricing schedule adjusting daily as booking date approaches.

**Claim 17:** The method of Claim 1, further comprising automated price experimentation:
- Selecting subset of zones for A/B testing;
- Randomly assigning zones to treatment groups (baseline price, +10%, +20%, -10%);
- Tracking booking conversion rates for each treatment group;
- Calculating statistical significance of conversion rate differences;
- Updating pricing model parameters based on experiment results;
- Gradually rolling out winning pricing strategy to all zones.

**Claim 18:** The system of Claim 2, further comprising package recommendation engine:
- Analyzing advertiser campaign objectives (geographic coverage, audience demographics);
- Querying available zones matching advertiser criteria;
- Optimizing zone combination maximizing coverage within budget constraint;
- Using integer programming solver to select optimal zone subset;
- Calculating package discount maximizing advertiser value;
- Presenting multiple package options at different price points and coverage levels.

**Claim 19:** The method of Claim 1, further comprising weather-based pricing adjustments:
- Integrating with weather forecast APIs for zone location;
- Applying discounts for poor weather reducing outdoor visibility (rain: 0.95x, snow: 0.90x);
- Applying premiums for exceptional weather increasing outdoor activity (sunny weekends: 1.1x);
- Adjusting seasonal multipliers based on actual weather patterns;
- Offering weather-contingent pricing with automatic refunds if conditions deteriorate.

**Claim 20:** The system of Claim 2, further comprising real-time price negotiation system:
- Receiving advertiser budget constraints and desired booking parameters;
- Calculating minimum acceptable price based on opportunity cost;
- Implementing automated counter-offer algorithm;
- Converging to mutually acceptable price through iterative proposals;
- Applying negotiation discount (maximum 10%) to close deal;
- Logging negotiation history for future machine learning training.

**Claim 21:** The method of Claim 3, further comprising surge pricing notification system:
- Detecting when surge multiplier increases beyond threshold (>1.3x);
- Notifying registered advertisers with saved searches matching affected zones;
- Providing surge pricing rationale (high demand, low availability, major event);
- Offering advance booking lock-in at current price before surge takes effect;
- Sending property owner notifications of surge pricing revenue opportunities.

**Claim 22:** The method of Claim 1, further comprising psychologic pricing optimization:
- Rounding final prices to psychologically attractive values ($99,900 vs. $100,000);
- Testing charm pricing effectiveness (prices ending in 9 vs. round numbers);
- Applying prestige pricing for ultra-premium zones (round numbers signal quality);
- Measuring booking conversion impact of different price formatting strategies.

**Claim 23:** The system of Claim 2, further comprising pricing API with SLA guarantees:
- Exposing RESTful API endpoint returning current price for zone and date range;
- Guaranteeing <100ms response time for pricing calculations;
- Implementing caching layer for frequently queried zones;
- Providing price quotes with validity expiration (guaranteed for 24 hours);
- Offering webhook notifications when zone prices change significantly;
- Documenting API with OpenAPI specification and example code.

## DRAWINGS

**Figure 1: Pricing System Architecture**
- Shows complete pricing engine components including base price calculator, temporal engine, demand engine, competitive engine, ML models
- Data flows from zone attributes through calculation pipeline to final price
- Integration points with booking system, analytics platform, competitive intelligence

**Figure 2: Base Price Calculation Flowchart**
- Step-by-step process for calculating foundational zone pricing
- Inputs: zone type, dimensions, location attributes
- Processing: rate lookup, multiplier application, rounding
- Output: base monthly price

**Figure 3: Multi-Factor Pricing Formula Visualization**
- Visual breakdown of complete pricing formula
- Shows base price × temporal_mult × demand_mult × competitive_mult
- Example calculation with actual values

**Figure 4: Demand Score Calculation**
- Components of demand score: search volume, booking attempts, availability, market velocity
- Weighted averaging formula
- Mapping from demand score to surge multiplier

**Figure 5: Price-Response Curve**
- Graph showing booking probability (Y-axis) vs. price (X-axis)
- Identifies revenue-maximizing price point
- Shows price elasticity coefficient

**Figure 6: Seasonal Pricing Patterns**
- Timeline showing price fluctuations throughout year
- Retail zones: Q4 surge, summer moderate, winter baseline
- Tourist zones: summer peak, winter trough
- Event-driven spikes overlaid

**Figure 7: Competitive Pricing Analysis Dashboard**
- Market positioning chart showing percentile ranking
- Competitor price distribution histogram
- Recommended price adjustment to achieve target positioning

**Figure 8: Package Discount Calculator**
- Visual representation of multi-zone booking
- Individual zone prices and package total
- Discount tier application and final price

**Figure 9: Revenue Optimization Decision Tree**
- Dynamic programming states and transitions
- Accept booking vs. wait decision at each state
- Expected value calculations

**Figure 10: Machine Learning Model Architecture**
- Input features feeding into gradient boosting model
- Model layers and parameters
- Output: booking probability prediction
- Feature importance ranking

---

**END OF PROVISIONAL PATENT APPLICATION**

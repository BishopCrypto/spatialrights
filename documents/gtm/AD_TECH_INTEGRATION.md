# Ad Tech Integration Strategy

## Executive Summary

For SpatialRights to scale beyond direct sales, we must integrate with the programmatic advertising ecosystem that powers 80% of digital display advertising. Agencies and advertisers expect to buy AR advertising through the same platforms they use for display, video, and DOOH - The Trade Desk, Google DV360, Amazon DSP, and others. Without programmatic integration, we're limited to manual insertion orders that don't scale.

However, AR advertising doesn't fit neatly into existing ad tech standards (OpenRTB, VAST, VPAID). We must adapt existing protocols while working with industry bodies to establish AR-specific standards. This document outlines our technical integration strategy, partnerships with DSPs/SSPs, and path to becoming a programmatic-first platform.

**18-Month Objectives:**
- Integrate with 3-5 major DSPs (Trade Desk, DV360, Amazon, Verizon, Xandr)
- Achieve 60%+ of revenue through programmatic by Month 18
- Establish OpenRTB extension for AR advertising
- Complete IAB certification for AR ad formats
- Build self-service campaign management for smaller advertisers
- Implement real-time bidding and yield optimization

**Budget:** $1.2M (18 months)
- Engineering team: $800K
- DSP/SSP integration partnerships: $200K
- Third-party verification integration: $100K
- Industry standards development: $100K

## Understanding the Programmatic Advertising Ecosystem

### How Programmatic Advertising Works Today

**The Buying Side (Demand):**

1. **Advertisers** decide they want to run campaigns
2. **Agency Trading Desks** plan media and execute buys
3. **Demand-Side Platforms (DSPs)** provide interface for bidding and buying
   - Examples: The Trade Desk, Google DV360, Amazon DSP, Verizon DSP, Xandr
4. **Data Management Platforms (DMPs)** provide audience targeting
   - Examples: Oracle BlueKai, Adobe Audience Manager, Lotame

**The Selling Side (Supply):**

1. **Publishers/Property Owners** have ad inventory to sell
2. **Supply-Side Platforms (SSPs)** represent publisher inventory
   - Examples: Magnite, PubMatic, OpenX, Index Exchange
3. **Ad Servers** manage campaign delivery and reporting
   - Examples: Google Ad Manager (GAM), Freewheel, Innovid

**The Middle (Exchange):**

1. **Ad Exchanges** connect buyers and sellers in real-time auctions
   - Examples: Google AdX, OpenX, Magnite
2. **OpenRTB Protocol** standardizes communication between DSPs and SSPs
3. **Real-Time Bidding (RTB)** auctions determine which ad wins each impression

**How It Works (Simplified Flow):**

1. User visits property with available ad inventory
2. SSP sends bid request to multiple DSPs via OpenRTB
3. DSPs evaluate bid request, check targeting, calculate bid
4. DSPs respond with bid and creative
5. SSP runs auction, highest bid wins
6. Winning ad creative delivered to user
7. Impression tracked, billed, reported

**This entire process happens in ~100 milliseconds**

### Where SpatialRights Fits In

We have three options for entering the programmatic ecosystem:

**Option 1: Partner with Existing SSP**

*Pros:*
- Fastest time to market (6-9 months)
- Leverage existing DSP relationships
- Lower technical complexity
- Established billing and reporting

*Cons:*
- Revenue share with SSP (10-20% take rate)
- Limited control over roadmap
- SSP may not prioritize AR
- Dependent on SSP's DSP relationships

*Best SSP Partners:*
- **Magnite (formerly Rubicon + Telaria)** - Leading DOOH SSP, programmatic focus
- **Vistar Media** - DOOH specialist, strong agency relationships
- **Place Exchange** - Location-based programmatic

**Option 2: Build Our Own SSP**

*Pros:*
- Full control over platform and roadmap
- No revenue share with third party
- Direct DSP relationships
- Can optimize specifically for AR

*Cons:*
- Longer time to market (12-18 months)
- Higher technical complexity
- Must establish DSP relationships independently
- Regulatory and compliance overhead (ad exchange license)

*Requirements:*
- OpenRTB integration
- Real-time bidding engine
- Billing and reconciliation systems
- Compliance and fraud prevention
- 24/7 infrastructure operations

**Option 3: Hybrid Approach (Recommended)**

*Phase 1 (Months 1-9):* Partner with SSP for initial programmatic access
*Phase 2 (Months 10-18):* Build direct DSP integrations while maintaining SSP
*Phase 3 (Months 19+):* Full SSP capabilities, SSP partner becomes backup

*Rationale:*
- Get to market quickly with SSP partnership
- Learn programmatic dynamics before building
- Maintain SSP for long-tail DSP access
- Build direct integrations with top 5 DSPs (80% of spend)
- Control roadmap and economics over time

**Our Strategy: Hybrid Approach**

## Phase 1: SSP Partnership (Months 1-9)

### SSP Selection and Partnership

**Primary SSP Target: Magnite**

*Why Magnite:*
- Largest independent SSP globally ($500M+ revenue)
- Leading DOOH SSP (acquired SpotX and Telaria)
- Strong DSP relationships (all major DSPs integrated)
- Experience with emerging formats
- CTV and DOOH expertise translates to AR
- Public company, stable and well-funded

*What They Get:*
- Exclusive AR inventory (first-mover advantage)
- New revenue stream and growth opportunity
- Innovation positioning
- First look at spatial advertising category

*What We Get:*
- Immediate access to all major DSPs
- Programmatic expertise and best practices
- Billing and payment infrastructure
- Fraud prevention and verification
- Industry credibility

**Partnership Structure:**

*Revenue Share:*
- Standard DOOH model: 10-15% to SSP
- Negotiation target: 10% (lower end due to our value)
- Volume-based: Decreases to 7.5% above $5M annual

*Term:*
- 2-year initial term
- Non-exclusive (allows us to build direct integrations)
- Performance milestones for continuation

*Technical Integration:*
- OpenRTB 2.5+ support
- Custom AR ad format specification
- Inventory feed and updates
- Reporting API integration

*Support and Enablement:*
- Dedicated Magnite integration team
- DSP training and education (they facilitate introductions)
- Quarterly business reviews
- Co-marketing and thought leadership

**Alternative SSP Options:**

**Vistar Media:**
- Pros: DOOH specialist, strong in transit/retail
- Cons: Smaller scale than Magnite, less CTV experience

**Place Exchange:**
- Pros: Location-based focus, good fit for spatial
- Cons: Smaller DSP network, less scale

**Strategy:** Lead with Magnite, add Vistar or Place Exchange as secondary (non-exclusive allows multiple SSPs)

### SSP Integration Technical Requirements

**What We Must Provide to SSP:**

**1. Inventory Feed**

*Format:* JSON or XML feed, updated hourly

*Required Fields:*
- Property ID and name
- Geographic coordinates (lat/long)
- AR zone boundaries and dimensions
- Available impressions (forecasted)
- Floor price (CPM minimum)
- Allowed content categories (IAB taxonomy)
- Technical specifications (AR platform compatibility)

*Example:*
```json
{
  "property_id": "SR001",
  "property_name": "The Grove - Main Plaza",
  "location": {
    "latitude": 34.0719,
    "longitude": -118.3567,
    "city": "Los Angeles",
    "state": "CA",
    "country": "US"
  },
  "ar_zones": [
    {
      "zone_id": "SR001-Z01",
      "zone_name": "Main Entrance",
      "dimensions": {"width": 10, "height": 5, "depth": 3},
      "forecasted_impressions": 50000,
      "floor_price_cpm": 50.00
    }
  ],
  "allowed_categories": ["IAB1", "IAB2", "IAB3"],
  "ar_platforms": ["meta_orion", "apple_vision", "snap_spectacles"]
}
```

**2. Real-Time Availability API**

*Endpoint:* GET /api/availability
*Purpose:* SSP checks real-time availability before bidding
*Response Time:* <50ms
*Returns:* Available impressions, current floor price, restrictions

**3. Creative Specifications**

*AR Creative Format Definition:*
- 3D model format: USDZ (Apple) or glTF (cross-platform)
- Maximum file size: 10MB
- Texture resolutions: 2048x2048 maximum
- Animation: Max 30 seconds loop
- Audio: Optional, max 30 seconds, AAC format
- Interaction: Touch/gaze events supported
- Fallback: 2D image required (16:9 ratio)

*Creative Validation:*
- Automated testing for format compliance
- Performance testing (render time, memory usage)
- Brand safety scanning
- Approval workflow integration

**4. Tracking and Measurement**

*Events to Track:*
- **Impression:** AR ad rendered in user's view
- **Viewable Impression:** Ad in view for 2+ seconds
- **Engagement:** User interacts (touch, gaze, dwell 10+ seconds)
- **Completion:** Full animation played
- **Click-through:** User taps CTA
- **Store Visit:** User visits nearby location (attribution)

*Tracking Pixels:*
- Support for third-party impression/click pixels
- OpenRTB macro replacement (${AUCTION_PRICE}, etc.)
- VAST event tracking for video elements

**5. Reporting API**

*Endpoint:* GET /api/reports
*Frequency:* Hourly updates, daily reconciliation
*Metrics:*
- Impressions delivered
- Viewable impressions
- Engagement rate
- Click-through rate
- Fill rate
- Average CPM
- Revenue by property, advertiser, creative

*Format:* JSON or CSV
*Retention:* 90 days real-time, 2 years historical

### SSP Integration Timeline

**Month 1-2: Partnership Negotiation and Agreement**

*Activities:*
- Identify and approach Magnite (warm intro via investor/advisor)
- Present opportunity and partnership proposal
- Negotiate terms and revenue share
- Execute partnership agreement
- Joint PR announcement

*Deliverables:*
- Signed partnership agreement
- Integration project plan and timeline
- Joint press release

**Month 3-5: Technical Integration Development**

*Activities:*
- Inventory feed development and testing
- Creative specification documentation
- Tracking and measurement implementation
- Reporting API development
- QA and certification

*Deliverables:*
- OpenRTB-compliant bid request handling
- Creative rendering and validation
- Impression tracking and verification
- Reporting dashboards

*Team Required:*
- 2 backend engineers (API development)
- 1 AR engineer (creative specs and rendering)
- 1 data engineer (reporting and analytics)
- 1 product manager (requirements and coordination)

**Month 6-7: DSP Enablement and Testing**

*Activities:*
- Magnite introduces us to priority DSPs
- DSP account setup and training
- Test campaigns with each DSP
- Creative trafficking and troubleshooting
- Performance optimization

*Priority DSPs:*
1. The Trade Desk
2. Google DV360
3. Amazon DSP
4. Verizon DSP
5. Xandr

*For Each DSP:*
- Account setup and IO
- Training session (how to buy AR inventory)
- Test campaign ($5-10K spend)
- Feedback and optimization
- Documentation and best practices

**Month 8-9: Launch and Optimization**

*Activities:*
- Programmatic inventory goes live
- Agency and advertiser education
- Campaign monitoring and optimization
- Issue resolution and support
- Case study development

*Success Metrics:*
- 5 DSPs actively buying
- 30% of revenue from programmatic
- 50%+ fill rate via programmatic
- <5% discrepancy rate
- Positive DSP feedback

## Phase 2: Direct DSP Integrations (Months 10-18)

### Why Direct Integrations Matter

**SSP Integration Limitations:**

1. **Revenue Share:** 10% to SSP on all transactions
2. **Roadmap Control:** Dependent on SSP priorities
3. **Data Access:** Limited visibility into bid stream
4. **Optimization:** Can't optimize bidding for AR-specific factors
5. **Relationship:** SSP sits between us and DSPs

**Direct Integration Benefits:**

1. **Economics:** Eliminate 10% SSP fee ($500K savings at $5M scale)
2. **Control:** Direct relationship with top DSPs
3. **Data:** Full bid stream visibility for optimization
4. **Roadmap:** Influence DSP AR feature development
5. **Performance:** Optimize specifically for AR (floor prices, targeting, yield)

**Strategy:**

Build direct integrations with **Top 5 DSPs** that represent 80% of programmatic spend:

1. The Trade Desk (35% of programmatic spend)
2. Google DV360 (25%)
3. Amazon DSP (10%)
4. Verizon DSP (5%)
5. Xandr (5%)

Maintain SSP relationship for **long-tail DSPs** (remaining 20%)

### Direct Integration Technical Architecture

**Our Role: Supply-Side Platform (SSP) for AR**

We're building lightweight SSP capabilities specifically for AR advertising:

**Core Components:**

**1. Bid Request Router**

*Function:* Receives AR ad opportunities, sends bid requests to DSPs

*Features:*
- Real-time property availability checking
- Floor price calculation (dynamic, based on demand)
- Audience targeting data append (geo, time, weather, events)
- Parallel bid requests to multiple DSPs
- Timeout handling (100ms response deadline)

*Technology:*
- Language: Go (low latency, concurrent)
- Infrastructure: AWS Lambda @ Edge (low latency globally)
- Database: Redis (in-memory for fast lookups)

**2. Auction Engine**

*Function:* Evaluates DSP bids, determines winner, handles fallbacks

*Logic:*
- First-price auction (highest bid wins)
- Floor price enforcement (reject bids below floor)
- Budget pacing (spread advertiser spend evenly)
- Frequency capping (limit ads per user)
- Fallback handling (house ads if no bids)

*Performance:*
- Auction decision in <20ms
- Support for 1000+ concurrent auctions
- 99.99% uptime requirement

**3. Creative Rendering Service**

*Function:* Delivers winning creative to AR device

*Features:*
- Creative caching (CDN for fast delivery)
- Format validation (ensure device compatibility)
- Dynamic assembly (personalization, localization)
- Fallback creative (if AR not supported)

*Technology:*
- CDN: Cloudflare (global edge network)
- Storage: S3 (creative assets)
- Rendering: WebGL/Three.js for preview

**4. Event Tracking and Attribution**

*Function:* Tracks ad events, measures performance, attributes outcomes

*Events:*
- Impression (ad rendered)
- Viewable (2+ seconds in view)
- Engagement (user interacted)
- Click-through (CTA tapped)
- Store visit (location attribution)

*Technology:*
- Event streaming: Kinesis or Kafka
- Storage: Redshift (data warehouse)
- Attribution: Branch or Kochava integration

**5. Reporting and Reconciliation**

*Function:* Provide real-time reporting to DSPs, handle billing reconciliation

*Features:*
- Real-time dashboards (impressions, spend, performance)
- Daily reconciliation files (IAB standard format)
- Discrepancy resolution (within 10% tolerance)
- Billing integration (automated invoicing)

*Technology:*
- Dashboards: Looker or Tableau
- Billing: Stripe or Bill.com
- Reconciliation: Custom Python scripts

### Direct DSP Integration Process

**Per-DSP Timeline: 3-4 Months**

**Phase 1: Partnership Development (Month 1)**

*Activities:*
- Warm introduction through Magnite or agency partner
- Present AR advertising opportunity and inventory
- Demonstrate platform capabilities and performance
- Negotiate integration terms and support model
- Execute technical partnership agreement

*Key Contacts at DSP:*
- VP/Director of Supply Partnerships
- Director of Product Management
- Technical integration engineer
- Sales enablement team

*Deliverables:*
- Partnership agreement or MOU
- Integration specification document
- Project plan and timeline
- Joint goals and success metrics

**Phase 2: Technical Integration (Months 2-3)**

*Activities:*
- OpenRTB specification customization
- Bid request/response format agreement
- AR creative specification definition
- Authentication and security setup
- Development and testing environment access

*Technical Requirements:*

**Bid Request Format (OpenRTB 2.5 Extended):**

```json
{
  "id": "bid-request-12345",
  "imp": [{
    "id": "1",
    "ar": {
      "format": "spatial_3d",
      "dimensions": {"w": 10, "h": 5, "d": 3},
      "platforms": ["meta_orion", "apple_vision"],
      "position": "entrance",
      "viewability_threshold": 0.7
    },
    "bidfloor": 50.00,
    "bidfloorcur": "USD",
    "pmp": {
      "private_auction": 0,
      "deals": []
    }
  }],
  "site": {
    "id": "SR001",
    "name": "The Grove",
    "cat": ["IAB1", "IAB2"],
    "page": "https://spatialrights.com/properties/the-grove",
    "geo": {
      "lat": 34.0719,
      "lon": -118.3567,
      "type": 2,
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA"
    }
  },
  "device": {
    "ua": "Meta Orion/1.0",
    "geo": {...},
    "ip": "192.168.1.1",
    "devicetype": 7,
    "make": "Meta",
    "model": "Orion"
  },
  "user": {
    "id": "hashed-user-id",
    "geo": {...}
  },
  "at": 1,
  "tmax": 100,
  "cur": ["USD"],
  "bcat": ["IAB25", "IAB26"]
}
```

**Bid Response Format:**

```json
{
  "id": "bid-request-12345",
  "seatbid": [{
    "bid": [{
      "id": "bid-67890",
      "impid": "1",
      "price": 75.00,
      "adid": "creative-12345",
      "adm": "https://cdn.example.com/ar-creative.usdz",
      "adomain": ["example.com"],
      "cid": "campaign-123",
      "crid": "creative-12345",
      "cat": ["IAB1"],
      "ext": {
        "ar_metadata": {
          "file_size": 8388608,
          "format": "usdz",
          "duration": 15
        }
      }
    }],
    "seat": "advertiser-seat-id"
  }],
  "cur": "USD"
}
```

**Phase 3: Testing and Certification (Month 3-4)**

*Activities:*
- Test campaigns in sandbox environment
- Creative trafficking and validation
- Event tracking verification
- Performance testing (latency, scale)
- Security and fraud prevention testing
- Third-party verification (MOAT, IAS)

*Test Scenarios:*
- Standard display campaigns
- Video/animated creative
- Interactive AR experiences
- Private marketplace deals (PMP)
- Programmatic guaranteed (PG)
- Various targeting parameters

*Certification Criteria:*
- 95%+ fill rate
- <10% discrepancy vs DSP reporting
- <100ms bid response time
- Zero critical bugs
- Creative renders correctly on all platforms
- Tracking pixels fire correctly

**Phase 4: Launch and Optimization (Month 4+)**

*Activities:*
- Production launch with real campaigns
- DSP sales team enablement
- Agency training and onboarding
- Campaign monitoring and optimization
- Monthly performance reviews with DSP
- Continuous improvement and iteration

*Success Metrics:*
- $500K+ spend through DSP in first 6 months
- 60%+ fill rate
- <5% discrepancy rate
- Positive agency feedback
- Growing share of AR budget

### Direct Integration Priority Order

**Tier 1: Must-Have (Months 10-15)**

**1. The Trade Desk (Month 10-13)**

*Why First:*
- Largest independent DSP (35% of market)
- Agency preferred platform
- Strong innovation focus
- Self-service interface (easy for buyers)
- Excellent APIs and documentation

*Expected Impact:* +40% programmatic revenue

**2. Google DV360 (Month 12-15)**

*Why Second:*
- Largest overall DSP (25% of market)
- Google Ads integration (massive reach)
- Strong in video and display
- Google Marketing Platform integration

*Challenges:*
- More bureaucratic approval process
- Longer integration timeline
- Must align with Google AR strategy

*Expected Impact:* +30% programmatic revenue

**Tier 2: Important (Months 16-18)**

**3. Amazon DSP (Month 16-17)**

*Why Important:*
- Fast-growing DSP (10% market share and rising)
- Retail and e-commerce focus (good fit for foot traffic attribution)
- Amazon first-party data (powerful targeting)

*Expected Impact:* +10% programmatic revenue

**4. Verizon DSP (Month 17-18)**

*Why Valuable:*
- Strong in mobile and OOH
- Telco data for location targeting
- Verizon Media properties integration

*Expected Impact:* +5% programmatic revenue

**5. Xandr (Microsoft) (Month 18)**

*Why Useful:*
- Microsoft ecosystem integration
- CTV and video strength
- Global reach

*Expected Impact:* +5% programmatic revenue

**Total: 90% of programmatic market covered with 5 direct integrations**

Remaining 10%: Long-tail DSPs via Magnite SSP partnership

## Phase 3: Advanced Programmatic Capabilities (Months 19-24)

### Private Marketplace (PMP) Deals

**What Are PMP Deals:**

Private auctions where inventory is offered to select buyers at negotiated terms:
- Fixed CPM or floor price
- Guaranteed volume or priority access
- Exclusive or first-look rights
- Custom targeting or creative

**Why PMPs Matter for AR:**

1. **Premium Pricing:** AR inventory is scarce and premium, PMP allows higher CPMs
2. **Brand Safety:** Advertisers get pre-approved properties and contexts
3. **Predictability:** Guaranteed impressions for product launches
4. **Relationships:** Deepens agency/advertiser partnerships

**PMP Implementation:**

*Deal Types:*

**1. First-Look Deals**
- Preferred buyer gets first chance to bid
- If they decline, opens to open auction
- Pricing: Floor + 10-20% premium

**2. Private Auction**
- Multiple invited buyers compete
- Higher floor price than open auction
- Pricing: Floor + 20-30% premium

**3. Programmatic Guaranteed**
- Fixed CPM, fixed volume
- No auction, guaranteed delivery
- Pricing: Premium CPM (2-3x open market)

*Use Cases:*

- **Entertainment:** Guaranteed impressions for movie opening weekend
- **Automotive:** First-look at luxury retail district for vehicle launch
- **CPG:** Exclusive access to high-traffic properties for sampling campaign
- **Luxury:** Private auction for premium fashion district inventory

*Technical Implementation:*

```json
{
  "pmp": {
    "private_auction": 1,
    "deals": [{
      "id": "deal-12345",
      "bidfloor": 100.00,
      "bidfloorcur": "USD",
      "at": 1,
      "wseat": ["advertiser-seat-123"],
      "ext": {
        "deal_type": "first_look",
        "guaranteed_impressions": 50000,
        "flight_dates": ["2025-06-01", "2025-06-30"]
      }
    }]
  }
}
```

**PMP Sales Process:**

1. Identify high-value advertising opportunities (product launches, seasons, events)
2. Approach agencies/advertisers with PMP proposal
3. Negotiate terms (volume, pricing, exclusivity)
4. Set up deal in platform
5. Traffic creative and launch
6. Monitor delivery and optimize
7. Post-campaign reporting and renewal

**Target: 30% of revenue from PMP deals by Month 24**

### Audience Targeting and Data Integration

**The Targeting Challenge:**

Traditional digital advertising uses cookies and device IDs for targeting. AR advertising is location-based with limited personal data. How do we enable sophisticated targeting?

**AR-Specific Targeting Capabilities:**

**1. Contextual Targeting**

*Location Context:*
- Property type (retail, entertainment, transit, cultural)
- Surrounding businesses (luxury retail, quick-service restaurants)
- Neighborhood demographics (Census data)
- Events happening nearby (concerts, sports, conventions)

*Temporal Context:*
- Time of day (morning commute, lunch, evening)
- Day of week (weekday vs weekend)
- Season and weather
- Local events and holidays

*Behavioral Context:*
- User movement patterns (walking, driving, stationary)
- Dwell time at property
- Previous AR engagement
- Property visitation frequency

**2. Audience Segment Integration**

*Partner with DMPs:*
- LiveRamp (identity resolution)
- Oracle BlueKai (audience data)
- Adobe Audience Manager
- Lotame (behavioral data)

*Integration Method:*
- Hashed email matching (privacy-safe)
- Mobile device ID matching (where available and compliant)
- Household IP address matching
- Location history matching

*Example Segments:*
- "In-market for luxury vehicle" visiting high-end retail
- "Recent home buyer" near home improvement stores
- "Travel enthusiast" at airport or tourist destinations
- "Fitness enthusiast" near gyms and active retail

**3. First-Party Data Activation**

*Advertiser Uploads Customer Lists:*
- CRM data (hashed emails)
- Loyalty program members
- App users
- Website visitors (retargeting)

*Match to AR Users:*
- Privacy-safe matching via LiveRamp or similar
- Suppression lists (don't show to existing customers)
- Lookalike audiences (find similar users)

**4. Attribution and Measurement**

*Store Visit Attribution:*
- Partner with Foursquare or PlaceIQ
- Track AR ad exposure → store visit within 7 days
- Attribution rate becomes optimization signal

*Cross-Device Attribution:*
- Partner with Branch or Kochava
- Connect AR exposure to mobile app installs or web conversions
- Measure full-funnel impact

**Privacy Compliance:**

All targeting must comply with:
- GDPR (Europe)
- CCPA (California)
- COPPA (children under 13)
- Apple ATT (App Tracking Transparency)
- Google Privacy Sandbox

**Implementation:**
- User consent management
- Privacy policy disclosures
- Data retention limits (90 days)
- Right to deletion
- Opt-out mechanisms

### Yield Optimization and Dynamic Pricing

**The Yield Optimization Goal:**

Maximize revenue by dynamically adjusting floor prices based on real-time demand, while maintaining high fill rates.

**Dynamic Floor Pricing:**

*Variables Influencing Floor Price:*

1. **Property Characteristics:**
   - Foot traffic (higher traffic = higher floor)
   - Demographics (luxury audience = higher floor)
   - Location desirability (Times Square > suburban mall)

2. **Temporal Factors:**
   - Time of day (peak hours = higher floor)
   - Day of week (weekend = higher floor)
   - Season (holiday season = higher floor)
   - Events (Art Basel week = higher floor)

3. **Demand Indicators:**
   - Historical fill rate (low fill = lower floor)
   - Bid density (multiple bidders = higher floor)
   - Category demand (entertainment launch = higher floor for relevant properties)

4. **Campaign Pacing:**
   - Behind on revenue goal = lower floor (drive volume)
   - Ahead of goal = higher floor (maximize margin)
   - Property owner guarantee = lower floor (ensure delivery)

**Pricing Algorithm:**

```python
def calculate_floor_price(property, timestamp, historical_data):
    base_floor = property.base_cpm  # e.g., $50

    # Time-based multiplier
    time_multiplier = get_time_multiplier(timestamp)  # 0.8 to 1.5

    # Demand multiplier based on recent fill rate
    fill_rate = get_recent_fill_rate(property, hours=24)
    demand_multiplier = 1.0 if fill_rate > 0.7 else 0.8

    # Event multiplier (nearby events boost demand)
    event_multiplier = get_event_multiplier(property, timestamp)  # 1.0 to 2.0

    # Pacing adjustment
    pacing_adjustment = get_pacing_adjustment(property, timestamp)  # 0.9 to 1.1

    dynamic_floor = (
        base_floor *
        time_multiplier *
        demand_multiplier *
        event_multiplier *
        pacing_adjustment
    )

    # Ensure within acceptable range
    return max(min(dynamic_floor, base_floor * 2.0), base_floor * 0.5)
```

**A/B Testing and Optimization:**

- Test different floor price strategies
- Measure impact on fill rate, revenue, and advertiser satisfaction
- Continuously refine algorithm
- Property-specific learning (different properties have different optimal pricing)

**Target Outcome:**

- 10-15% revenue increase through yield optimization
- Maintain 60%+ fill rate
- Minimize advertiser frustration (stable pricing, not wildly volatile)

### Fraud Prevention and Brand Safety

**Fraud Risks in AR Advertising:**

1. **Fake Impressions:** Bots or fake devices generating impressions
2. **Location Spoofing:** Users faking their location to see ads
3. **Creative Manipulation:** Ads not rendering as intended
4. **Click Fraud:** Fake engagement events
5. **Arbitrage:** Reselling inventory without adding value

**Fraud Prevention Measures:**

**1. Device Verification**

- Verify AR device authenticity (Meta, Apple, Snap official apps only)
- Check device ID against known fraud databases
- Rate limiting per device (max impressions per day)
- Behavioral analysis (human movement patterns vs bots)

**2. Location Verification**

- GPS accuracy requirements (± 10 meters)
- Multiple location signals (GPS, WiFi, cellular)
- Movement pattern analysis (is user actually walking through property?)
- Beacon verification (where deployed)

**3. Impression Verification**

*Partner with Third-Party Verification:*
- MOAT (Oracle)
- Integral Ad Science (IAS)
- DoubleVerify

*Verification Checks:*
- Ad rendered correctly
- Viewability (percentage of ad in view)
- Time in view (minimum 2 seconds)
- User attention (gaze tracking where available)

**4. Brand Safety**

*Content Verification:*
- Automated creative scanning (prohibited content detection)
- Manual review for sensitive campaigns
- Property owner approval workflow
- Advertiser exclusion lists (competitor blocking)

*Contextual Safety:*
- Real-time news monitoring (avoid properties with negative news)
- Event monitoring (protests, emergencies)
- Sentiment analysis (social media about property)
- Dynamic blocking (pause property if safety issue arises)

**5. Transparency and Reporting**

- ads.txt for AR (domain verification)
- Supply chain transparency (IAB Ads.txt and App-Ads.txt)
- Real-time blocking and removing (advertiser controls)
- Detailed log files for auditing

**Fraud Rate Target:** <2% (industry standard is 5-10%)

## Industry Standards and Thought Leadership

### Establishing AR Advertising Standards

**The Challenge:**

AR advertising is too new for established standards. We must help create them or risk fragmentation.

**Strategy: Lead Standards Development**

**1. IAB Engagement**

*Interactive Advertising Bureau (IAB):*
- Trade organization setting digital advertising standards
- OpenRTB, VAST, VPAID, ads.txt all IAB standards
- Must engage early to influence AR standards

*Approach:*
- Apply for IAB membership ($25K annually)
- Join relevant committees:
  - Mobile and Emerging Platforms
  - OpenRTB Working Group
  - Video and Audio Standards
- Propose AR advertising standards working group
- Contribute technical specifications

*Deliverables:*
- AR Ad Format Specification (creative standards)
- OpenRTB Extension for AR (bid request/response)
- AR Measurement Guidelines (viewability, engagement)
- AR Privacy Framework (consent, data handling)

**2. Industry Thought Leadership**

*Whitepapers and Research:*
- "The State of AR Advertising" (annual benchmark report)
- "Technical Specifications for Spatial Advertising"
- "Privacy and Consent in AR Advertising"
- "Measurement and Attribution in AR"

*Conference Speaking:*
- IAB Annual Leadership Meeting
- Advertising Week (NY, LA, Tokyo)
- AdExchanger's Programmatic IO
- Mobile World Congress

*Media Relations:*
- AdExchanger (industry news)
- Digiday (marketing and advertising)
- TechCrunch (technology and startups)
- AdAge (advertising trade publication)

**3. Open Source Contributions**

*Release Open Source Tools:*
- AR creative validation library
- OpenRTB AR extension reference implementation
- Privacy-safe location hashing algorithms
- AR measurement SDK

*Benefits:*
- Establishes technical credibility
- Encourages adoption of our standards
- Builds developer community
- Attracts technical talent

**4. Industry Partnerships**

*Technology Partners:*
- Meta (Orion AR glasses)
- Apple (Vision Pro)
- Snap (Spectacles)

*Purpose:*
- Early access to AR platforms
- Influence ad platform development
- Co-marketing opportunities
- Technical integration support

*Trade Organizations:*
- IAB (Interactive Advertising Bureau)
- OAAA (Out of Home Advertising Association)
- MRC (Media Rating Council)

*Purpose:*
- Standards development
- Industry education
- Regulatory advocacy
- Measurement certification

## Budget and Resource Planning

**Total Ad Tech Integration Budget: $1.2M (18 months)**

### Engineering Team (Month 1-18)

**Core Team:**
- Lead Engineer / Architect: $180K × 1.5 years = $270K
- Backend Engineers: $150K × 2 × 1.5 years = $450K
- Data Engineer: $140K × 1.5 years = $210K
- QA Engineer: $120K × 1.5 years = $180K

**Total Engineering: $1.11M**

Wait, that's already over budget. Let me recalculate:

**Revised Engineering Team:**
- Lead Engineer (months 1-18): $180K × 1.5 = $270K
- Backend Engineer #1 (months 1-18): $150K × 1.5 = $225K
- Backend Engineer #2 (months 6-18): $150K × 1.0 = $150K
- Data Engineer (months 3-18): $140K × 1.25 = $175K

**Total Engineering: $820K**

### DSP/SSP Integration Partnerships

- Magnite SSP partnership development: $50K
- DSP integration support (5 DSPs × $20K): $100K
- Legal and contracting: $50K

**Total Partnerships: $200K**

### Third-Party Services

- MOAT/IAS verification integration: $40K
- LiveRamp identity resolution: $30K
- Foursquare location attribution: $30K

**Total Services: $100K**

### Industry Standards and Thought Leadership

- IAB membership and participation: $25K
- Conference speaking and sponsorships: $30K
- Whitepaper research and production: $20K
- Legal (privacy, compliance review): $25K

**Total Standards: $100K**

**Total Budget: $1.22M**

Slightly over, but within range. Can reduce by:
- Backend Engineer #2 starts month 8 instead of 6 (saves $25K)
- Defer some conference sponsorships to Year 2

**Revised Total: $1.2M (on budget)**

## Success Metrics and KPIs

### Phase 1: SSP Integration (Months 1-9)

**Technical Metrics:**
- Integration complete: Month 7
- 5 DSPs enabled: Month 9
- Bid response time: <100ms (95th percentile)
- Platform uptime: 99.9%
- Discrepancy rate: <10%

**Business Metrics:**
- Programmatic revenue: $200K (30% of total)
- Fill rate: 50%
- Average CPM: $60
- Active DSPs: 5
- Active campaigns: 15

### Phase 2: Direct Integrations (Months 10-18)

**Technical Metrics:**
- Direct integrations complete: 5 DSPs
- Bid response time: <50ms (95th percentile)
- Platform uptime: 99.95%
- Discrepancy rate: <5%

**Business Metrics:**
- Programmatic revenue: $2M (60% of total)
- Fill rate: 65%
- Average CPM: $75
- PMP deals: 10 active
- Programmatic renewal rate: 80%

### Phase 3: Advanced Capabilities (Months 19-24)

**Technical Metrics:**
- Yield optimization live
- Audience targeting live
- Fraud rate: <2%
- Brand safety violations: <1%

**Business Metrics:**
- Programmatic revenue: $6M (75% of total)
- Fill rate: 75%
- Average CPM: $85 (boosted by PMP and yield optimization)
- PMP deals: $2M (33% of programmatic)
- Advertiser NPS: 40+

## Conclusion

Ad tech integration is critical for scaling SpatialRights beyond manual sales. By integrating with the programmatic advertising ecosystem, we enable agencies and advertisers to buy AR inventory through familiar platforms and workflows, dramatically reducing friction.

Our hybrid approach - SSP partnership for quick market entry, followed by direct DSP integrations for control and economics - balances speed with long-term strategic value. Within 18 months, we can achieve 60-75% of revenue through programmatic, with sophisticated targeting, optimization, and measurement capabilities.

Success requires:
- **Strong engineering execution** (can't compromise on technical quality)
- **Deep DSP partnerships** (relationships matter in ad tech)
- **Industry leadership** (establish standards before competitors)
- **Privacy and brand safety** (table stakes for advertiser trust)

The 18-month timeline is aggressive but achievable with focused execution. The result: a programmatic AR advertising platform that's the default buying channel as AR glasses achieve mass adoption.

**Immediate Next Steps:**

1. **Hire Lead Engineer** - Critical first hire for ad tech development
2. **Approach Magnite** - Initiate SSP partnership discussions
3. **OpenRTB specification** - Draft AR extension proposal
4. **Join IAB** - Engage with standards bodies early
5. **DSP target list** - Finalize integration priority and approach strategy
6. **Verification partners** - Initial conversations with MOAT/IAS
7. **Engineering roadmap** - Detailed sprint planning for first 6 months

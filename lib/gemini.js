// Gemini AI Integration for SpatialRights Platform
// Gemini 2.0 Flash is a text-only model - used for generating descriptions and prompts

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// NOTE: Gemini 2.0 Flash is TEXT-ONLY. Cannot generate images.
// Use this for prompt generation, descriptions, and text content.
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Generate a detailed AR visualization prompt for image generation services
 * These prompts can be used with Imagen 3, DALL-E 3, or Stable Diffusion
 */
export async function generateARVisualizationPrompt(propertyData) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `You are an expert prompt engineer for AI image generation systems. Create a highly detailed, photorealistic image generation prompt for an AR (Augmented Reality) advertising visualization.

BUILDING DETAILS:
- Name: ${propertyData.building_name}
- Location: ${propertyData.address}, ${propertyData.city}, ${propertyData.state}
- Type: ${propertyData.building_type}
- Height: ${propertyData.building_height_feet} feet
- Year Built: ${propertyData.year_built}
- Architecture Style: ${propertyData.architectural_style || 'Modern'}

VISUALIZATION REQUIREMENTS:
1. Show the building facade in high-quality architectural photography style
2. Overlay 3-5 AR advertising zones marked with glowing wireframe boxes
3. Include sample advertisements from premium brands (Nike, Apple, Meta, Google, Disney, etc.)
4. Add futuristic AR interface elements (distance markers, engagement metrics, spatial anchors)
5. Use a color palette of neon blue (#00D4FF) and electric purple (#9D4EDD)
6. Style should evoke Blade Runner 2049 meets Apple product launch aesthetics
7. 8K quality, photorealistic rendering

BRAND EXAMPLES TO FEATURE:
- Technology: Apple Vision Pro, Meta Quest 3, Google Pixel
- Fashion: Nike Air Jordan, Supreme, Gucci
- Entertainment: Disney+, Netflix, Marvel Studios
- Automotive: Tesla, Mercedes EQS, Rivian

Create a comprehensive image generation prompt (300-500 words) that will produce stunning, acquisition-pitch-ready AR visualization imagery. Focus on making the AR overlays look realistic, futuristic, and highly valuable for advertisers.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Generate compelling property description for marketing materials
 */
export async function generatePropertyDescription(propertyData) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Create a compelling 2-3 paragraph description for this AR advertising property that would appeal to Fortune 500 advertisers and strategic acquirers like Google or Meta.

PROPERTY DETAILS:
- Name: ${propertyData.building_name}
- Location: ${propertyData.address}, ${propertyData.city}, ${propertyData.state}
- Daily Foot Traffic: ${propertyData.foot_traffic_daily?.toLocaleString()} people
- Visibility Score: ${propertyData.visibility_score}/10
- Monthly Revenue Potential: $${propertyData.total_monthly_revenue?.toLocaleString()}

Focus on:
1. Strategic value for AR advertising
2. Premium audience demographics
3. Iconic visibility and recognition
4. Revenue opportunity in the $31.8B AR advertising market

Write in a sophisticated, data-driven tone suitable for M&A materials.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Generate AR zone technical specifications
 */
export async function generateZoneSpecifications(propertyData, zoneCount = 4) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Generate ${zoneCount} AR advertising zone specifications for this building. Each zone should include technical details suitable for a platform API response.

BUILDING:
- Name: ${propertyData.building_name}
- Total Facade Area: ${propertyData.total_facade_area_sqft} sq ft
- Height: ${propertyData.building_height_feet} feet
- Visibility Score: ${propertyData.visibility_score}/10

For each zone, provide:
1. Zone name and position (North/South/East/West facade, Entrance, etc.)
2. Dimensions (width x height in feet)
3. Square footage
4. Optimal ad format (Bulletin, 30-Sheet, Custom, etc.)
5. Monthly rate ($50K - $500K based on position and visibility)
6. Visibility and engagement scores
7. Best suited advertiser types

Format as a JSON array of zone objects with these properties:
- zone_name
- facade_direction
- width_feet
- height_feet
- square_footage
- zone_type
- base_price_monthly
- visibility_score (1-10)
- engagement_rate (0.05 - 0.15)
- description
- ideal_advertisers (array of strings)

Return ONLY valid JSON, no additional text.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  throw new Error('Failed to generate valid zone specifications JSON');
}

/**
 * Generate acquisition pitch content
 */
export async function generateAcquisitionPitch(platformMetrics) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Create a compelling executive summary for an acquisition pitch deck targeting Google or Meta. This is for SpatialRights, an AR property advertising rights platform.

PLATFORM METRICS:
- Total Properties: ${platformMetrics.totalProperties}
- Total AR Zones: ${platformMetrics.totalZones}
- Monthly Revenue: $${platformMetrics.monthlyRevenue?.toLocaleString()}
- Annual Run Rate: $${(platformMetrics.monthlyRevenue * 12)?.toLocaleString()}
- Market Size: $31.8B (AR advertising market)
- Key Markets: New York, Los Angeles, San Francisco, Chicago, Miami, Seattle

TARGET ACQUIRERS:
- Google (AR glasses, Maps integration, local advertising)
- Meta (AR/VR ecosystem, Instagram/Facebook advertising)

Create a 3-4 paragraph executive summary that:
1. Positions this as the "Airbnb of AR advertising space"
2. Highlights the platform's strategic value for spatial computing
3. Emphasizes the first-mover advantage in AR property rights
4. Demonstrates scalability and network effects
5. Shows alignment with acquirer's AR/spatial computing strategy

Valuation target: $150M - $250M based on market position and strategic value.

Write in a sophisticated, boardroom-ready tone.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Batch generate prompts for multiple properties
 */
export async function batchGeneratePrompts(properties) {
  const prompts = [];

  for (const property of properties) {
    try {
      const prompt = await generateARVisualizationPrompt(property);
      prompts.push({
        propertyId: property.id,
        propertyName: property.building_name,
        prompt: prompt,
        status: 'success'
      });

      // Rate limiting: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      prompts.push({
        propertyId: property.id,
        propertyName: property.building_name,
        error: error.message,
        status: 'failed'
      });
    }
  }

  return prompts;
}

/**
 * Test Gemini API connection
 */
export async function testGeminiConnection() {
  if (!genAI) {
    return {
      success: false,
      error: 'GEMINI_API_KEY not configured'
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent('Test connection. Reply with: API connected successfully.');
    const response = await result.response;

    return {
      success: true,
      message: response.text(),
      model: 'gemini-2.0-flash-exp'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

export default {
  generateARVisualizationPrompt,
  generatePropertyDescription,
  generateZoneSpecifications,
  generateAcquisitionPitch,
  batchGeneratePrompts,
  testGeminiConnection
};

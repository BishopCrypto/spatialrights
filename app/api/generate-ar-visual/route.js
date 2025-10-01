// API endpoint for generating AR visualization images
// Supports multiple image generation services: Imagen 3, DALL-E 3, Stability AI

import { NextResponse } from 'next/server';
import { generateARVisualizationPrompt } from '@/lib/gemini';
import { properties } from '@/lib/sample-data';

/**
 * Image generation service configuration
 * Set IMAGE_GENERATION_SERVICE in .env.local to: 'imagen', 'dalle', or 'stability'
 */
const IMAGE_SERVICE = process.env.IMAGE_GENERATION_SERVICE || 'none';

/**
 * Generate AR visualization using Google Imagen 3
 */
async function generateWithImagen(prompt) {
  // Requires: npm install @google-cloud/aiplatform
  // Requires: GOOGLE_CLOUD_PROJECT_ID and GOOGLE_APPLICATION_CREDENTIALS in .env.local

  if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID not configured');
  }

  // TODO: Implement Imagen 3 integration
  // const aiplatform = require('@google-cloud/aiplatform');
  // const {PredictionServiceClient} = aiplatform.v1;
  // const {helpers} = aiplatform;
  //
  // const client = new PredictionServiceClient({
  //   apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  // });
  //
  // const endpoint = `projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/locations/us-central1/publishers/google/models/imagegeneration@006`;
  //
  // const instance = {
  //   prompt: prompt,
  // };
  //
  // const instanceValue = helpers.toValue(instance);
  // const instances = [instanceValue];
  //
  // const request = {
  //   endpoint,
  //   instances,
  // };
  //
  // const [response] = await client.predict(request);
  // const prediction = response.predictions[0];
  //
  // return {
  //   imageData: prediction.bytesBase64Encoded,
  //   service: 'imagen3'
  // };

  return {
    error: 'Imagen 3 integration not yet implemented',
    setup_instructions: 'See AR_IMAGE_GENERATION_ANALYSIS.md for setup instructions'
  };
}

/**
 * Generate AR visualization using OpenAI DALL-E 3
 */
async function generateWithDallE(prompt) {
  // Requires: npm install openai
  // Requires: OPENAI_API_KEY in .env.local

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  try {
    // TODO: Implement DALL-E 3 integration
    // const OpenAI = require('openai');
    // const openai = new OpenAI({
    //   apiKey: process.env.OPENAI_API_KEY
    // });
    //
    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: prompt,
    //   n: 1,
    //   size: "1792x1024",
    //   quality: "hd",
    //   style: "vivid"
    // });
    //
    // return {
    //   imageUrl: response.data[0].url,
    //   service: 'dalle3'
    // };

    return {
      error: 'DALL-E 3 integration not yet implemented',
      setup_instructions: 'Run: npm install openai'
    };
  } catch (error) {
    throw new Error(`DALL-E API error: ${error.message}`);
  }
}

/**
 * Generate AR visualization using Stability AI
 */
async function generateWithStability(prompt) {
  // Requires: STABILITY_API_KEY in .env.local

  if (!process.env.STABILITY_API_KEY) {
    throw new Error('STABILITY_API_KEY not configured');
  }

  try {
    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/sd3', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        output_format: 'jpeg',
        aspect_ratio: '16:9',
        model: 'sd3-large'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stability API error: ${error}`);
    }

    const result = await response.json();

    return {
      imageData: result.image,
      service: 'stability',
      format: 'base64'
    };
  } catch (error) {
    throw new Error(`Stability AI error: ${error.message}`);
  }
}

/**
 * Main image generation handler
 */
async function generateImage(propertyData) {
  // First, generate the prompt using Gemini
  const prompt = await generateARVisualizationPrompt(propertyData);

  // Then use the configured service to generate the image
  let result;

  switch (IMAGE_SERVICE) {
    case 'imagen':
      result = await generateWithImagen(prompt);
      break;

    case 'dalle':
      result = await generateWithDallE(prompt);
      break;

    case 'stability':
      result = await generateWithStability(prompt);
      break;

    default:
      return {
        prompt: prompt,
        error: 'No image generation service configured',
        availableServices: ['imagen', 'dalle', 'stability'],
        instructions: 'Set IMAGE_GENERATION_SERVICE in .env.local to one of the available services',
        setup: 'See AR_IMAGE_GENERATION_ANALYSIS.md for detailed setup instructions'
      };
  }

  return {
    ...result,
    prompt: prompt,
    propertyId: propertyData.id,
    propertyName: propertyData.building_name
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    if (!propertyId) {
      return NextResponse.json(
        {
          error: 'propertyId parameter required',
          example: '/api/generate-ar-visual?propertyId=empire-state-building',
          availableProperties: properties.map(p => p.id)
        },
        { status: 400 }
      );
    }

    const property = properties.find(p => p.id === propertyId);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    const result = await generateImage(property);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      {
        error: error.message,
        service: IMAGE_SERVICE,
        instructions: 'Check .env.local configuration and API keys'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { propertyData, batchMode, propertyIds } = await request.json();

    if (batchMode && propertyIds) {
      // Batch generation
      const results = [];

      for (const propertyId of propertyIds) {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
          try {
            const result = await generateImage(property);
            results.push({
              propertyId: property.id,
              status: 'success',
              ...result
            });

            // Rate limiting: wait 2 seconds between requests
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (error) {
            results.push({
              propertyId: property.id,
              status: 'failed',
              error: error.message
            });
          }
        }
      }

      return NextResponse.json({
        totalRequested: propertyIds.length,
        results: results,
        successCount: results.filter(r => r.status === 'success').length,
        failedCount: results.filter(r => r.status === 'failed').length
      });
    } else if (propertyData) {
      // Single generation
      const result = await generateImage(propertyData);
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: 'Invalid request. Provide either propertyData or batchMode with propertyIds' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

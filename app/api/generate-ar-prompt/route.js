// API endpoint for generating AR visualization prompts using Gemini
// These prompts can then be used with Imagen 3, DALL-E 3, or Stable Diffusion

import { NextResponse } from 'next/server';
import {
  generateARVisualizationPrompt,
  generatePropertyDescription,
  generateZoneSpecifications,
  batchGeneratePrompts,
  testGeminiConnection
} from '@/lib/gemini';
import { properties } from '@/lib/sample-data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'test';
    const propertyId = searchParams.get('propertyId');

    switch (action) {
      case 'test':
        const testResult = await testGeminiConnection();
        return NextResponse.json(testResult);

      case 'prompt': {
        if (!propertyId) {
          return NextResponse.json(
            { error: 'propertyId required for prompt generation' },
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

        const prompt = await generateARVisualizationPrompt(property);
        return NextResponse.json({
          propertyId: property.id,
          propertyName: property.building_name,
          prompt: prompt,
          usage: 'Use this prompt with Imagen 3, DALL-E 3, or Stable Diffusion'
        });
      }

      case 'description': {
        if (!propertyId) {
          return NextResponse.json(
            { error: 'propertyId required for description generation' },
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

        const description = await generatePropertyDescription(property);
        return NextResponse.json({
          propertyId: property.id,
          propertyName: property.building_name,
          description: description
        });
      }

      case 'zones': {
        if (!propertyId) {
          return NextResponse.json(
            { error: 'propertyId required for zone generation' },
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

        const zoneCount = parseInt(searchParams.get('count') || '4');
        const zones = await generateZoneSpecifications(property, zoneCount);
        return NextResponse.json({
          propertyId: property.id,
          propertyName: property.building_name,
          zones: zones
        });
      }

      case 'batch': {
        // Generate prompts for all properties
        const prompts = await batchGeneratePrompts(properties);
        return NextResponse.json({
          totalProperties: properties.length,
          prompts: prompts,
          successCount: prompts.filter(p => p.status === 'success').length,
          failedCount: prompts.filter(p => p.status === 'failed').length
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: test, prompt, description, zones, or batch' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      {
        error: error.message,
        note: 'Make sure GEMINI_API_KEY is set in .env.local'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, propertyData, properties: batchProperties } = body;

    switch (action) {
      case 'generate-prompt': {
        if (!propertyData) {
          return NextResponse.json(
            { error: 'propertyData required' },
            { status: 400 }
          );
        }

        const prompt = await generateARVisualizationPrompt(propertyData);
        return NextResponse.json({
          prompt: prompt,
          usage: 'Use this prompt with Imagen 3, DALL-E 3, or Stable Diffusion'
        });
      }

      case 'batch-generate': {
        if (!batchProperties || !Array.isArray(batchProperties)) {
          return NextResponse.json(
            { error: 'properties array required' },
            { status: 400 }
          );
        }

        const prompts = await batchGeneratePrompts(batchProperties);
        return NextResponse.json({
          totalProperties: batchProperties.length,
          prompts: prompts,
          successCount: prompts.filter(p => p.status === 'success').length,
          failedCount: prompts.filter(p => p.status === 'failed').length
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

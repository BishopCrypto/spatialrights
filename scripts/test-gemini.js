#!/usr/bin/env node

/**
 * Test script for Gemini AI integration
 * Run with: node scripts/test-gemini.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function testGeminiIntegration() {
  console.log('='.repeat(60));
  console.log('SpatialRights - Gemini AI Integration Test');
  console.log('='.repeat(60));
  console.log('');

  // Check for API key
  console.log('1. Checking Environment Configuration...');
  const geminiKey = process.env.GEMINI_API_KEY;
  const imageService = process.env.IMAGE_GENERATION_SERVICE;

  if (!geminiKey) {
    console.log('   ❌ GEMINI_API_KEY not found in .env.local');
    console.log('   📝 Get your key at: https://aistudio.google.com/app/apikey');
    console.log('   📝 Add to .env.local: GEMINI_API_KEY=your-key-here');
    console.log('');
    console.log('❌ Test failed: Missing API key');
    process.exit(1);
  }

  console.log('   ✅ GEMINI_API_KEY found');
  console.log(`   📊 IMAGE_GENERATION_SERVICE: ${imageService || 'none (prompts only)'}`);
  console.log('');

  // Test Gemini import
  console.log('2. Loading Gemini Module...');
  try {
    const geminiModule = await import('../lib/gemini.js');
    console.log('   ✅ Gemini module loaded successfully');
    console.log('');

    // Test API connection
    console.log('3. Testing Gemini API Connection...');
    const connectionTest = await geminiModule.testGeminiConnection();

    if (connectionTest.success) {
      console.log('   ✅ API connection successful');
      console.log(`   📊 Model: ${connectionTest.model}`);
      console.log(`   📝 Response: ${connectionTest.message}`);
      console.log('');
    } else {
      console.log('   ❌ API connection failed');
      console.log(`   📝 Error: ${connectionTest.error}`);
      console.log('');
      console.log('❌ Test failed: API connection error');
      process.exit(1);
    }

    // Test prompt generation
    console.log('4. Testing Prompt Generation...');
    const sampleProperty = {
      id: 'empire-state-building',
      building_name: 'Empire State Building',
      address: '350 5th Ave',
      city: 'New York',
      state: 'NY',
      building_height_feet: 1454,
      year_built: 1931,
      building_type: 'office',
      foot_traffic_daily: 50000,
      visibility_score: 10,
      total_monthly_revenue: 580000,
      architectural_style: 'Art Deco'
    };

    const prompt = await geminiModule.generateARVisualizationPrompt(sampleProperty);
    console.log('   ✅ Prompt generated successfully');
    console.log('   📝 Prompt preview (first 200 chars):');
    console.log('   ' + prompt.substring(0, 200).replace(/\n/g, '\n   ') + '...');
    console.log('');
    console.log(`   📊 Full prompt length: ${prompt.length} characters`);
    console.log('');

    // Test description generation
    console.log('5. Testing Description Generation...');
    const description = await geminiModule.generatePropertyDescription(sampleProperty);
    console.log('   ✅ Description generated successfully');
    console.log('   📝 Description preview:');
    console.log('   ' + description.substring(0, 300).replace(/\n/g, '\n   ') + '...');
    console.log('');

    // Summary
    console.log('='.repeat(60));
    console.log('✅ All Tests Passed!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Next Steps:');
    console.log('');
    console.log('1. Start the development server:');
    console.log('   npm run dev');
    console.log('');
    console.log('2. Test API endpoints:');
    console.log('   curl http://localhost:3200/api/generate-ar-prompt?action=test');
    console.log('');
    console.log('3. Generate a prompt for a property:');
    console.log('   curl "http://localhost:3200/api/generate-ar-prompt?action=prompt&propertyId=empire-state-building"');
    console.log('');
    console.log('4. For image generation, configure one of these services:');
    console.log('   - Google Imagen 3 (recommended for acquisition)');
    console.log('   - OpenAI DALL-E 3 (easiest to setup)');
    console.log('   - Stability AI (most cost-effective)');
    console.log('');
    console.log('   See SETUP_IMAGE_GENERATION.md for detailed instructions.');
    console.log('');

  } catch (error) {
    console.log('   ❌ Error loading Gemini module');
    console.log(`   📝 Error: ${error.message}`);
    console.log('');
    console.log('❌ Test failed: Module error');
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Make sure you ran: npm install @google/generative-ai');
    console.log('2. Check that lib/gemini.js exists and is valid');
    console.log('3. Verify .env.local is in the project root');
    console.log('');
    process.exit(1);
  }
}

// Run the test
testGeminiIntegration().catch(error => {
  console.error('');
  console.error('❌ Unexpected error:', error.message);
  console.error('');
  process.exit(1);
});

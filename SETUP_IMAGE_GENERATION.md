# AR Image Generation Setup Guide

This guide explains how to set up AI-powered AR visualization image generation for the SpatialRights platform.

## Important Limitation

**Gemini 2.0 Flash is a text-only model** and cannot generate images. However, it's extremely valuable for:
- Generating high-quality prompts for image generation services
- Creating property descriptions and marketing copy
- Generating AR zone specifications
- Producing acquisition pitch materials

For actual image generation, you need to use a separate service (see options below).

## Quick Start (Recommended Path)

### Option 1: Google Imagen 3 (Best for Acquisition Strategy)

**Why Choose This?**
- Official Google AI image generation
- Shows commitment to Google ecosystem (strategic for $150M-$250M acquisition)
- Enterprise-grade quality
- Can mention "powered by Google AI" in pitch materials

**Setup Steps:**

1. **Create Google Cloud Project**
   ```bash
   # Go to: https://console.cloud.google.com/
   # Create new project: spatialrights-ai
   ```

2. **Enable Vertex AI API**
   ```bash
   # In Google Cloud Console:
   # APIs & Services > Enable APIs and Services
   # Search for "Vertex AI API" and enable it
   ```

3. **Create Service Account**
   ```bash
   # IAM & Admin > Service Accounts > Create Service Account
   # Name: spatialrights-imagen
   # Role: Vertex AI User
   # Create and download JSON key
   ```

4. **Install Dependencies**
   ```bash
   npm install @google-cloud/aiplatform
   ```

5. **Configure Environment Variables**
   ```bash
   # Add to .env.local:
   GEMINI_API_KEY=your-gemini-key
   IMAGE_GENERATION_SERVICE=imagen
   GOOGLE_CLOUD_PROJECT_ID=your-project-id
   GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account-key.json
   ```

6. **Uncomment Imagen Code**
   - Open `/app/api/generate-ar-visual/route.js`
   - Uncomment the Imagen implementation in `generateWithImagen()` function

**Cost**: ~$0.02-0.04 per image = $0.26-0.52 for all 13 properties

---

### Option 2: OpenAI DALL-E 3 (Fastest to Implement)

**Why Choose This?**
- Easiest setup (just API key)
- High-quality photorealistic images
- Proven reliability
- Fast generation

**Setup Steps:**

1. **Get API Key**
   ```bash
   # Go to: https://platform.openai.com/api-keys
   # Create new API key
   ```

2. **Install Dependencies**
   ```bash
   npm install openai
   ```

3. **Configure Environment Variables**
   ```bash
   # Add to .env.local:
   GEMINI_API_KEY=your-gemini-key
   IMAGE_GENERATION_SERVICE=dalle
   OPENAI_API_KEY=sk-...
   ```

4. **Uncomment DALL-E Code**
   - Open `/app/api/generate-ar-visual/route.js`
   - Uncomment the DALL-E implementation in `generateWithDallE()` function

**Cost**: ~$0.04-0.08 per image = $0.52-1.04 for all 13 properties

---

### Option 3: Stability AI (Most Cost-Effective)

**Why Choose This?**
- Lowest cost
- Good quality
- Fast generation
- No Google Cloud setup needed

**Setup Steps:**

1. **Get API Key**
   ```bash
   # Go to: https://platform.stability.ai/account/keys
   # Create new API key
   ```

2. **Configure Environment Variables**
   ```bash
   # Add to .env.local:
   GEMINI_API_KEY=your-gemini-key
   IMAGE_GENERATION_SERVICE=stability
   STABILITY_API_KEY=sk-...
   ```

3. **No Code Changes Needed**
   - Stability AI implementation is already complete in the code

**Cost**: ~$0.002-0.01 per image = $0.03-0.13 for all 13 properties

---

## Testing the Integration

### 1. Test Gemini API Connection

```bash
curl http://localhost:3200/api/generate-ar-prompt?action=test
```

Expected response:
```json
{
  "success": true,
  "message": "API connected successfully.",
  "model": "gemini-2.0-flash-exp"
}
```

### 2. Generate a Prompt for One Property

```bash
curl http://localhost:3200/api/generate-ar-prompt?action=prompt&propertyId=empire-state-building
```

This returns a detailed prompt that can be used with any image generation service.

### 3. Generate an Image (Once Configured)

```bash
curl http://localhost:3200/api/generate-ar-visual?propertyId=empire-state-building
```

### 4. Batch Generate All Properties

```bash
curl -X POST http://localhost:3200/api/generate-ar-visual \
  -H "Content-Type: application/json" \
  -d '{
    "batchMode": true,
    "propertyIds": [
      "empire-state-building",
      "times-square-billboard",
      "apple-fifth-avenue",
      "salesforce-tower-sf",
      "willis-tower-chicago",
      "staples-center-la",
      "freedom-tower-nyc",
      "chrysler-building",
      "flatiron-building",
      "madison-square-garden",
      "miami-beach-convention",
      "seattle-space-needle",
      "brooklyn-coffee-shop"
    ]
  }'
```

---

## API Endpoints

### `/api/generate-ar-prompt` (Gemini Text Generation)

**GET Parameters:**
- `action=test` - Test Gemini API connection
- `action=prompt&propertyId=XXX` - Generate image generation prompt
- `action=description&propertyId=XXX` - Generate property description
- `action=zones&propertyId=XXX&count=4` - Generate AR zone specifications
- `action=batch` - Generate prompts for all properties

**POST Body:**
```json
{
  "action": "generate-prompt",
  "propertyData": {
    "building_name": "Empire State Building",
    "address": "350 5th Ave",
    ...
  }
}
```

### `/api/generate-ar-visual` (Image Generation)

**GET Parameters:**
- `propertyId=XXX` - Generate image for one property

**POST Body (Single):**
```json
{
  "propertyData": {
    "id": "empire-state-building",
    ...
  }
}
```

**POST Body (Batch):**
```json
{
  "batchMode": true,
  "propertyIds": ["empire-state-building", "times-square-billboard", ...]
}
```

---

## Workflow Options

### Workflow A: Fully Automated (Recommended)

1. Configure your chosen image generation service
2. Run batch generation API endpoint
3. Images are generated and returned automatically
4. Save images to `/public/images/`

### Workflow B: Gemini Prompts + Manual Design

1. Use Gemini to generate detailed prompts
2. Export prompts to a designer or design team
3. Create professional, acquisition-ready visuals
4. **Best quality for $150M-$250M acquisition materials**

### Workflow C: Hybrid Approach

1. Use AI generation for rapid iteration
2. Pick best 3-5 images
3. Have designer refine for final pitch deck
4. **Balance of speed and quality**

---

## Environment Variables Reference

```bash
# Required for all workflows
GEMINI_API_KEY=your-gemini-key

# Required for image generation
IMAGE_GENERATION_SERVICE=imagen|dalle|stability|none

# For Imagen 3
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json

# For DALL-E 3
OPENAI_API_KEY=sk-...

# For Stability AI
STABILITY_API_KEY=sk-...
```

---

## Troubleshooting

### "GEMINI_API_KEY not configured"

1. Get API key at: https://aistudio.google.com/app/apikey
2. Add to `.env.local`
3. Restart dev server

### "No image generation service configured"

1. Set `IMAGE_GENERATION_SERVICE` in `.env.local`
2. Configure the corresponding API key
3. Uncomment implementation code if needed (Imagen or DALL-E)

### "Google Cloud credentials not found"

1. Download service account JSON key
2. Use **absolute path** in `GOOGLE_APPLICATION_CREDENTIALS`
3. Verify file permissions (should be readable)

### Images not saving

The current implementation returns image data/URLs but doesn't automatically save to disk. To save images:

```javascript
// Add this helper function to save images
async function saveImage(imageData, filename) {
  const fs = require('fs');
  const path = require('path');

  const publicPath = path.join(process.cwd(), 'public', 'images', filename);

  if (imageData.startsWith('http')) {
    // URL - download and save
    const response = await fetch(imageData);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(publicPath, Buffer.from(buffer));
  } else {
    // Base64 - decode and save
    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(publicPath, buffer);
  }
}
```

---

## Strategic Recommendations for Acquisition

For a $150M-$250M acquisition by Google or Meta:

1. **Use Google Imagen 3** to demonstrate ecosystem alignment
2. **Generate initial drafts with AI** for rapid iteration
3. **Refine top 5-7 images with professional designer** for pitch deck
4. **Mention "Powered by Google AI"** in materials if using Imagen
5. **Include technical specifications** from Gemini-generated zone data
6. **Show the workflow** - demonstrate platform can generate visualizations at scale

The combination of Gemini (prompts) + Imagen (images) shows deep Google integration and technical sophistication that will resonate with strategic acquirers.

---

## Next Steps

1. Choose your image generation service based on strategy and timeline
2. Configure API keys in `.env.local`
3. Test with a single property first
4. Run batch generation for all 13 properties
5. Review quality and iterate on prompts if needed
6. Integrate images into platform UI
7. Create acquisition pitch deck with visualizations

## Support

For issues or questions:
- Check the detailed analysis in `AR_IMAGE_GENERATION_ANALYSIS.md`
- Review API endpoint implementations in `/app/api/`
- Test Gemini connection first before troubleshooting image generation

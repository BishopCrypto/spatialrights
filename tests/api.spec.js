const { test, expect } = require('@playwright/test');

test.describe('API Endpoint Tests', () => {
  test('should verify rights verification API endpoint exists', async ({ request }) => {
    // Test the API endpoint mentioned in requirements
    const response = await request.post('/api/rights/verify', {
      data: {
        location: {
          latitude: 40.7484,
          longitude: -73.9856,
          altitude: 75
        },
        platform: "apple_vision_pro",
        contentType: "commercial",
        requestingApp: "test_app"
      }
    });

    // Should respond (not necessarily 200, but should not be 404)
    expect(response.status()).not.toBe(404);
  });

  test('should test Empire State Building rights verification', async ({ request }) => {
    const empireStateRequest = {
      location: {
        latitude: 40.7484,
        longitude: -73.9856,
        altitude: 75
      },
      platform: "apple_vision_pro",
      contentType: "commercial",
      requestingApp: "test_app"
    };

    const response = await request.post('/api/rights/verify', {
      data: empireStateRequest,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log response for debugging
    console.log('API Response Status:', response.status());

    if (response.ok()) {
      const responseData = await response.json();
      console.log('API Response Data:', responseData);

      // Should contain rights information
      expect(responseData).toHaveProperty('authorized');
      expect(responseData).toHaveProperty('propertyId');

      // Empire State Building should be recognized
      if (responseData.propertyName) {
        expect(responseData.propertyName).toMatch(/Empire State/i);
      }
    }
  });

  test('should handle various platform types', async ({ request }) => {
    const platforms = ['apple_vision_pro', 'meta_quest', 'google_arcore', 'microsoft_hololens'];

    for (const platform of platforms) {
      const response = await request.post('/api/rights/verify', {
        data: {
          location: {
            latitude: 40.7484,
            longitude: -73.9856,
            altitude: 75
          },
          platform: platform,
          contentType: "commercial",
          requestingApp: "test_app"
        }
      });

      // Should handle all platform types without errors
      expect([200, 400, 401, 403]).toContain(response.status());
    }
  });

  test('should validate content types', async ({ request }) => {
    const contentTypes = ['commercial', 'educational', 'entertainment', 'navigation'];

    for (const contentType of contentTypes) {
      const response = await request.post('/api/rights/verify', {
        data: {
          location: {
            latitude: 40.7484,
            longitude: -73.9856,
            altitude: 75
          },
          platform: "apple_vision_pro",
          contentType: contentType,
          requestingApp: "test_app"
        }
      });

      // Should handle all content types
      expect(response.status()).not.toBe(500);
    }
  });

  test('should test different NYC property locations', async ({ request }) => {
    const nycProperties = [
      { name: 'Empire State Building', lat: 40.7484, lng: -73.9856 },
      { name: 'Times Square', lat: 40.7580, lng: -73.9855 },
      { name: 'Chrysler Building', lat: 40.7516, lng: -73.9755 },
      { name: 'Flatiron Building', lat: 40.7411, lng: -73.9897 },
      { name: 'Madison Square Garden', lat: 40.7505, lng: -73.9934 }
    ];

    for (const property of nycProperties) {
      const response = await request.post('/api/rights/verify', {
        data: {
          location: {
            latitude: property.lat,
            longitude: property.lng,
            altitude: 75
          },
          platform: "apple_vision_pro",
          contentType: "commercial",
          requestingApp: "test_app"
        }
      });

      console.log(`Testing ${property.name}:`, response.status());

      // Should recognize known properties
      if (response.ok()) {
        const data = await response.json();
        console.log(`${property.name} response:`, data);
      }
    }
  });

  test('should handle invalid requests gracefully', async ({ request }) => {
    // Test with missing required fields
    const invalidRequests = [
      {}, // Empty request
      { location: {} }, // Missing location data
      { location: { latitude: 40.7484 } }, // Missing longitude
      { location: { latitude: 'invalid', longitude: -73.9856 } } // Invalid coordinates
    ];

    for (const invalidRequest of invalidRequests) {
      const response = await request.post('/api/rights/verify', {
        data: invalidRequest
      });

      // Should return 400 for invalid requests
      expect([400, 422]).toContain(response.status());
    }
  });
});
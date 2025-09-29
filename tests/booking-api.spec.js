const { test, expect } = require('@playwright/test');

test.describe('Booking API Tests', () => {

  test('should create a new booking via POST /api/bookings', async ({ request }) => {
    const bookingData = {
      zone_id: 'esb-north-facade',
      property_id: 'empire-state-building',
      advertiser_name: 'Test Advertiser',
      advertiser_email: 'test@example.com',
      campaign_name: 'Test Campaign API',
      campaign_description: 'Test campaign for API testing',
      start_date: '2024-12-01',
      end_date: '2024-12-31',
      total_amount: 250000,
      content_type: 'video',
      content_description: 'Test AR video content',
      targeting_demographics: 'Tech professionals 25-45',
      company_name: 'Test Company API',
      company_website: 'https://testcompany.com',
      budget_range: 'standard'
    };

    const response = await request.post('/api/bookings', {
      data: bookingData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(201);

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.booking).toBeDefined();
    expect(result.booking.id).toBeDefined();
    expect(result.booking.advertiser_name).toBe('Test Advertiser');
    expect(result.booking.campaign_name).toBe('Test Campaign API');
    expect(result.booking.status).toBe('pending_approval');
  });

  test('should validate required fields in POST /api/bookings', async ({ request }) => {
    const invalidBookings = [
      {}, // Empty object
      {
        zone_id: 'esb-north-facade',
        // Missing property_id and other required fields
      },
      {
        zone_id: 'esb-north-facade',
        property_id: 'empire-state-building',
        advertiser_name: 'Test',
        // Missing advertiser_email, campaign_name, dates
      }
    ];

    for (const bookingData of invalidBookings) {
      const response = await request.post('/api/bookings', {
        data: bookingData,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      expect(response.status()).toBe(400);
      const result = await response.json();
      expect(result.error).toContain('Missing required field');
    }
  });

  test('should validate date fields in POST /api/bookings', async ({ request }) => {
    const baseBooking = {
      zone_id: 'esb-north-facade',
      property_id: 'empire-state-building',
      advertiser_name: 'Test Advertiser',
      advertiser_email: 'test@example.com',
      campaign_name: 'Test Campaign',
      total_amount: 250000
    };

    // Test past start date
    const pastDateBooking = {
      ...baseBooking,
      start_date: '2020-01-01',
      end_date: '2024-12-31'
    };

    let response = await request.post('/api/bookings', {
      data: pastDateBooking,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(400);
    let result = await response.json();
    expect(result.error).toContain('Start date cannot be in the past');

    // Test end date before start date
    const invalidDateBooking = {
      ...baseBooking,
      start_date: '2024-12-31',
      end_date: '2024-12-01'
    };

    response = await request.post('/api/bookings', {
      data: invalidDateBooking,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(400);
    result = await response.json();
    expect(result.error).toContain('End date must be after start date');
  });

  test('should retrieve bookings via GET /api/bookings', async ({ request }) => {
    const response = await request.get('/api/bookings');

    expect(response.status()).toBe(200);

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.bookings).toBeDefined();
    expect(Array.isArray(result.bookings)).toBe(true);
    expect(result.count).toBeDefined();
  });

  test('should filter bookings by query parameters', async ({ request }) => {
    // Test filtering by zone_id
    const zoneResponse = await request.get('/api/bookings?zone_id=esb-north-facade');
    expect(zoneResponse.status()).toBe(200);

    // Test filtering by property_id
    const propertyResponse = await request.get('/api/bookings?property_id=empire-state-building');
    expect(propertyResponse.status()).toBe(200);

    // Test filtering by status
    const statusResponse = await request.get('/api/bookings?status=pending_approval');
    expect(statusResponse.status()).toBe(200);

    // Test filtering by advertiser email
    const emailResponse = await request.get('/api/bookings?advertiser_email=test@example.com');
    expect(emailResponse.status()).toBe(200);

    // Test limit parameter
    const limitResponse = await request.get('/api/bookings?limit=10');
    expect(limitResponse.status()).toBe(200);

    const limitResult = await limitResponse.json();
    expect(limitResult.bookings.length).toBeLessThanOrEqual(10);
  });

  test('should retrieve specific booking via GET /api/bookings/[id]', async ({ request }) => {
    // First create a booking to retrieve
    const bookingData = {
      zone_id: 'esb-south-facade',
      property_id: 'empire-state-building',
      advertiser_name: 'Specific Test Advertiser',
      advertiser_email: 'specific@example.com',
      campaign_name: 'Specific Test Campaign',
      start_date: '2024-11-01',
      end_date: '2024-11-30',
      total_amount: 180000
    };

    const createResponse = await request.post('/api/bookings', {
      data: bookingData,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.status()).toBe(201);
    const createResult = await createResponse.json();
    const bookingId = createResult.booking.id;

    // Now retrieve the specific booking
    const getResponse = await request.get(`/api/bookings/${bookingId}`);
    expect(getResponse.status()).toBe(200);

    const getResult = await getResponse.json();
    expect(getResult.success).toBe(true);
    expect(getResult.booking).toBeDefined();
    expect(getResult.booking.id).toBe(bookingId);
    expect(getResult.booking.advertiser_name).toBe('Specific Test Advertiser');
    expect(getResult.booking.campaign_name).toBe('Specific Test Campaign');
  });

  test('should return 404 for non-existent booking ID', async ({ request }) => {
    const response = await request.get('/api/bookings/non-existent-id');
    expect(response.status()).toBe(404);

    const result = await response.json();
    expect(result.error).toBe('Booking not found');
  });

  test('should update booking status via PATCH /api/bookings/[id]', async ({ request }) => {
    // First create a booking
    const bookingData = {
      zone_id: 'esb-north-facade',
      property_id: 'empire-state-building',
      advertiser_name: 'Update Test Advertiser',
      advertiser_email: 'update@example.com',
      campaign_name: 'Update Test Campaign',
      start_date: '2024-10-01',
      end_date: '2024-10-31',
      total_amount: 250000
    };

    const createResponse = await request.post('/api/bookings', {
      data: bookingData,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.status()).toBe(201);
    const createResult = await createResponse.json();
    const bookingId = createResult.booking.id;

    // Update the booking status
    const updateData = { status: 'approved' };
    const updateResponse = await request.patch(`/api/bookings/${bookingId}`, {
      data: updateData,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(updateResponse.status()).toBe(200);
    const updateResult = await updateResponse.json();
    expect(updateResult.success).toBe(true);
    expect(updateResult.booking.status).toBe('approved');
  });

  test('should delete booking via DELETE /api/bookings/[id]', async ({ request }) => {
    // First create a booking
    const bookingData = {
      zone_id: 'esb-south-facade',
      property_id: 'empire-state-building',
      advertiser_name: 'Delete Test Advertiser',
      advertiser_email: 'delete@example.com',
      campaign_name: 'Delete Test Campaign',
      start_date: '2024-09-01',
      end_date: '2024-09-30',
      total_amount: 180000
    };

    const createResponse = await request.post('/api/bookings', {
      data: bookingData,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(createResponse.status()).toBe(201);
    const createResult = await createResponse.json();
    const bookingId = createResult.booking.id;

    // Delete the booking
    const deleteResponse = await request.delete(`/api/bookings/${bookingId}`);
    expect(deleteResponse.status()).toBe(200);

    const deleteResult = await deleteResponse.json();
    expect(deleteResult.success).toBe(true);
    expect(deleteResult.message).toContain('deleted successfully');

    // Verify booking is gone
    const getResponse = await request.get(`/api/bookings/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });

  test('should detect date conflicts for same zone', async ({ request }) => {
    // Create first booking
    const firstBooking = {
      zone_id: 'esb-north-facade',
      property_id: 'empire-state-building',
      advertiser_name: 'First Conflict Test',
      advertiser_email: 'first@example.com',
      campaign_name: 'First Conflict Campaign',
      start_date: '2024-08-01',
      end_date: '2024-08-31',
      total_amount: 250000
    };

    const firstResponse = await request.post('/api/bookings', {
      data: firstBooking,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(firstResponse.status()).toBe(201);

    // Try to create overlapping booking for same zone
    const conflictingBooking = {
      zone_id: 'esb-north-facade', // Same zone
      property_id: 'empire-state-building',
      advertiser_name: 'Second Conflict Test',
      advertiser_email: 'second@example.com',
      campaign_name: 'Conflicting Campaign',
      start_date: '2024-08-15', // Overlaps with first booking
      end_date: '2024-09-15',
      total_amount: 250000
    };

    const conflictResponse = await request.post('/api/bookings', {
      data: conflictingBooking,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(conflictResponse.status()).toBe(409);
    const result = await conflictResponse.json();
    expect(result.error).toContain('Zone is not available for the selected dates');
  });

  test('should handle API errors gracefully', async ({ request }) => {
    // Test with malformed JSON
    const malformedResponse = await request.post('/api/bookings', {
      data: 'invalid json string',
      headers: { 'Content-Type': 'application/json' }
    });

    // Should handle malformed requests
    expect([400, 500]).toContain(malformedResponse.status());

    // Test with invalid zone ID
    const invalidZoneBooking = {
      zone_id: 'non-existent-zone',
      property_id: 'empire-state-building',
      advertiser_name: 'Test',
      advertiser_email: 'test@example.com',
      campaign_name: 'Test Campaign',
      start_date: '2024-07-01',
      end_date: '2024-07-31',
      total_amount: 100000
    };

    const invalidZoneResponse = await request.post('/api/bookings', {
      data: invalidZoneBooking,
      headers: { 'Content-Type': 'application/json' }
    });

    // Should handle invalid references appropriately
    expect([400, 404, 500]).toContain(invalidZoneResponse.status());
  });
});
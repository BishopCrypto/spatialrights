const { test, expect } = require('@playwright/test');

test.describe('Booking Error Handling Tests', () => {

  test('should handle invalid zone IDs gracefully', async ({ page }) => {
    // Try to access booking page with invalid zone ID
    await page.goto('/book/invalid-zone-id');

    // Should show error message and not crash
    await expect(page.locator('h1', { hasText: 'Zone Not Found' })).toBeVisible();
    await expect(page.locator('text=The AR advertising zone you\'re looking for doesn\'t exist')).toBeVisible();

    // Should provide navigation back to properties
    const browseButton = page.locator('a', { hasText: 'Browse Properties' });
    await expect(browseButton).toBeVisible();
    await browseButton.click();
    await expect(page).toHaveURL('/properties');
  });

  test('should handle non-existent property IDs', async ({ page }) => {
    await page.goto('/properties/non-existent-property');

    // Should show 404 or appropriate error
    // Next.js might show its 404 page or redirect
    const is404 = await page.locator('text=404').isVisible();
    const isNotFound = await page.locator('text=not found').isVisible();

    expect(is404 || isNotFound).toBe(true);
  });

  test('should handle invalid booking confirmation IDs', async ({ page }) => {
    await page.goto('/booking-confirmation/invalid-booking-id');

    // Should show error message
    await expect(page.locator('h1', { hasText: 'Booking Not Found' })).toBeVisible();
    await expect(page.locator('text=The booking confirmation you\'re looking for doesn\'t exist')).toBeVisible();

    // Should provide navigation
    const browseButton = page.locator('a', { hasText: 'Browse Properties' });
    await expect(browseButton).toBeVisible();
  });

  test('should validate date ranges in booking form', async ({ page }) => {
    // Navigate to a booking page
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Fill form with valid data except dates
    await page.fill('input[placeholder="Acme Corp"]', 'Test Company');
    await page.fill('input[placeholder="John Smith"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@test.com');
    await page.fill('input[placeholder*="Campaign"]', 'Test Campaign');
    await page.fill('textarea', 'Test description');

    // Set past start date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await page.fill('input[type="date"]', yesterday.toISOString().split('T')[0]);

    // HTML5 validation should prevent form submission or show error
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should still be on booking page (form didn't submit)
    await expect(page).toHaveURL(/\/book\/[^\/]+/);

    // Set valid start date but invalid end date (before start)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const today = new Date();

    await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);

    // Try to set end date to today (before start date)
    const endDateInputs = page.locator('input[type="date"]');
    await endDateInputs.nth(1).fill(today.toISOString().split('T')[0]);

    await submitButton.click();

    // Should still be on booking page due to validation
    await expect(page).toHaveURL(/\/book\/[^\/]+/);
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Fill form with data that might cause server error
    await page.fill('input[placeholder="Acme Corp"]', 'Test Company');
    await page.fill('input[placeholder="John Smith"]', 'John Doe');
    await page.fill('input[type="email"]', 'invalid-email-format'); // Invalid email format
    await page.fill('input[placeholder*="Campaign"]', 'Error Test Campaign');
    await page.fill('textarea', 'Test description');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
    await page.fill('input[type="date"]', nextMonth.toISOString().split('T')[0]);

    const submitButton = page.locator('button[type="submit"]');

    // Listen for alerts/errors
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });

    await submitButton.click();

    // Should handle error appropriately
    // Might show alert, stay on page, or show error message
    await page.waitForTimeout(2000); // Give time for any error handling
  });

  test('should prevent double submission of booking form', async ({ page }) => {
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Fill valid form data
    await page.fill('input[placeholder="Acme Corp"]', 'Double Submit Test');
    await page.fill('input[placeholder="John Smith"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@doubletest.com');
    await page.fill('input[placeholder*="Campaign"]', 'Double Submit Campaign');
    await page.fill('textarea', 'Test description');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
    await page.fill('input[type="date"]', nextMonth.toISOString().split('T')[0]);

    const submitButton = page.locator('button[type="submit"]');

    // Submit form
    await submitButton.click();

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled();

    // Wait for potential navigation or completion
    await page.waitForTimeout(3000);
  });

  test('should handle network errors during booking', async ({ page, context }) => {
    // Navigate to booking page
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Fill valid form data
    await page.fill('input[placeholder="Acme Corp"]', 'Network Error Test');
    await page.fill('input[placeholder="John Smith"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@networktest.com');
    await page.fill('input[placeholder*="Campaign"]', 'Network Error Campaign');
    await page.fill('textarea', 'Test description');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
    await page.fill('input[type="date"]', nextMonth.toISOString().split('T')[0]);

    // Intercept and fail the booking API request
    await page.route('/api/bookings', route => {
      route.abort('failed');
    });

    const submitButton = page.locator('button[type="submit"]');

    // Listen for error alerts
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('error');
      await dialog.accept();
    });

    await submitButton.click();

    // Should handle network error gracefully
    await page.waitForTimeout(2000);

    // Should still be on booking page after error
    await expect(page).toHaveURL(/\/book\/[^\/]+/);
  });

  test('should validate email format in booking form', async ({ page }) => {
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Test various invalid email formats
    const invalidEmails = [
      'invalid',
      'invalid@',
      '@invalid.com',
      'invalid.email',
      'invalid@.com',
      'invalid@domain.',
    ];

    for (const invalidEmail of invalidEmails) {
      await page.fill('input[type="email"]', invalidEmail);

      // Try to submit or move to next field
      await page.press('input[type="email"]', 'Tab');

      // Browser should show validation message or prevent submission
      const emailInput = page.locator('input[type="email"]');
      const isValid = await emailInput.evaluate(el => el.validity.valid);
      expect(isValid).toBe(false);
    }

    // Test valid email
    await page.fill('input[type="email"]', 'valid@example.com');
    const emailInput = page.locator('input[type="email"]');
    const isValid = await emailInput.evaluate(el => el.validity.valid);
    expect(isValid).toBe(true);
  });

  test('should handle booking confirmation loading states', async ({ page }) => {
    // Create a booking first (simplified)
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Fill minimal valid data
    await page.fill('input[placeholder="Acme Corp"]', 'Loading Test Company');
    await page.fill('input[placeholder="John Smith"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@loadingtest.com');
    await page.fill('input[placeholder*="Campaign"]', 'Loading Test Campaign');
    await page.fill('textarea', 'Test description');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
    await page.fill('input[type="date"]', nextMonth.toISOString().split('T')[0]);

    // Intercept booking API to delay response
    await page.route('/api/bookings', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      route.continue();
    });

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show loading state
    await expect(page.locator('text=Processing')).toBeVisible();

    // Wait for completion
    await page.waitForTimeout(3000);
  });

  test('should handle empty or missing zone data gracefully', async ({ page }) => {
    // Test direct navigation to booking page with zone that has missing data
    await page.goto('/book/apple-window-display');

    // Should still load the page or show appropriate error
    const hasZoneNotFound = await page.locator('text=Zone Not Found').isVisible();
    const hasBookingForm = await page.locator('h1', { hasText: 'Book AR Advertising Zone' }).isVisible();

    // Either show error page or booking form
    expect(hasZoneNotFound || hasBookingForm).toBe(true);

    if (hasBookingForm) {
      // Verify booking summary still works with available data
      await expect(page.locator('h3', { hasText: 'Booking Summary' })).toBeVisible();
    }
  });
});
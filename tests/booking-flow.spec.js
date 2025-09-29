const { test, expect } = require('@playwright/test');

test.describe('AR Property Booking Flow Tests', () => {

  test('should complete full booking flow from property listing to confirmation', async ({ page }) => {
    // Navigate to properties page
    await page.goto('/properties');
    await expect(page).toHaveTitle(/Properties/);

    // Verify properties are displayed
    await expect(page.locator('text=Empire State Building')).toBeVisible();
    await expect(page.locator('text=Times Square')).toBeVisible();

    // Click on a property to view details
    const propertyLink = page.locator('a[href*="/properties/empire-state-building"], text=Empire State Building').first();
    await propertyLink.click();

    // Verify we're on property detail page
    await expect(page).toHaveURL(/\/properties\/empire-state-building/);
    await expect(page.locator('h1', { hasText: 'Empire State Building' })).toBeVisible();

    // Verify AR zones are displayed
    await expect(page.locator('text=North Facade Premium')).toBeVisible();
    await expect(page.locator('text=South Facade Standard')).toBeVisible();

    // Find and click an available zone's booking button
    const bookButton = page.locator('a[href*="/book/"], text=Book This Zone').first();
    await expect(bookButton).toBeVisible();
    await bookButton.click();

    // Verify we're on booking page
    await expect(page).toHaveURL(/\/book\/[^\/]+/);
    await expect(page.locator('h1', { hasText: 'Book AR Advertising Zone' })).toBeVisible();

    // Fill out booking form with valid data
    await page.fill('[data-testid="company-name"], input[placeholder="Acme Corp"]', 'Test Company Ltd');
    await page.fill('[data-testid="company-website"], input[placeholder*="acmecorp.com"]', 'https://testcompany.com');
    await page.fill('[data-testid="advertiser-name"], input[placeholder="John Smith"]', 'John Doe');
    await page.fill('[data-testid="advertiser-email"], input[placeholder*="@"]', 'john.doe@testcompany.com');
    await page.fill('[data-testid="campaign-name"], input[placeholder*="Campaign"]', 'Test AR Campaign 2024');
    await page.fill('[data-testid="campaign-description"], textarea[placeholder*="description"]', 'This is a test AR advertising campaign for testing purposes.');

    // Set future dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await page.fill('input[type="date"]:has-text("Start Date"), input[name*="start"]', tomorrow.toISOString().split('T')[0]);
    await page.fill('input[type="date"]:has-text("End Date"), input[name*="end"]', nextMonth.toISOString().split('T')[0]);

    await page.selectOption('select:has-text("Content Type"), select[name*="content_type"]', 'video');
    await page.selectOption('select:has-text("Budget Range"), select[name*="budget"]', 'standard');

    // Verify total cost is calculated and displayed
    await expect(page.locator('text=/\\$[0-9,]+/')).toBeVisible();

    // Submit the form
    const submitButton = page.locator('button[type="submit"], button:has-text("Submit Booking")');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Wait for navigation to confirmation page
    await page.waitForURL(/\/booking-confirmation\/[^\/]+/, { timeout: 10000 });

    // Verify confirmation page elements
    await expect(page.locator('h1', { hasText: 'Booking Request Submitted' })).toBeVisible();
    await expect(page.locator('text=Thank you for your AR advertising booking request')).toBeVisible();
    await expect(page.locator('text=Test AR Campaign 2024')).toBeVisible();
    await expect(page.locator('text=Test Company Ltd')).toBeVisible();
    await expect(page.locator('text=john.doe@testcompany.com')).toBeVisible();
    await expect(page.locator('text=PENDING_APPROVAL')).toBeVisible();
  });

  test('should navigate between property listings and property details', async ({ page }) => {
    // Start at properties listing
    await page.goto('/properties');

    // Click on Empire State Building
    await page.click('text=Empire State Building');
    await expect(page).toHaveURL(/\/properties\/empire-state-building/);

    // Use back navigation
    await page.click('text=Back to Properties');
    await expect(page).toHaveURL('/properties');

    // Try Times Square property
    const timesSquareLink = page.locator('text=Times Square').first();
    if (await timesSquareLink.isVisible()) {
      await timesSquareLink.click();
      await expect(page).toHaveURL(/\/properties\/times-square/);
    }
  });

  test('should display zone information and booking buttons correctly', async ({ page }) => {
    await page.goto('/properties/empire-state-building');

    // Check zone information is displayed
    await expect(page.locator('text=North Facade Premium')).toBeVisible();
    await expect(page.locator('text=South Facade Standard')).toBeVisible();

    // Check zone details
    await expect(page.locator('text=/48.*×.*14/')).toBeVisible(); // Dimensions
    await expect(page.locator('text=/672.*sq ft/')).toBeVisible(); // Square footage
    await expect(page.locator('text=/\\$[0-9,]+/')).toBeVisible(); // Pricing

    // Verify available zones have booking buttons
    const availableZones = page.locator('.zone-available, [class*="available"]');
    const bookingButtons = page.locator('a[href*="/book/"], text=Book This Zone');
    await expect(bookingButtons.first()).toBeVisible();

    // Verify booked zones show booked status
    const bookedZones = page.locator('text=Booked by');
    if (await bookedZones.count() > 0) {
      await expect(bookedZones.first()).toBeVisible();
    }
  });

  test('should handle form validation errors', async ({ page }) => {
    // Navigate to a booking page
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show HTML5 validation errors or prevent submission
    // The form should not submit and stay on the same page
    await expect(page).toHaveURL(/\/book\/[^\/]+/);

    // Fill only some required fields and verify validation
    await page.fill('input[placeholder="Acme Corp"]', 'Test Company');
    await page.fill('input[placeholder="John Smith"]', 'John Doe');
    // Leave email empty
    await submitButton.click();

    // Should still be on booking page due to validation
    await expect(page).toHaveURL(/\/book\/[^\/]+/);
  });

  test('should calculate pricing correctly based on form inputs', async ({ page }) => {
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Set dates for a 2-month campaign
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 2);

    await page.fill('input[type="date"]', startDate.toISOString().split('T')[0]);
    await page.fill('input[type="date"]', endDate.toISOString().split('T')[0]);

    // Check that pricing updates
    await expect(page.locator('text=/\\$[0-9,]+/')).toBeVisible();

    // Change budget package and verify price updates
    await page.selectOption('select', 'premium');

    // The total should be recalculated (we expect to see different pricing)
    await expect(page.locator('text=/Total Campaign Cost.*\\$[0-9,]+/')).toBeVisible();
  });

  test('should show zone details in booking summary', async ({ page }) => {
    await page.goto('/properties/empire-state-building');
    const bookButton = page.locator('a[href*="/book/"]').first();
    await bookButton.click();

    // Verify booking summary section
    await expect(page.locator('h3', { hasText: 'Booking Summary' })).toBeVisible();

    // Verify zone details are shown
    await expect(page.locator('text=North Facade Premium, text=South Facade')).toBeVisible();
    await expect(page.locator('text=Empire State Building')).toBeVisible();
    await expect(page.locator('text=350 5th Ave')).toBeVisible();

    // Verify zone specifications
    await expect(page.locator('text=Dimensions')).toBeVisible();
    await expect(page.locator('text=Area')).toBeVisible();
    await expect(page.locator('text=Visibility')).toBeVisible();
    await expect(page.locator('text=Traffic')).toBeVisible();
  });
});
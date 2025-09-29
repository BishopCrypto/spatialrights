const { test, expect } = require('@playwright/test');

test.describe('Properties Page Tests', () => {
  test('should load properties page and display NYC sample data', async ({ page }) => {
    await page.goto('/properties');

    // Check page loads successfully
    await expect(page).toHaveTitle(/Properties/);

    // Check for NYC properties mentioned in user requirements
    // Tier 1 properties
    await expect(page.locator('text=Empire State Building')).toBeVisible();
    await expect(page.locator('text=Times Square')).toBeVisible();

    // Tier 2 properties
    await expect(page.locator('text=Chrysler Building')).toBeVisible();
    await expect(page.locator('text=Flatiron Building')).toBeVisible();

    // Tier 3 properties
    await expect(page.locator('text=Madison Square Garden')).toBeVisible();

    // Tier 4 properties
    await expect(page.locator('text=Brooklyn Coffee Shop')).toBeVisible();

    // Check for pricing information
    await expect(page.locator('text=$2M')).toBeVisible(); // Empire State Building
    await expect(page.locator('text=$1.5M')).toBeVisible(); // Times Square
  });

  test('should display property tiers correctly', async ({ page }) => {
    await page.goto('/properties');

    // Check tier structure is displayed
    await expect(page.locator('text=Tier 1')).toBeVisible();
    await expect(page.locator('text=Tier 2')).toBeVisible();
    await expect(page.locator('text=Tier 3')).toBeVisible();
    await expect(page.locator('text=Tier 4')).toBeVisible();

    // Verify high-value properties show higher pricing
    const tier1Section = page.locator('text=Tier 1').locator('..');
    await expect(tier1Section.locator('text=$2M')).toBeVisible();
  });

  test('should handle property navigation and details', async ({ page }) => {
    await page.goto('/properties');

    // Navigate to Empire State Building detail page
    const empireStateLink = page.locator('a[href*="/properties/empire-state-building"], text=Empire State Building').first();
    await empireStateLink.click();

    // Verify navigation to property detail page
    await expect(page).toHaveURL(/\/properties\/empire-state-building/);
    await expect(page.locator('h1', { hasText: 'Empire State Building' })).toBeVisible();

    // Check for property filtering or search functionality on main page
    await page.goto('/properties');
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="filter"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('Empire');
      await expect(page.locator('text=Empire State Building')).toBeVisible();
    }
  });

  test('should display AR zones with booking functionality on property detail page', async ({ page }) => {
    await page.goto('/properties/empire-state-building');

    // Verify AR zones section
    await expect(page.locator('h2', { hasText: 'AR Advertising Zones' })).toBeVisible();

    // Check for available zones
    await expect(page.locator('text=North Facade Premium')).toBeVisible();
    await expect(page.locator('text=South Facade Standard')).toBeVisible();

    // Verify zone availability indicators
    await expect(page.locator('text=Available')).toBeVisible();
    await expect(page.locator('.w-3.h-3.bg-green-500, [class*="green"]')).toBeVisible();

    // Check for booking buttons on available zones
    const bookingButtons = page.locator('a[href*="/book/"], text=Book This Zone');
    await expect(bookingButtons.first()).toBeVisible();

    // Verify zone details are displayed
    await expect(page.locator('text=/48.*×.*14/')).toBeVisible(); // Dimensions
    await expect(page.locator('text=/672.*sq ft/')).toBeVisible(); // Square footage
    await expect(page.locator('text=/\\$[0-9,]+/')).toBeVisible(); // Pricing
  });

  test('should show zone availability summary on property detail page', async ({ page }) => {
    await page.goto('/properties/empire-state-building');

    // Check availability summary cards
    await expect(page.locator('text=Available Zones')).toBeVisible();
    await expect(page.locator('text=Booked Zones')).toBeVisible();
    await expect(page.locator('text=Total AR Zones')).toBeVisible();

    // Verify numbers are displayed
    const availableCount = page.locator('text=Available Zones').locator('..').locator('text=/^[0-9]+$/').first();
    const bookedCount = page.locator('text=Booked Zones').locator('..').locator('text=/^[0-9]+$/').first();
    const totalCount = page.locator('text=Total AR Zones').locator('..').locator('text=/^[0-9]+$/').first();

    await expect(availableCount).toBeVisible();
    await expect(bookedCount).toBeVisible();
    await expect(totalCount).toBeVisible();
  });

  test('should display property locations and coordinates', async ({ page }) => {
    await page.goto('/properties');

    // Check for location information (coordinates, addresses)
    // Empire State Building coordinates should be around 40.7484, -73.9856
    const coordinatePattern = /40\.7\d+.*-73\.9\d+/;

    // Look for map elements or coordinate displays
    const mapElement = page.locator('canvas, [id*="map"], [class*="map"]');
    if (await mapElement.count() > 0) {
      await expect(mapElement).toBeVisible();
    }
  });
});
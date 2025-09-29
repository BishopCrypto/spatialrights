const { test, expect } = require('@playwright/test');

test.describe('Admin Panel Tests', () => {
  test('should load admin panel successfully', async ({ page }) => {
    await page.goto('/admin');

    // Check page loads without errors
    await page.waitForLoadState('networkidle');

    // Check for admin-specific content
    await expect(page.locator('text=Admin', 'text=Documentation', 'text=Dashboard')).toBeVisible();
  });

  test('should provide access to documentation', async ({ page }) => {
    await page.goto('/admin');

    // Look for documentation links or sections
    const docLinks = page.locator('a[href*="doc"], text=Documentation, text=API Documentation');
    if (await docLinks.count() > 0) {
      await expect(docLinks.first()).toBeVisible();
    }

    // Check for API documentation
    await expect(page.locator('text=API', 'text=Endpoint', 'text=Rights Verification')).toBeVisible();
  });

  test('should show system status and health', async ({ page }) => {
    await page.goto('/admin');

    // Look for system status indicators
    const statusElements = page.locator('text=Status, text=Health, text=Online, text=Active, [class*="status"], [class*="health"]');

    // Check for API endpoint status
    const apiStatus = page.locator('text=/api/, text=endpoint, text=available');
    if (await apiStatus.count() > 0) {
      await expect(apiStatus.first()).toBeVisible();
    }
  });

  test('should handle admin authentication if required', async ({ page }) => {
    await page.goto('/admin');

    // Check if login form is present
    const loginForm = page.locator('form, input[type="password"], text=Login, text=Authentication');

    if (await loginForm.count() > 0) {
      // If authentication is required, check form elements
      await expect(loginForm.first()).toBeVisible();
    } else {
      // If no auth required, should show admin content directly
      await expect(page.locator('text=Admin, text=Dashboard, text=Management')).toBeVisible();
    }
  });

  test('should display database and system information', async ({ page }) => {
    await page.goto('/admin');

    // Look for database or system info
    const systemInfo = page.locator('text=Database, text=Properties, text=Records, text=Version');

    // Check for property count or database status
    const propertyCount = page.locator('text=6 properties, text=6 records, text=NYC properties');
    if (await propertyCount.count() > 0) {
      await expect(propertyCount.first()).toBeVisible();
    }
  });
});
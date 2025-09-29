const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/SpatialRights - AR Property Rights Platform/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('SpatialRights');

    // Check hero image is present
    await expect(page.locator('img[alt="AR Property Rights Visualization"]')).toBeVisible();

    // Check key features are displayed
    await expect(page.locator('text=Exclusive AR Rights')).toBeVisible();
    await expect(page.locator('text=Protection & Control')).toBeVisible();
    await expect(page.locator('text=Premium Revenue')).toBeVisible();

    // Check main value proposition
    await expect(page.locator('text=The world\'s first AR property rights platform')).toBeVisible();
    await expect(page.locator('text=Turn your building into a revenue-generating AR billboard')).toBeVisible();

    // Check revenue messaging
    await expect(page.locator('text=Earn up to $50K+ annually')).toBeVisible();
    await expect(page.locator('text=$100+ billion')).toBeVisible();

    // Check Coming Soon button
    await expect(page.locator('button:has-text("Coming Soon")')).toBeVisible();
  });

  test('should have proper meta tags and SEO', async ({ page }) => {
    await page.goto('/');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('AR property rights platform');

    // Check OpenGraph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('SpatialRights - AR Property Rights Platform');

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('ar-real-estate.png');
  });

  test('should have responsive design elements', async ({ page }) => {
    await page.goto('/');

    // Check that key elements are visible on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img[alt="AR Property Rights Visualization"]')).toBeVisible();

    // Check that grid layout adapts
    const featureCards = page.locator('.glass-effect');
    await expect(featureCards).toHaveCount(3);
  });
});
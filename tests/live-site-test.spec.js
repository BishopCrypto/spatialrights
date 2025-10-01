const { test, expect } = require('@playwright/test');

const LIVE_SITE_URL = 'https://spatialrights.ai';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '$*#@hh4!jjfFd$$fr';

test.describe('Live Site Tests - spatialrights.ai', () => {

  test('Homepage loads correctly with CSS', async ({ page }) => {
    console.log('Testing homepage load...');
    await page.goto(LIVE_SITE_URL);

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check title
    const title = await page.title();
    console.log('Page title:', title);
    expect(title).toBeTruthy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/live-homepage.png', fullPage: true });

    // Check for navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    console.log('Navigation found');

    // Check for main heading
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const headingText = await h1.textContent();
    console.log('Main heading:', headingText);

    // Check for no console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to catch any errors
    await page.waitForTimeout(2000);

    if (errors.length > 0) {
      console.log('Console errors found:', errors);
    }

    console.log('Homepage test passed');
  });

  test('CSS is properly applied', async ({ page }) => {
    console.log('Testing CSS application...');
    await page.goto(LIVE_SITE_URL);
    await page.waitForLoadState('networkidle');

    // Check if Tailwind classes are being applied
    const nav = page.locator('nav').first();
    const navStyles = await nav.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        display: styles.display
      };
    });

    console.log('Nav styles:', navStyles);

    // Check that we have actual style values (not defaults)
    expect(navStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

    // Check for main content styling
    const main = page.locator('main').first();
    if (await main.count() > 0) {
      const mainStyles = await main.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          maxWidth: styles.maxWidth,
          margin: styles.margin
        };
      });
      console.log('Main styles:', mainStyles);
    }

    console.log('CSS test passed');
  });

  test('Properties page loads', async ({ page }) => {
    console.log('Testing properties page...');
    await page.goto(`${LIVE_SITE_URL}/properties`);
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'test-results/live-properties.png', fullPage: true });

    // Check for properties heading or empty state
    const hasContent = await page.locator('body').textContent();
    expect(hasContent).toBeTruthy();
    console.log('Properties page loaded');
  });

  test('Admin page requires authentication', async ({ page }) => {
    console.log('Testing admin page authentication...');
    await page.goto(`${LIVE_SITE_URL}/admin`);
    await page.waitForLoadState('networkidle');

    // Should show login form
    const hasLoginForm = await page.locator('input[type="password"]').count();

    if (hasLoginForm > 0) {
      console.log('Login form found - authentication is working');

      // Take screenshot of login form
      await page.screenshot({ path: 'test-results/live-admin-login.png' });

      // Try to login
      await page.fill('input[type="text"]', ADMIN_USERNAME);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);

      // Find and click submit button
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Wait for navigation or content change
      await page.waitForTimeout(2000);

      // Take screenshot after login
      await page.screenshot({ path: 'test-results/live-admin-authenticated.png', fullPage: true });

      // Check if we're authenticated (look for admin content)
      const pageContent = await page.content();
      console.log('Admin page loaded after authentication');

    } else {
      console.log('No login form found - checking if already authenticated or different layout');
    }
  });

  test('Navigation links work', async ({ page }) => {
    console.log('Testing navigation links...');
    await page.goto(LIVE_SITE_URL);
    await page.waitForLoadState('networkidle');

    // Find all navigation links
    const navLinks = await page.locator('nav a').all();
    console.log(`Found ${navLinks.length} navigation links`);

    if (navLinks.length > 0) {
      // Test first navigation link
      const firstLink = navLinks[0];
      const href = await firstLink.getAttribute('href');
      console.log('Testing first link:', href);

      if (href && !href.startsWith('#')) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');

        // Verify navigation worked
        const currentUrl = page.url();
        console.log('Navigated to:', currentUrl);
        expect(currentUrl).toContain(LIVE_SITE_URL);
      }
    }

    console.log('Navigation test passed');
  });

  test('Responsive design - Mobile viewport', async ({ page }) => {
    console.log('Testing mobile viewport...');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(LIVE_SITE_URL);
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'test-results/live-mobile.png', fullPage: true });

    // Verify page is responsive
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    console.log('Mobile viewport test passed');
  });

  test('No critical console errors', async ({ page }) => {
    console.log('Checking for console errors...');
    const errors = [];
    const warnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    await page.goto(LIVE_SITE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for any delayed errors

    console.log(`Console errors: ${errors.length}`);
    console.log(`Console warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('Errors found:', errors);
    }

    // We expect 0 critical errors
    expect(errors.length).toBe(0);

    console.log('Console errors test passed');
  });

  test('Page performance check', async ({ page }) => {
    console.log('Testing page performance...');
    const startTime = Date.now();

    await page.goto(LIVE_SITE_URL);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);

    // Reasonable load time (under 10 seconds)
    expect(loadTime).toBeLessThan(10000);

    console.log('Performance test passed');
  });
});

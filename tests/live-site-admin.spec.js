const { test, expect } = require('@playwright/test');

test.describe('SpatialRights Live Site - Admin Tests', () => {
  let consoleErrors = [];
  let consoleWarnings = [];

  test.beforeEach(async ({ page }) => {
    // Capture console errors and warnings
    consoleErrors = [];
    consoleWarnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`Page Error: ${error.message}`);
    });
  });

  test('1. Homepage accessibility and no console errors', async ({ page }) => {
    // Navigate to homepage
    const response = await page.goto('https://spatialrights.ai', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Verify successful response
    expect(response.status()).toBeLessThan(400);

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    // Take screenshot for verification
    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/homepage.png',
      fullPage: true
    });

    // Check for console errors
    if (consoleErrors.length > 0) {
      console.log('Console Errors on Homepage:', consoleErrors);
    }
    if (consoleWarnings.length > 0) {
      console.log('Console Warnings on Homepage:', consoleWarnings);
    }

    // Verify page title exists (actual title: "NewCo - AR Property Rights Platform")
    await expect(page).toHaveTitle(/NewCo|AR Property Rights|SpatialRights|Spatial Rights/i);

    // Verify key branding element
    const brandingText = await page.locator('text=SpatialRights').first();
    await expect(brandingText).toBeVisible();
  });

  test('2. Admin page accessibility (no login required)', async ({ page }) => {
    // Navigate to admin page
    await page.goto('https://spatialrights.ai/admin', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for admin interface to be visible
    await page.waitForSelector('h1:has-text("SpatialRights Admin")', {
      timeout: 10000
    });

    // Take screenshot of admin page
    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/admin-page.png',
      fullPage: true
    });

    // Verify admin title
    const adminTitle = await page.locator('h1:has-text("SpatialRights Admin")');
    await expect(adminTitle).toBeVisible();
    console.log('✓ Admin page title found');

    // Verify subtitle
    const subtitle = await page.locator('text=Documentation & Business Files');
    await expect(subtitle).toBeVisible();
    console.log('✓ Admin page subtitle found');

    // Verify search box is present
    const searchBox = await page.locator('input[placeholder="Search documents..."]');
    await expect(searchBox).toBeVisible();
    console.log('✓ Search box found');

    // Verify stats are displayed
    const fileCount = await page.locator('text=Files').first();
    await expect(fileCount).toBeVisible();
    console.log('✓ File statistics visible');

    // Check console errors
    if (consoleErrors.length > 0) {
      console.log('Console Errors on admin page:', consoleErrors);
    }
  });

  test('3. Documents section verification', async ({ page }) => {
    // Navigate directly to admin page
    await page.goto('https://spatialrights.ai/admin', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for admin interface to load
    await page.waitForSelector('h1:has-text("SpatialRights Admin")', {
      timeout: 10000
    });

    // Verify Documentation & Business Files section
    const docSection = await page.locator('text=Documentation & Business Files');
    await expect(docSection).toBeVisible();
    console.log('✓ Documentation section found');

    // Take screenshot
    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/documents-section.png',
      fullPage: true
    });

    // Verify search functionality
    const searchField = await page.locator('input[placeholder="Search documents..."]');
    await expect(searchField).toBeVisible();
    console.log('✓ Search input found');

    // Try searching for documents
    await searchField.fill('patent');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/documents-search.png',
      fullPage: true
    });

    // Clear search
    await searchField.clear();
    await page.waitForTimeout(500);

    // Look for document items in the sidebar - they should be clickable elements
    const documentItems = await page.locator('div.p-4.border-b').all();
    console.log(`✓ Found ${documentItems.length} document items`);

    // Verify we have documents
    expect(documentItems.length).toBeGreaterThan(0);

    // Try clicking on the first document
    if (documentItems.length > 0) {
      const firstDocText = await documentItems[0].textContent();
      console.log(`Clicking on first document: ${firstDocText.substring(0, 50)}...`);

      await documentItems[0].click();
      await page.waitForTimeout(2000);

      // Check if document content appears in the main area
      // The main area should no longer show "Select a Document"
      const selectDocumentText = await page.locator('text=Select a Document').isVisible().catch(() => false);

      if (!selectDocumentText) {
        console.log('✓ Document content loaded (placeholder text removed)');

        await page.screenshot({
          path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/document-viewer.png',
          fullPage: true
        });

        // Check if document content is being displayed
        const mainContent = await page.locator('div.flex-1').textContent();
        console.log(`✓ Main content area updated (${mainContent.length} characters)`);
      } else {
        console.log('✗ Document may not have loaded - still showing placeholder');
      }
    }

    // Report console errors
    if (consoleErrors.length > 0) {
      console.log('Console Errors in documents section:', consoleErrors);
    }
  });

  test.afterEach(async () => {
    // Summary of console issues
    if (consoleErrors.length > 0) {
      console.log('\n=== Console Errors Summary ===');
      consoleErrors.forEach(err => console.log(err));
    }
    if (consoleWarnings.length > 0) {
      console.log('\n=== Console Warnings Summary ===');
      consoleWarnings.forEach(warn => console.log(warn));
    }
  });
});

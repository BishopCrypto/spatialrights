const { test, expect } = require('@playwright/test');

test.describe('SpatialRights Live Site - Comprehensive Admin Test', () => {
  let consoleErrors = [];
  let consoleWarnings = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    consoleWarnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page Error: ${error.message}`);
    });
  });

  test('Complete admin workflow test', async ({ page }) => {
    console.log('\n=== TEST 1: Homepage Accessibility ===');

    // Test homepage
    const homeResponse = await page.goto('https://spatialrights.ai', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    expect(homeResponse.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/NewCo|AR Property Rights|SpatialRights/i);

    const branding = await page.locator('text=SpatialRights').first();
    await expect(branding).toBeVisible();

    console.log('✓ Homepage loads successfully');
    console.log('✓ Branding visible');
    console.log(`✓ HTTP Status: ${homeResponse.status()}`);

    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/final-homepage.png',
      fullPage: true
    });

    console.log('\n=== TEST 2: Admin Page Access (No Authentication) ===');

    // Navigate to admin
    await page.goto('https://spatialrights.ai/admin', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('h1:has-text("SpatialRights Admin")', {
      timeout: 10000
    });

    console.log('✓ Admin page accessible without login');
    console.log('⚠ WARNING: Admin page has no authentication protection');

    const adminTitle = await page.locator('h1:has-text("SpatialRights Admin")');
    await expect(adminTitle).toBeVisible();

    const subtitle = await page.locator('text=Documentation & Business Files');
    await expect(subtitle).toBeVisible();

    console.log('✓ Admin interface loaded correctly');

    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/final-admin-page.png',
      fullPage: true
    });

    console.log('\n=== TEST 3: Document Management Interface ===');

    // Test search functionality
    const searchBox = await page.locator('input[placeholder="Search documents..."]');
    await expect(searchBox).toBeVisible();
    console.log('✓ Search box present');

    // Test stats display
    const fileCount = await page.locator('text=Files').first();
    await expect(fileCount).toBeVisible();
    console.log('✓ File statistics displayed');

    // Count documents
    const documentItems = await page.locator('div.p-4.border-b.hover\\:bg-gray-50').all();
    console.log(`✓ Found ${documentItems.length} documents in sidebar`);

    // Verify documents list is not empty
    expect(documentItems.length).toBeGreaterThan(0);

    console.log('\n=== TEST 4: Search Functionality ===');

    // Test search
    await searchBox.fill('patent');
    await page.waitForTimeout(1000);

    const filteredDocs = await page.locator('div.p-4.border-b.hover\\:bg-gray-50').all();
    console.log(`✓ Search filtered to ${filteredDocs.length} documents`);

    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/final-search.png',
      fullPage: true
    });

    expect(filteredDocs.length).toBeLessThanOrEqual(documentItems.length);
    expect(filteredDocs.length).toBeGreaterThan(0);

    // Clear search
    await searchBox.clear();
    await page.waitForTimeout(500);

    console.log('\n=== TEST 5: Document Viewer ===');

    // Click on first document
    const allDocs = await page.locator('div.p-4.border-b.hover\\:bg-gray-50').all();
    const firstDocTitle = await allDocs[0].locator('div.font-medium').textContent();

    console.log(`Testing document: "${firstDocTitle}"`);

    await allDocs[0].click();
    await page.waitForTimeout(2000);

    // Verify content loaded
    const placeholderGone = !(await page.locator('text=Select a Document').isVisible().catch(() => false));
    expect(placeholderGone).toBe(true);
    console.log('✓ Document content loaded (placeholder removed)');

    // Check for formatted content
    const contentArea = await page.locator('div.flex-1.overflow-y-auto').first();
    const contentText = await contentArea.textContent();

    console.log(`✓ Content length: ${contentText.length} characters`);
    expect(contentText.length).toBeGreaterThan(100);

    const formattedElements = await page.locator('h1, h2, h3, p, ul, ol').count();
    console.log(`✓ Formatted elements: ${formattedElements}`);
    expect(formattedElements).toBeGreaterThan(0);

    await page.screenshot({
      path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/final-document-viewer.png',
      fullPage: true
    });

    console.log('\n=== TEST 6: Multiple Document Selection ===');

    // Test clicking a different document
    if (allDocs.length > 1) {
      const secondDocTitle = await allDocs[1].locator('div.font-medium').textContent();
      console.log(`Switching to document: "${secondDocTitle}"`);

      await allDocs[1].click();
      await page.waitForTimeout(2000);

      // Verify document viewer is still active (not showing placeholder)
      const stillActive = !(await page.locator('text=Select a Document').isVisible().catch(() => false));
      expect(stillActive).toBe(true);
      console.log('✓ Document viewer remained active');
      console.log('✓ Document switching works correctly');

      await page.screenshot({
        path: '/Users/ryan/Documents/Claude Projects/spatialrights/tests/screenshots/final-second-document.png',
        fullPage: true
      });
    }

    console.log('\n=== TEST 7: Console Error Check ===');

    if (consoleErrors.length > 0) {
      console.log(`✗ Found ${consoleErrors.length} console errors:`);
      consoleErrors.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err}`);
      });
    } else {
      console.log('✓ No console errors detected');
    }

    if (consoleWarnings.length > 0) {
      console.log(`⚠ Found ${consoleWarnings.length} console warnings:`);
      consoleWarnings.forEach((warn, i) => {
        console.log(`  ${i + 1}. ${warn}`);
      });
    } else {
      console.log('✓ No console warnings detected');
    }

    console.log('\n=== SECURITY ASSESSMENT ===');
    console.log('⚠ CRITICAL: Admin page at /admin has NO AUTHENTICATION');
    console.log('⚠ All business documents are publicly accessible');
    console.log('⚠ RECOMMENDATION: Implement authentication before production deployment');

    console.log('\n=== OVERALL TEST RESULTS ===');
    console.log('✓ Homepage: PASS');
    console.log('✓ Admin Interface: PASS (but unprotected)');
    console.log('✓ Document Search: PASS');
    console.log('✓ Document Viewer: PASS');
    console.log('✓ Document Switching: PASS');
    console.log(`✓ Console Errors: ${consoleErrors.length === 0 ? 'PASS' : 'FAIL'}`);

    // Assertion for test pass/fail
    expect(consoleErrors.length).toBe(0);
  });
});

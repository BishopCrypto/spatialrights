const { test, expect } = require('@playwright/test');

test.describe('Admin Documents Interface Tests', () => {
  let consoleErrors = [];
  let consoleWarnings = [];

  test.beforeEach(async ({ page }) => {
    // Track console errors and warnings
    consoleErrors = [];
    consoleWarnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Clear session storage to ensure clean state
    await page.goto('/admin');
    await page.evaluate(() => sessionStorage.clear());

    // Reload page after clearing session
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('should successfully login with correct credentials', async ({ page }) => {
    // Wait for login form to be visible
    await expect(page.locator('h1:has-text("Admin Access")')).toBeVisible();

    // Fill in credentials
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');

    // Submit form
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard to load
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Verify authentication worked
    await expect(page.locator('text=AR Property Rights Management')).toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    // Try invalid credentials
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]:has-text("Login")');

    // Should show error
    await expect(page.locator('text=Invalid credentials')).toBeVisible();

    // Should not show dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).not.toBeVisible();
  });

  test('should display dashboard stats after login', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Check for stats cards
    await expect(page.locator('text=Total Properties')).toBeVisible();
    await expect(page.locator('text=AR Advertising Zones')).toBeVisible();
    await expect(page.locator('text=Active Bookings')).toBeVisible();
    await expect(page.locator('text=Total Revenue')).toBeVisible();
  });

  test('should load and display documents section', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Wait for documents section to load
    await expect(page.locator('h3:has-text("Documentation & Business Files")')).toBeVisible();

    // Wait a moment for API call to complete
    await page.waitForTimeout(2000);

    // Check for document count display
    const fileCountElement = page.locator('text=Files').first();
    await expect(fileCountElement).toBeVisible();

    // Get the actual count of documents displayed
    const documentCards = page.locator('[class*="border"][class*="rounded-lg"][class*="cursor-pointer"]');
    const count = await documentCards.count();

    console.log(`Found ${count} document cards`);

    // Should have documents (expecting 8 based on requirements)
    expect(count).toBeGreaterThan(0);
  });

  test('should have functional search bar for documents', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Wait for documents to load
    await page.waitForTimeout(2000);

    // Find search input
    const searchInput = page.locator('input[placeholder="Search documents..."]');
    await expect(searchInput).toBeVisible();

    // Get initial document count
    const initialCards = page.locator('[class*="border"][class*="rounded-lg"][class*="cursor-pointer"]');
    const initialCount = await initialCards.count();

    // Type a search query (generic term that should filter)
    await searchInput.fill('plan');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Check that filtering happened (count should change or stay same if all match)
    const filteredCards = page.locator('[class*="border"][class*="rounded-lg"][class*="cursor-pointer"]');
    const filteredCount = await filteredCards.count();

    console.log(`Initial: ${initialCount}, After search: ${filteredCount}`);

    // Search for something that shouldn't exist
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(500);

    // Should show "no documents" message
    await expect(page.locator('text=No documents found matching your search')).toBeVisible();
  });

  test('should open document viewer modal when clicking a document', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Wait for documents to load
    await page.waitForTimeout(2000);

    // Get first document card
    const documentCards = page.locator('[class*="border"][class*="rounded-lg"][class*="cursor-pointer"]');
    const firstCard = documentCards.first();

    // Verify at least one document exists
    await expect(firstCard).toBeVisible();

    // Click the first document
    await firstCard.click();

    // Wait for modal to appear
    await page.waitForTimeout(1000);

    // Check for modal (should have fixed positioning and overlay)
    const modal = page.locator('div.fixed.inset-0');
    await expect(modal).toBeVisible();

    // Modal should have document content area
    const contentArea = page.locator('pre.whitespace-pre-wrap');
    await expect(contentArea).toBeVisible();
  });

  test('should close document viewer modal when clicking close button', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Wait for documents to load
    await page.waitForTimeout(2000);

    // Click first document
    const documentCards = page.locator('[class*="border"][class*="rounded-lg"][class*="cursor-pointer"]');
    await documentCards.first().click();

    // Wait for modal
    await page.waitForTimeout(1000);

    // Verify modal is open
    const modal = page.locator('div.fixed.inset-0');
    await expect(modal).toBeVisible();

    // Find and click close button (X icon)
    const closeButton = page.locator('button:has(svg path[d*="M6 18L18 6M6 6l12 12"])');
    await closeButton.click();

    // Wait for modal to close
    await page.waitForTimeout(500);

    // Modal should be gone
    await expect(modal).not.toBeVisible();
  });

  test('should maintain session authentication', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Navigate away and back
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.goto('/admin');

    // Should still be authenticated (dashboard should show, not login form)
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('h1:has-text("Admin Access")')).not.toBeVisible();
  });

  test('should successfully logout', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Click logout
    await page.click('button:has-text("Logout")');

    // Should show login form again
    await expect(page.locator('h1:has-text("Admin Access")')).toBeVisible();
    await expect(page.locator('h1:has-text("Admin Dashboard")')).not.toBeVisible();
  });

  test('should display system status indicators', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });

    // Scroll to bottom where system status is
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check for system status section
    await expect(page.locator('h3:has-text("System Status")')).toBeVisible();
    await expect(page.locator('text=Database: Connected')).toBeVisible();
    await expect(page.locator('text=API: Operational')).toBeVisible();
  });

  test('should check for console errors during normal usage', async ({ page }) => {
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr');
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for dashboard and documents to load
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(3000);

    // Interact with documents
    const documentCards = page.locator('[class*="border"][class*="rounded-lg"][class*="cursor-pointer"]');
    const count = await documentCards.count();

    if (count > 0) {
      // Click a document
      await documentCards.first().click();
      await page.waitForTimeout(1000);

      // Close modal
      const closeButton = page.locator('button:has(svg path[d*="M6 18L18 6M6 6l12 12"])');
      await closeButton.click();
      await page.waitForTimeout(500);
    }

    // Filter out known harmless errors/warnings
    const significantErrors = consoleErrors.filter(error =>
      !error.includes('Download the React DevTools') &&
      !error.includes('favicon.ico') &&
      !error.includes('sourcemap')
    );

    // Log any errors found
    if (significantErrors.length > 0) {
      console.log('Console Errors Found:');
      significantErrors.forEach(error => console.log(' -', error));
    }

    // Report on console errors
    expect(significantErrors).toHaveLength(0);
  });

  test.afterEach(async () => {
    // Report console issues if any
    const significantErrors = consoleErrors.filter(error =>
      !error.includes('Download the React DevTools') &&
      !error.includes('favicon.ico') &&
      !error.includes('sourcemap')
    );

    if (significantErrors.length > 0) {
      console.log('\n=== Console Errors ===');
      significantErrors.forEach(error => console.log(error));
    }

    if (consoleWarnings.length > 0) {
      console.log('\n=== Console Warnings ===');
      consoleWarnings.forEach(warning => console.log(warning));
    }
  });
});

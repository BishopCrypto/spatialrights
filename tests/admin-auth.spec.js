const { test, expect } = require('@playwright/test')

test.describe('Admin Authentication', () => {
  test('should show login form when not authenticated', async ({ page }) => {
    await page.goto('http://localhost:3200/admin')

    // Should show login form
    await expect(page.locator('text=Admin Access')).toBeVisible()
    await expect(page.locator('input[type="text"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3200/admin')

    // Fill in wrong credentials
    await page.fill('input[type="text"]', 'admin')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Should show error
    await expect(page.locator('text=Invalid credentials')).toBeVisible()
  })

  test('should accept correct credentials and show dashboard', async ({ page }) => {
    await page.goto('http://localhost:3200/admin')

    // Fill in correct credentials
    await page.fill('input[type="text"]', 'admin')
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr')
    await page.click('button[type="submit"]')

    // Wait for dashboard to load
    await page.waitForSelector('text=Admin Dashboard')

    // Should show dashboard elements
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    await expect(page.locator('text=Documentation & Business Files')).toBeVisible()
  })

  test('should persist authentication via cookie', async ({ page }) => {
    // First login
    await page.goto('http://localhost:3200/admin')
    await page.fill('input[type="text"]', 'admin')
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr')
    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Admin Dashboard')

    // Navigate away and back
    await page.goto('http://localhost:3200')
    await page.goto('http://localhost:3200/admin')

    // Should still be authenticated (no login form)
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    await expect(page.locator('text=Admin Access')).not.toBeVisible()
  })

  test('should logout and require re-authentication', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3200/admin')
    await page.fill('input[type="text"]', 'admin')
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr')
    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Admin Dashboard')

    // Click logout
    await page.click('button:has-text("Logout")')

    // Should show login form again
    await expect(page.locator('text=Admin Access')).toBeVisible()
    await expect(page.locator('text=Admin Dashboard')).not.toBeVisible()
  })

  test('should protect documents API without authentication', async ({ page, request }) => {
    // Try to access documents API without auth cookie
    const response = await request.get('http://localhost:3200/api/documents')

    // Should return 401 Unauthorized
    expect(response.status()).toBe(401)
  })

  test('should allow documents API with authentication', async ({ page, request }) => {
    // Login to set auth cookie
    await page.goto('http://localhost:3200/admin')
    await page.fill('input[type="text"]', 'admin')
    await page.fill('input[type="password"]', '$*#@hh4!jjfFd$$fr')
    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Admin Dashboard')

    // Get cookies from the page context
    const cookies = await page.context().cookies()

    // Try to access documents API with auth cookie
    const response = await request.get('http://localhost:3200/api/documents', {
      headers: {
        Cookie: cookies.map(c => `${c.name}=${c.value}`).join('; ')
      }
    })

    // Should return 200 OK
    expect(response.status()).toBe(200)

    // Should return documents
    const data = await response.json()
    expect(data.documents).toBeDefined()
    expect(data.documents.length).toBeGreaterThan(0)
  })
})

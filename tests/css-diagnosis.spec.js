const { test, expect } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

test.describe('CSS Diagnosis', () => {
  test('should have working CSS and Tailwind classes', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3200')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Take a full page screenshot for visual inspection
    const screenshotPath = path.join(__dirname, 'screenshots', 'homepage-css-check.png')
    await page.screenshot({ path: screenshotPath, fullPage: true })
    console.log(`Screenshot saved to: ${screenshotPath}`)

    // Check for console errors
    const consoleErrors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // Check if hero section exists and has proper styling
    const heroSection = page.locator('text=Digital Property Rights for the AR Era')
    await expect(heroSection).toBeVisible()

    // Check if Tailwind classes are being applied by inspecting computed styles
    const hero = page.locator('.min-h-screen').first()
    const heroStyles = await hero.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return {
        minHeight: styles.minHeight,
        display: styles.display,
        backgroundColor: styles.backgroundColor
      }
    })

    console.log('Hero section computed styles:', heroStyles)

    // Verify Tailwind is working by checking if min-h-screen class applied proper height
    expect(heroStyles.minHeight).not.toBe('0px')
    expect(heroStyles.minHeight).not.toBe('auto')

    // Check if buttons have proper styling
    const primaryButton = page.locator('a:has-text("Browse Properties")')
    const buttonStyles = await primaryButton.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        padding: styles.padding,
        borderRadius: styles.borderRadius
      }
    })

    console.log('Primary button computed styles:', buttonStyles)

    // Verify button has styling (not default browser styles)
    expect(buttonStyles.padding).not.toBe('0px')
    expect(buttonStyles.borderRadius).not.toBe('0px')

    // Check if fonts are loading
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily
    })

    console.log('Body font-family:', bodyFont)
    expect(bodyFont).toContain('Inter')

    // Check for any CSS loading errors in network
    const failedCSSRequests = []
    page.on('response', response => {
      if (response.url().includes('.css') && !response.ok()) {
        failedCSSRequests.push(response.url())
      }
    })

    // Wait a bit to capture any late-loading resources
    await page.waitForTimeout(2000)

    // Report findings
    console.log('\n=== CSS Diagnosis Report ===')
    console.log('Console Errors:', consoleErrors.length === 0 ? 'None' : consoleErrors)
    console.log('Failed CSS Requests:', failedCSSRequests.length === 0 ? 'None' : failedCSSRequests)
    console.log('Tailwind Classes:', heroStyles.minHeight !== '0px' ? 'Working ✓' : 'Not Working ✗')
    console.log('Custom Fonts:', bodyFont.includes('Inter') ? 'Loading ✓' : 'Not Loading ✗')
    console.log('Button Styling:', buttonStyles.borderRadius !== '0px' ? 'Applied ✓' : 'Not Applied ✗')
    console.log('===========================\n')

    // Final assertions
    expect(consoleErrors.length).toBe(0)
    expect(failedCSSRequests.length).toBe(0)
  })

  test('should have responsive design working', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3200')
    await page.waitForLoadState('networkidle')

    const mobileScreenshot = path.join(__dirname, 'screenshots', 'homepage-mobile.png')
    await page.screenshot({ path: mobileScreenshot, fullPage: true })
    console.log(`Mobile screenshot saved to: ${mobileScreenshot}`)

    // Check if navigation is responsive
    const nav = page.locator('nav').first()
    const navDisplay = await nav.evaluate(el => {
      return window.getComputedStyle(el).display
    })

    expect(navDisplay).not.toBe('none')

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('http://localhost:3200')
    await page.waitForLoadState('networkidle')

    const tabletScreenshot = path.join(__dirname, 'screenshots', 'homepage-tablet.png')
    await page.screenshot({ path: tabletScreenshot, fullPage: true })
    console.log(`Tablet screenshot saved to: ${tabletScreenshot}`)

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3200')
    await page.waitForLoadState('networkidle')

    const desktopScreenshot = path.join(__dirname, 'screenshots', 'homepage-desktop.png')
    await page.screenshot({ path: desktopScreenshot, fullPage: true })
    console.log(`Desktop screenshot saved to: ${desktopScreenshot}`)
  })

  test('should have all key elements styled correctly', async ({ page }) => {
    await page.goto('http://localhost:3200')
    await page.waitForLoadState('networkidle')

    // Check header styling
    const header = page.locator('header').first()
    if (await header.count() > 0) {
      const headerStyles = await header.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          position: styles.position,
          backgroundColor: styles.backgroundColor,
          boxShadow: styles.boxShadow
        }
      })
      console.log('Header styles:', headerStyles)
    }

    // Check card styling
    const card = page.locator('.bg-white').first()
    if (await card.count() > 0) {
      const cardStyles = await card.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow,
          padding: styles.padding
        }
      })
      console.log('Card styles:', cardStyles)

      // Verify card has white background
      expect(cardStyles.backgroundColor).toBe('rgb(255, 255, 255)')
    }

    // Check text styling
    const heading = page.locator('h1').first()
    const headingStyles = await heading.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color
      }
    })
    console.log('H1 heading styles:', headingStyles)

    // Verify heading has proper size
    const fontSize = parseInt(headingStyles.fontSize)
    expect(fontSize).toBeGreaterThan(20) // Should be larger than body text
  })
})

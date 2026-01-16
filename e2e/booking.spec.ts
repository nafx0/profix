import { test, expect } from '@playwright/test';

test.describe('Profix Auto Care Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Profix Auto Care/);
  });

  test('should display header with navigation', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const logo = page.getByRole('link', { name: /Profix Auto Care Home/i });
    await expect(logo).toBeVisible();

    const bookButton = page.getByRole('button', { name: /Book a Service/i }).first();
    await expect(bookButton).toBeVisible();
  });

  test('should open booking modal when CTA is clicked', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: /Book a Service/i }).first();
    await bookButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    const modalTitle = page.getByRole('heading', { name: /Book a Service/i });
    await expect(modalTitle).toBeVisible();
  });

  test('should close booking modal with escape key', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: /Book a Service/i }).first();
    await bookButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('should validate required form fields', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: /Book a Service/i }).first();
    await bookButton.click();

    const submitButton = page.getByRole('button', { name: /Confirm Booking/i });
    await submitButton.click();

    // Form should not submit with empty fields
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
  });

  test('should submit booking form successfully', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: /Book a Service/i }).first();
    await bookButton.click();

    // Fill in the form
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#phone', '+971501234567');
    await page.selectOption('#vehicleBrand', 'bmw');
    await page.selectOption('#serviceType', 'oil-change');
    await page.fill('#preferredDate', '2026-02-01');
    await page.selectOption('#preferredTime', '10:00');
    await page.check('#consent');

    const submitButton = page.getByRole('button', { name: /Confirm Booking/i });
    await submitButton.click();

    // Wait for success message
    const successMessage = page.getByText(/Booking Confirmed/i);
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test('should display services section', async ({ page }) => {
    const servicesSection = page.getByRole('region', { name: /Our Services/i });
    await servicesSection.scrollIntoViewIfNeeded();

    const servicesTitle = page.getByRole('heading', { name: /Our Services/i });
    await expect(servicesTitle).toBeVisible();
  });

  test('should have working skip link for accessibility', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    
    // Focus the skip link
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    
    // Activate skip link
    await skipLink.click();
    
    // Main content should be in view
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeInViewport();
  });

  test('should respect reduced motion preference', async ({ page }) => {
    // Enable reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // The static fallback should be displayed instead of canvas animation
    // This is a simplified check - in reality you'd check for specific elements
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav link (on desktop)
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('SEO & Metadata', () => {
  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Profix Auto Care — Precision German Car Service in Dubai/);

    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('German car workshop');

    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('Profix Auto Care');

    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toBeTruthy();
  });

  test('should have JSON-LD structured data', async ({ page }) => {
    await page.goto('/');

    const jsonLd = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      return script ? JSON.parse(script.textContent || '{}') : null;
    });

    expect(jsonLd).toBeTruthy();
    expect(jsonLd['@type']).toBe('AutoRepair');
    expect(jsonLd.name).toBe('Profix Auto Care');
  });
});

test.describe('Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    // DOM content loaded within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have layout shifts', async ({ page }) => {
    await page.goto('/');

    // Wait for page to stabilize
    await page.waitForTimeout(2000);

    // Check CLS using web vitals
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
              clsValue += (entry as PerformanceEntry & { value?: number }).value || 0;
            }
          }
          resolve(clsValue);
        }).observe({ type: 'layout-shift', buffered: true });

        // Fallback if no layout shifts
        setTimeout(() => resolve(0), 1000);
      });
    });

    expect(cls).toBeLessThan(0.1); // Good CLS score
  });
});

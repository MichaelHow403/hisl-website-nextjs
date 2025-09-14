import { test, expect } from '@playwright/test';

test.describe('HISL Website Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads
    await expect(page).toHaveTitle(/HISL/);
    
    // Check for key elements
    await expect(page.locator('h1')).toBeVisible();
  });

  test('globe page loads and is interactive', async ({ page }) => {
    await page.goto('/globe');
    
    // Check page title
    await expect(page).toHaveTitle(/Globe|Where Your Prompts Go/);
    
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Where Your Prompts Go');
    
    // Check for prompt form
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('textarea[placeholder*="prompt"]')).toBeVisible();
    
    // Test form interaction
    await page.fill('textarea[placeholder*="prompt"]', 'Test prompt for E2E');
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('globe simulation works', async ({ page }) => {
    await page.goto('/globe');
    
    // Fill out the form
    await page.fill('textarea[placeholder*="prompt"]', 'Hello, this is a test prompt');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for response (should be quick in mock mode)
    await expect(page.locator('text=Processing...')).toBeVisible();
    
    // Wait for results to appear
    await expect(page.locator('text=Simulation Results')).toBeVisible({ timeout: 10000 });
    
    // Check that results contain expected data
    await expect(page.locator('text=Hops')).toBeVisible();
    await expect(page.locator('text=Latency')).toBeVisible();
    await expect(page.locator('text=Energy')).toBeVisible();
  });

  test('health check endpoint works', async ({ page }) => {
    const response = await page.request.get('/api/health');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.time).toBeDefined();
    expect(data.version).toBe('1.0.0');
  });

  test('LLM gateway endpoint works', async ({ page }) => {
    const response = await page.request.post('/api/deepseek', {
      data: {
        agentId: 'claude-3-5-sonnet',
        prompt: 'Hello, this is a test',
        context: 'Testing context'
      }
    });
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.response).toBeDefined();
    expect(data.metadata).toBeDefined();
    expect(data.metadata.agentId).toBe('claude-3-5-sonnet');
  });

  test('about pages load correctly', async ({ page }) => {
    // Test Michael's bio page
    await page.goto('/about/michael');
    await expect(page.locator('h1')).toContainText('Michael Howard');
    
    // Test IntegAI page
    await page.goto('/about/integai');
    await expect(page.locator('h1')).toContainText('IntegAI');
  });

  test('poem page loads correctly', async ({ page }) => {
    await page.goto('/poem');
    await expect(page.locator('h1')).toContainText('Digital Constellation');
    
    // Check for poem content
    await expect(page.locator('text=silicon dreams')).toBeVisible();
  });

  test('navigation works between pages', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to globe
    await page.click('a[href="/globe"]');
    await expect(page).toHaveURL('/globe');
    
    // Navigate to about
    await page.click('a[href*="/about"]');
    await expect(page.url()).toContain('/about');
    
    // Navigate to poem
    await page.goto('/poem');
    await expect(page).toHaveURL('/poem');
  });

  test('responsive design works', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/globe');
    
    // Check that mobile layout is applied
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    
    // Check that desktop layout works
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });

  test('accessibility basics', async ({ page }) => {
    await page.goto('/globe');
    
    // Check for proper heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    
    // Check for form labels
    const textareas = await page.locator('textarea').count();
    if (textareas > 0) {
      await expect(page.locator('label')).toHaveCount(textareas);
    }
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });
});

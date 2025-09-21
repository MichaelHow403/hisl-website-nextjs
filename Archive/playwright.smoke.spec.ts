import { test, expect } from '@playwright/test'

test('visuals smoke page renders images and cards', async ({ page }) => {
  await page.goto('/smoke/visuals')
  const imgs = page.locator('img')
  await expect(imgs).not.toHaveCount(0)
  const cards = page.locator('div.rounded-xl')
  await expect(cards).not.toHaveCount(0)
})

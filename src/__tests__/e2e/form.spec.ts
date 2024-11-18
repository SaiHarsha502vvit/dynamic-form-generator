// src/__tests__/e2e/form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Form Submission Flow', () => {
  test('should submit the form successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Fill out the form
    await page.fill('input[id="name"]', 'John Doe');
    await page.fill('input[id="email"]', 'john.doe@example.com');
    await page.selectOption('select[id="companySize"]', '51-200');
    await page.check('input[value="tech"]');
    await page.selectOption('select[id="timeline"]', 'short');
    await page.fill('textarea[id="comments"]', 'Looking forward to collaborating.');

    // Intercept alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Form submitted successfully!');
      await dialog.dismiss();
    });

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Verify submitted data is displayed
    await expect(page.locator('pre')).toContainText('"name": "John Doe"');
    await expect(page.locator('pre')).toContainText('"email": "john.doe@example.com"');
  });
});
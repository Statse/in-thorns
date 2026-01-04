import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

async function reviewSite() {
  // Create review directory
  await mkdir('claude-review', { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('📱 Reviewing homepage...');
  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');

  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: 'claude-review/review-desktop-home.png', fullPage: true });
  console.log('✅ Desktop homepage screenshot saved');

  // Tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'claude-review/review-tablet-home.png', fullPage: true });
  console.log('✅ Tablet homepage screenshot saved');

  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'claude-review/review-mobile-home.png', fullPage: true });
  console.log('✅ Mobile homepage screenshot saved');

  // Check Press Kit page
  console.log('📄 Reviewing press kit page...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/press-kit');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'claude-review/review-desktop-press-kit.png', fullPage: true });
  console.log('✅ Press kit screenshot saved');

  // Check Contact page
  console.log('📧 Reviewing contact page...');
  await page.goto('http://localhost:4321/contact');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'claude-review/review-desktop-contact.png', fullPage: true });
  console.log('✅ Contact screenshot saved');

  // Get console messages
  const messages = [];
  page.on('console', msg => messages.push(`${msg.type()}: ${msg.text()}`));

  await page.goto('http://localhost:4321');
  await page.waitForTimeout(2000);

  console.log('\n📊 Console Messages:', messages.length ? messages : 'None');

  await browser.close();
  console.log('\n✨ Review complete! Check the generated PNG files.');
}

reviewSite().catch(console.error);

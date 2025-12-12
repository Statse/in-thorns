import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

async function reviewSections() {
  await mkdir('claude-review', { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('📱 Navigating to homepage...');
  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Section 1: Hero
  console.log('📸 Capturing Hero section...');
  const heroSection = await page.locator('#hero');
  await heroSection.screenshot({ path: 'claude-review/section-1-hero.png' });
  console.log('✅ Hero section saved');

  // Scroll to Music section
  console.log('📸 Capturing Music section...');
  await page.evaluate(() => {
    document.querySelector('#music').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(1500);
  const musicSection = await page.locator('#music');
  await musicSection.screenshot({ path: 'claude-review/section-2-music.png' });
  console.log('✅ Music section saved');

  // Scroll to Tour section
  console.log('📸 Capturing Tour section...');
  await page.evaluate(() => {
    document.querySelector('#tour').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(1500);
  const tourSection = await page.locator('#tour');
  await tourSection.screenshot({ path: 'claude-review/section-3-tour.png' });
  console.log('✅ Tour section saved');

  // Scroll to Photos section
  console.log('📸 Capturing Photos section...');
  await page.evaluate(() => {
    document.querySelector('#photos').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(1500);
  const photosSection = await page.locator('#photos');
  await photosSection.screenshot({ path: 'claude-review/section-4-photos.png' });
  console.log('✅ Photos section saved');

  // Scroll to About section
  console.log('📸 Capturing About section...');
  await page.evaluate(() => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(1500);
  const aboutSection = await page.locator('#about');
  await aboutSection.screenshot({ path: 'claude-review/section-5-about.png' });
  console.log('✅ About section saved');

  // Scroll to Footer/Contact section
  console.log('📸 Capturing Footer section...');
  await page.evaluate(() => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(1500);
  const footerSection = await page.locator('#contact');
  await footerSection.screenshot({ path: 'claude-review/section-6-footer.png' });
  console.log('✅ Footer section saved');

  await browser.close();
  console.log('\n✨ All section screenshots saved to claude-review/');
  console.log('   - section-1-hero.png');
  console.log('   - section-2-music.png');
  console.log('   - section-3-tour.png');
  console.log('   - section-4-photos.png');
  console.log('   - section-5-about.png');
  console.log('   - section-6-footer.png');
}

reviewSections().catch(console.error);

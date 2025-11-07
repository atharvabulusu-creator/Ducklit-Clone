const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to site
  await page.goto('https://ducklit.com', { waitUntil: 'networkidle2' });

  // Save rendered HTML
  const html = await page.content();
  fs.writeFileSync('ducklit_snapshot.html', html);

  // Save screenshot (optional)
  await page.screenshot({ path: 'ducklit.png', fullPage: true });

  await browser.close();
})();

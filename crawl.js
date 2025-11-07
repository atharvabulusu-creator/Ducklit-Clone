const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
  'https://ducklit.com',
  'https://ducklit.com/games',
  'https://ducklit.com/about'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Rewrite links to point to offline files
    await page.evaluate(() => {
      document.querySelectorAll('a').forEach(a => {
        if (a.href.startsWith('https://ducklit.com')) {
          let filename = a.href
            .replace(/https?:\/\//, '')   // remove https://
            .replace(/[\/:]/g, '_')       // replace / with _
            + '.html';
          a.setAttribute('href', filename);
        }
      });
    });

    // Save rendered HTML
    const html = await page.content();
    const filename = url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_') + '.html';
    fs.writeFileSync(filename, html);
  }

  await browser.close();
})();

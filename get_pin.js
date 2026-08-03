const https = require('https');
const fs = require('fs');

function getUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(getUrl(res.headers.location));
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

getUrl('https://pin.it/4EmRii8FJ')
  .then(html => {
    const matches = html.match(/https:\/\/i\.pinimg\.com\/[^\s"'<>\\]+/g);
    console.log('Matches:', matches ? [...new Set(matches)] : 'None');
    
    // Also look for og:image
    const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+property="og:image"/);
    if (ogMatch) {
      console.log('OG Image:', ogMatch[1]);
    }
  })
  .catch(console.error);

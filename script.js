const priceEl = doc.querySelector('#priceblock_ourprice') ||
                doc.querySelector('#priceblock_dealprice') ||
                doc.querySelector('.a-price .a-offscreen');
const price = priceEl ? priceEl.textContent.trim() : 'Price not found';

// IP Alert: search for known keywords in page text
let ipAlert = 'No IP Alert';
const byline = doc.querySelector('#bylineInfo')?.textContent || '';
if (byline.includes('IP Alert')) {
  ipAlert = byline.match(/IP Alert.*?/)[0];
}

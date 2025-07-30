
async function checkASIN() {
  const asin = document.getElementById("asinInput").value.trim();
  const resultBox = document.getElementById("result");
  resultBox.style.display = "none";
  resultBox.innerHTML = "Checking...";

  if (!asin) {
    alert("Please enter a valid ASIN.");
    return;
  }

  try {
    const proxyUrl = "https://corsproxy.io/?";
    const amazonUrl = `https://www.amazon.com/dp/${asin}`;
    const response = await fetch(proxyUrl + encodeURIComponent(amazonUrl));
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract Buy Box Price
    let priceWhole = doc.querySelector('#corePrice_feature_div .a-price .a-price-whole');
    let priceFraction = doc.querySelector('#corePrice_feature_div .a-price .a-price-fraction');
    let price = priceWhole && priceFraction ? 
      `$${priceWhole.innerText}.${priceFraction.innerText}` : 'Price not found';

    // Extract IP Alert Reason
    let ipReasonEl = doc.querySelector('#bylineInfo_feature_div ul li span b');
    let ipReason = ipReasonEl ? ipReasonEl.textContent.trim() : 'No IP Alert';

    resultBox.innerHTML = `<strong>ASIN:</strong> ${asin}<br>
                           <strong>Price:</strong> ${price}<br>
                           <strong>IP Alert:</strong> ${ipReason}`;
    resultBox.style.display = "block";
  } catch (err) {
    resultBox.innerHTML = "Error fetching data. " + err.message;
    resultBox.style.display = "block";
  }
}

// Import the function to be tested

import { scrapeAmazonData } from "../src/scrapeAmazonData.js";

describe('scrapeAmazonData', () => {
  test('should scrape product data from Amazon product page', () => {
    // Mock the document elements for testing
    document.body.innerHTML = `
      <div id="productTitle">Product Title</div>
      <img id="landingImage" src="product_image.jpg">
      <span class="a-price a-text-price a-size-medium apexPriceToPay" data-a-size="b" data-a-color="price"><span class="a-offscreen">$55.99</span><span aria-hidden="true">$55.99</span></span>
      <span data-hook="rating-out-of-text">4.5 out of 5</span>
      <span id="acrCustomerReviewText">100 reviews</span>
      <a id="bylineInfo" href="seller_profile_url"></a>
    `;

    // Call the function to be tested
    const scrapedData = scrapeAmazonData();

    // Assert that the scraped data matches the expected output
    expect(scrapedData).toEqual({
      product: {
        in_platform_id: '',
        title: 'Product Title',
        img: `${window.location.href}product_image.jpg`,
        platform_rating: undefined,
        price: undefined,
        reviews_count: undefined,
        seller: {
          name: undefined,
          profile_url: `${window.location.href}seller_profile_url`,
          platform: {
            name: 'amazon',
            url: 'https://www.amazon.com',
          },
        },
        url: window.location.href,
      },
      reviews: [],
    });
  });
});

export function scrapeAmazonData() {
    const url = window.location.href;
    // if (!url.includes('https://www.amazon.com/dp/')) {
    //   alert('This is not a amazon product page!');
    // }
    const productData = {
      product: {
        in_platform_id: '',
        title: '',
        img: '',
        platform_rating: '',
        reviews_count: '',
        price: '',
        seller: {
          in_platform_id: '',
          name: '',
          profile_url: '',
          platform: {
            name: 'amazon',
            url: 'https://www.amazon.com',
          },
        },
        url: window.location.href,
      },
      reviews: [],
    };
  
    // Scrape product information
    const productTitleElement = document.getElementById('productTitle');
    if (productTitleElement) {
      productData.product.title = productTitleElement?.innerHTML;
    }
  
    const productImageElement = document.getElementById('landingImage');
    if (productImageElement) {
      productData.product.img = productImageElement.src;
    }
  
    const productPriceElement =
      document.getElementsByClassName('apexPriceToPay')[0];
    if (productPriceElement) {
      productData.product.price = productPriceElement?.innerHtml?.split('\n')[0];
    }
  
    const productRatingElement = document.querySelector(
      'span[data-hook="rating-out-of-text"]',
    );
    if (productRatingElement) {
      productData.product.platform_rating =
        productRatingElement?.innerHtml;
    }
  
    const productReviewsCountElement = document.getElementById(
      'acrCustomerReviewText',
    );
    if (productReviewsCountElement) {
      productData.product.reviews_count =
        productReviewsCountElement?.innerHtml?.trim();
    }
  
    const productURL = window.location.href;
    productData.product.url = productURL;
  
    // Scrape seller information
    const sellerNameElement = document.getElementById('bylineInfo');
    if (sellerNameElement) {
      const sellerProfileLink = sellerNameElement.href;
      productData.product.seller = {
        name: sellerNameElement?.innerHtml?.trim(),
        profile_url: sellerProfileLink,
        platform: {
          name: 'amazon',
          url: 'https://www.amazon.com',
        },
      };
    }
  
    // Scrape review information
    const reviewElements = document.querySelectorAll('.review');
  
    reviewElements.forEach((reviewElement) => {
      const review = reviewElement
        .querySelector('.review-text')
        ?.innerHtml?.trim();
      const platform_rating = reviewElement
        .querySelector('.review-rating')
        ?.innerHtml?.trim();
      const review_star = reviewElement.querySelector('.review-rating')?.innerHtml?.split(' ')[0];
      const is_recommended = Number(review_star) > 3 ? true : false; // Assuming rating > 3 means recommended
      const full_name = reviewElement
        .querySelector('.a-profile-content')
        ?.innerHtml?.trim();
      const profile_url = reviewElement.querySelector('.a-profile')?.href;
  
      const reviewObj = {
        review,
        platform_rating,
        is_recommended,
        author: {
          full_name,
          profile_url,
        },
      };
  
      productData.reviews.push(reviewObj);
    });
  
  
    // Display data in a user-friendly way
    console.log('Product Information:');
    console.log('---------------------');
    console.log('Title:', productData.product.title);
    console.log('Image:', productData.product.img);
    console.log('Price:', productData.product.price);
    console.log('Rating:', productData.product.platform_rating);
    console.log('Reviews Count:', productData.product.reviews_count);
    console.log('Seller Information:');
    console.log('Name:', productData.product.seller.name);
    console.log('Profile URL:', productData.product.seller.profile_url);
    console.log('Reviews:');
    productData.reviews.forEach((review, index) => {
      console.log('---------------------');
      console.log('Review', index + 1);
      console.log('Text:', review.review);
      console.log('Rating:', review.platform_rating);
      console.log('Is Recommended:', review.is_recommended);
      console.log('Author:', review.author.full_name);
      console.log('Author Profile URL:', review.author.profile_url);
    });

    return productData;
  }
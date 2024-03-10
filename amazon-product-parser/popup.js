import { scrapeAmazonData } from './src/scrapeAmazonData.js';

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('scrapeButton').addEventListener('click', scrapeData);
});

function scrapeData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: scrapeAmazonData,
    });
  });
}

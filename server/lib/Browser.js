const puppeteer = require("puppeteer");

const Browser = {
  browser: null,
  init: async browserless => {
    try {
      Browser.browser = Browser.browser
        ? await puppeteer.connect(browserless)
        : null;
    } catch (error) {
      throw error;
    }
  },
  close: async () => await Browser.browser.disconnect()
};

module.exports = Browser;

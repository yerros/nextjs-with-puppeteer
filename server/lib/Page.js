const Browser = require("./Browser");

class Page {
  constructor() {
    this.page = null;
    this.browser = null;
  }

  async init(url, headless = true) {
    if (Browser.browser) this.browser = Browser.browser;
    else this.browser = await Browser.init(headless);

    await this.newPage();
    await this.goto(url);
  }

  async newPage() {
    if (!this.browser) throw new Error("Browser not initilized");

    try {
      let page = await this.browser.newPage();
      await page.setViewport({ width: 1920, height: 1200 });
      this.page = page;
    } catch (error) {
      throw error;
    }
  }

  async goto(url) {
    if (!url && !this.page) throw new Error("Page not initilized");

    try {
      await this.page.goto(url, { waitUntil: "networkidle2" });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getElementText(selector) {
    if (!this.page) throw new Error("Page not initilized");
    if (!selector) throw new Error("Selectory not provided");

    try {
      return await this.page.$eval(selector, el => el.textContent.trim());
    } catch (err) {
      return null;
    }
  }

  async getElementSrc(selector) {
    if (!this.page) throw new Error("Page not initilized");
    if (!selector) throw new Error("Selectory not provided");

    try {
      return await this.page.$eval(selector, el => el.getAttribute("src"));
    } catch (err) {
      return null;
    }
  }

  async getElementListHref(selector) {
    if (!this.page) throw new Error("Page not initilized");
    if (!selector) throw new Error("Selectory not provided");

    try {
      return await this.page.$$eval(selector, as => as.map(el => el.href));
    } catch (err) {
      throw new Error(err);
    }
  }

  async closeBrowser() {
    if (!this.browser) throw new Error("Browser is closed already");

    try {
      await this.browser.close();
    } catch (err) {
      throw new Error(err);
    }
  }

  async close() {
    if (!this.page) throw new Error("Page is closed already");

    try {
      await this.page.close();
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Page;

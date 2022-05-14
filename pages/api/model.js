const Model = require("server/lib/model");
const Scraper = require("server/lib/scraper");
const { Sites } = require("server/sites");

// const news = new Models("hackernews");
// const URL = "https://news.ycombinator.com/";

const scrapNews = async () => {
  let result = {};

  try {
    for (const site of Sites) {
      let model = new Model(site.name);
      model.model.vars = { ...model.model.vars, ...site };
      await Scraper.connect();
      await Scraper.newPage();
      await Scraper.goto(site.url);
      const siteResult = await Scraper.scrap(model);
      result = { ...result, ...siteResult };
      // return [];
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const handle = async (req, res) => {
  try {
    const data = await scrapNews();
    res.json({
      data: data
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export default handle;

// const Page = require("./lib/Page");

// const URL = "https://www.amazon.com/gp/goldbox/ref=gbps_ftr_s-5_115b_dlt_LD?gb_f_deals1=dealStates:AVAILABLE%252CWAITLIST%252CWAITLISTFULL,includedAccessTypes:GIVEAWAY_DEAL,sortOrder:BY_SCORE,enforcedCategories:165796011,dealTypes:LIGHTNING_DEAL&pf_rd_p=5269a1b9-d99f-4f97-90e1-4fe5850d115b&pf_rd_s=slot-5&pf_rd_t=701&pf_rd_i=gb_main&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=FH3NBXPSD45WRBF9ZBN8&ie=UTF8";

// const LINK = "a#dealImage";
// const TITLE = "h1#title";
// const ORIGINAL_PRICE = "span.a-text-strike";
// const DISCOUNT_PRICE = "span.priceBlockDealPriceString";
// const IMAGE = "img#landingImage";
// const DISCOUNT = "td.priceBlockSavingsString";

// const run = async () => {
//   const mainPage = new Page();
//   await mainPage.init(URL);

//   const data = [];

//   const listOfLinks = await mainPage.getElementListHref(LINK);
//   await mainPage.close()

//   for (let link of listOfLinks) {
//     const detailsPage = new Page();
//     await detailsPage.init(link);
//     const title = await detailsPage.getElementText(TITLE);
//     const original_price = await detailsPage.getElementText(ORIGINAL_PRICE);
//     const discount_price = await detailsPage.getElementText(DISCOUNT_PRICE);
//     const discount = await detailsPage.getElementText(DISCOUNT);
//     const image = await detailsPage.getElementSrc(IMAGE);
//     // console.log(title)
//     data.push({
//       title : title.substring(0, 10),
//       original_price,
//       discount_price,
//       discount,
//       image,
//       link
//     });
//     await detailsPage.close();
//   }

//   console.table(data)

//   await mainPage.closeBrowser()
// };

// run();

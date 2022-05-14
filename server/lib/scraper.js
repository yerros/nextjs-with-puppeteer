const Selector = require("server/lib/selector");
const puppeteer = require("puppeteer-core");
const mergeDeep = require("server/lib/util");

// Merge a `source` object to a `target` recursively

const browserless = {
  browserWSEndpoint: process.env.BROWSERLESS
};

const Scraper = {
  browser: null,
  page: null,

  // puppeteer connection
  connect: async () => {
    try {
      Scraper.browser = !Scraper.browser
        ? await puppeteer.connect(browserless)
        : null;
    } catch (error) {
      throw new Error(error);
    }
  },

  // puppeteer disconnect
  disconnect: async () => {
    try {
      if (Scraper.browser) await Scraper.browser.disconnect();
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = Scraper;

// const Selector = require("server/lib/selector");
// const puppeteer = require("puppeteer-core");
// const mergeDeep = require("server/lib/util");

// // Merge a `source` object to a `target` recursively

// const browserless = {
//   browserWSEndpoint: process.env.BROWSERLESS
// };

// const Scrapper = {
//   browser: null,
//   page: null,

//   // puppeteer connection
//   connect: async () => {
//     try {
//       Scrapper.browser = !Scrapper.browser
//         ? await puppeteer.connect(browserless)
//         : null;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   // puppeteer disconnect
//   disconnect: async () => {
//     try {
//       if (Scrapper.browser) await Scrapper.browser.disconnect();
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
//   // puppeteer newPage
//   newPage: async () => {
//     try {
//       Scrapper.page = await Scrapper.browser.newPage();
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   // puppeteer goto page
//   goto: async url => {
//     try {
//       await Scrapper.page.goto(url, { waitUntil: "networkidle2" });
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   getElement: async (element, selector, attr) => {
//     try {
//       switch (attr) {
//         case "href":
//           return await element.$eval(selector, innerEl =>
//             innerEl.getAttribute("href")
//           );
//         case "src":
//           return await element.$eval(selector, innerEl =>
//             innerEl.getAttribute("src")
//           );
//         case "class":
//           return await element.$eval(selector, innerEl =>
//             innerEl.getAttribute("class")
//           );
//         case "value":
//           return await element.$eval(selector, innerEl =>
//             innerEl.getAttribute("value")
//           );
//         default:
//           return await element.$eval(selector, innerEl =>
//             innerEl ? innerEl.textContent.trim() : null
//           );
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   // extract element and its conect by using selector
//   getElementBySelector: async (selector, attr = null, el = null) => {
//     if (!selector || !Scrapper.page) return;
//     const element = el ? el : Scrapper.page;

//     try {
//       return await Scrapper.getElement(element, selector, attr);
//     } catch (error) {
//       // console.log(error);
//       return null;
//       // throw new Error(error);
//     }
//   },

//   // extract list element and its conect by using selector
//   getListOfElementBySelector: async (selector, el) => {
//     if (!selector || !Scrapper.page) return;

//     try {
//       return await Scrapper.page.$$(selector);
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   // click a element in puppeteer page
//   click: async selector => {
//     try {
//       return await Scrapper.page.$eval(selector, el => el.click());
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   // scrap a puppetter page and paginate to extract data
//   scrap: async Model => {
//     let model = Model.model;
//     // console.log(model);

//     if (!model && typeof model === "object") return;

//     Selector.config(Model.name);
//     let data = {};
//     let vars = {};

//     let pagination = {
//       pages: 1
//     };

//     if (model.pagination) {
//       pagination = model.pagination;
//       delete model.pagination;
//     }

//     if (model.vars) {
//       vars = model.vars;
//       delete model.vars;
//     }

//     try {
//       for (const [index, i] of Array(pagination.pages).entries()) {
//         const result = await Scrapper.extract(model, vars);
//         data = mergeDeep(data, result);
//         if (index + 1 < pagination.pages)
//           await Scrapper.click(Selector.get(pagination.selector));
//       }
//       return data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   extractElement: async (model, vars, el = Scrapper.page) => {
//     if (!model && typeof model === "object") return;

//     let data = {};

//     try {
//       for (let [key, value] of Object.entries(model)) {
//         console.log(key);
//       }
//     } catch (error) {
//       throw error;
//     }
//   },

//   // extract data from single page
//   extract: async (model, vars, el = Scrapper.page) => {
//     if (!model && typeof model === "object") return;

//     let data = {};

//     try {
//       for (let [key, value] of Object.entries(model)) {
//         if (value.props) {
//           const selector = Selector.get(value.selector);
//           const listOfElements = await Scrapper.getListOfElementBySelector(
//             selector
//           );

//           const props = await Promise.all(
//             listOfElements.map(el => {
//               return Promise.all(
//                 value.props.map(prop => Scrapper.extractElement(prop, vars, el))
//                 // value.props.map(prop => Scrapper.extract(prop, vars, el))
//               );
//             })
//           );
//         }

//         // if (value.props) {
//         //   const selector = Selector.get(value.selector);
//         //   const listOfElements = await Scrapper.getListOfElementBySelector(
//         //     selector
//         //   );
//         //   const props = await Promise.all(
//         //     listOfElements.map(el => {
//         //       return Promise.all(
//         //         value.props.map(prop => Scrapper.extract(prop, vars, el))
//         //       );
//         //     })
//         //   );

//         //   data[key] = props.map(m => Object.assign(...m));
//         // } else {
//         //   if (value.data) {
//         //     // await Scrapper.click(Selector.get(value.selector));
//         //     // data[key] = await Scrapper.extract(value.data, vars);
//         //     // await Scrapper.page.goBack();
//         //     console.log("value.data");
//         //   } else if (value.var) {
//         //     // console.log(vars);
//         //     data[key] = vars[value.var];
//         //   } else {
//         //     const attr = value.attr ? value.attr : null;
//         //     const selector = Selector.get(value.selector);
//         //     data[key] = await Scrapper.getElementBySelector(selector, attr, el);
//         //   }
//         // }
//       }

//       return data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// };

// module.exports = Scrapper;

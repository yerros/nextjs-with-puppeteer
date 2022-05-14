const scraper = require("../../server/lib/scraper");
const Tags = require("../../server/lib/tags");
const tags = new Tags();
const url = "https://www.amazon.com/gp/goldbox";
// const TILE = "div.singleCell";
// const TITLE = "a.singleCellTitle";
// const PRICE = "div.priceBlock";
// const IMAGE = "a.singleCellTitle";

const getData = async () => {
  if (await scraper.getDriver()) {
    try {
      await scraper.getPage(url);
      // const result = await scraper.getText(".gbh1-bold");
      const listElement = await scraper.listElement(tags.get.title);
      const result = await scraper.extractList(listElement);
      await scraper.close();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else return false;
};

export default function handle(req, res) {
  // console.log(req.body); // The request body
  // console.log(req.query); // The url querystring
  // console.log(req.cookies); // The passed cookies
  Promise.resolve(getData()).then(result =>
    res.json({
      data: result
    })
  );
  // res.json({
  //   data: "api data ok"
  // });
}

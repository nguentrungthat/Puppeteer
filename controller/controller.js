const scraper = require("./scraping_tonitrus");
const DataModel = require("../model/model");

const scrapeController = async (browserInstance) => {
	try {
		let browser = await browserInstance;
		await scraper(browser, "https://www.tonitrus.com/");
		// const dataModel = new DataModel();
		// const data = dataModel.getAllData();
		// console.log("Count data scraped: ", data?.length);
	} catch (e) {
		console.log("Error controller: ", e);
	}
};

module.exports = scrapeController;

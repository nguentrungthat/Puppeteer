const scraper = require("./scraper");
const DataModel = require("../model/model");

const scrapeController = async (browserInstance) => {
	try {
		const dataModel = new DataModel();
		let browser = await browserInstance;
		await scraper(browser, "https://www.tonitrus.com/");
		const data = dataModel.getAllData();
		console.log("Count data scraped: ", data?.length);
	} catch (e) {
		console.log("Error controller: ", e);
	}
};

module.exports = scrapeController;

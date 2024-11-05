const scraper = require("./scraping-tonitrus");
const puppeteer = require("puppeteer");
const DataModel = require("../model/model");

class Controller {
	constructor() {
		this._scrapeController();
	}

	_scrapeController = async (browserURL = "http://localhost:9222/") => {
		try {
			let browser = await puppeteer.connect({
				browserURL,
			});
			await scraper({ browser, url: "https://www.tonitrus.com/" });
			// const dataModel = new DataModel();
			// const data = dataModel.getAllData();
			// console.log("Count data scraped: ", data?.length);
		} catch (e) {
			console.log("Error controller: ", e);
		}
	};
}

module.exports = Controller;

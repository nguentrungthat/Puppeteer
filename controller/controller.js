const scraperTonitrus = require("./scraping-tonitrus");
const scraperCapbleandkit = require("./scraping-capbleandkit");
const puppeteer = require("puppeteer");
const DataModel = require("../model/model");

class Controller {
	constructor(targetUrl, browserUrl) {
		this._scrapeController(targetUrl, browserUrl);
	}

	_scrapeController = async (targetUrl = "tonitrus.com", browserURL = "http://localhost:9222/") => {
		try {
			let browser = await puppeteer.connect({
				browserURL,
			});
			switch (targetUrl) {
				case "tonitrus.com":
					await scraperTonitrus({ browser, url: "https://tonitrus.com/" });
					break;
				case "cablesandkits.com":
					await scraperCapbleandkit({ browser, url: "https://cablesandkits.com/" });
					break;
				default:
					break;
			}
			// const dataModel = new DataModel();
			// const data = dataModel.getAllData();
			// console.log("Count data scraped: ", data?.length);
		} catch (e) {
			console.log("Error controller: ", e);
		}
	};
}

module.exports = Controller;

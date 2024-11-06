const scraperTonitrus = require("./scraping-tonitrus");
const scraperCapbleandkit = require("./scraping-capbleandkit");
const puppeteer = require("puppeteer");
const DataModel = require("../model/model");
const { connect } = require("puppeteer-real-browser");

class Controller {
	constructor(targetUrl, browserUrl) {
		this._scrapeController(targetUrl, browserUrl);
	}

	_scrapeController = async (targetUrl = "tonitrus.com", browserURL = "http://localhost:9222/") => {
		try {
			switch (targetUrl) {
				case "tonitrus.com":
					let browserTonitrus = await puppeteer.connect({
						browserURL,
					});
					await scraperTonitrus({ browserTonitrus, url: "https://tonitrus.com/" });
					break;
				case "cablesandkits.com":
					const { browser, page } = await connect({});
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

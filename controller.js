const scraper = require("./scrapper");
const scrapeController = async (browserInstance) => {
	try {
		let browser = await browserInstance;
		scraper(browser, "https://prology.net/cisco-meraki/");
	} catch (e) {
		console.log("Error controller: ", e);
	}
};

module.exports = scrapeController;

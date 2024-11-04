const puppeteer = require("puppeteer");

const startBrowser = async (browserURL = "http://localhost:9222") => {
	let browser;
	try {
		browser = await puppeteer.connect({
			browserURL,
		});
	} catch (e) {
		console.log("Error browser: ", e);
	}
	return browser;
};

module.exports = startBrowser;

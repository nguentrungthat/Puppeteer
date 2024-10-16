const puppeteer = require("puppeteer");

const startBrowser = async () => {
	let browser;
	try {
		browser = await puppeteer.launch({
			headless: false,
			args: ["--disable-setuid-sandbox"],
			ignoreHTTPSErrors: true,
		});
	} catch (e) {
		console.log("Error browser: ", e);
	}
	return browser;
};

module.exports = startBrowser;

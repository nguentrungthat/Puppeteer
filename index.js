const startBrowser = require("./browser");
const scrapeController = require("./controller");

let browser = startBrowser();
scrapeController(browser);

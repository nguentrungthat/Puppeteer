// cd C:\Program Files\Google\Chrome\Application
// chrome --remote-debugging-port=9222 --allow-origin-remote=* --profile-directory=Scraping

const startBrowser = require("./controller/browser");
const scrapeController = require("./controller/controller");

let browser = startBrowser();
scrapeController(browser);

const DataModel = require("../model/model");
const dataModel = new DataModel();

/**
 * @param browser // connection browser puppeteer.connect
 * @param url
 */
const scraper = async ({ browser, url = "" }) => {
	try {
		const page = await browser.newPage();
		const searchResultSelector = "ul.tn-dropdown";

		// Navigate the page to a URL
		await page.goto(url, {
			waitUntil: "networkidle2",
		});

		// Wait
		await page.waitForSelector(searchResultSelector);

		const arrayLinkCate = await page.$$eval("ul.tn-dropdown > li.ck-tn-dd-container a.ck-tn-dd-link", (nodes) => nodes.map((node) => node.href));

		if (arrayLinkCate?.length > 1) {
			const limitedLinks = arrayLinkCate.slice(0, 2);
			for (const linkCate of limitedLinks) {
				if (!linkCate) continue;
				try {
					console.log("linkCate", linkCate);
					const newPage = await browser.newPage();
					getListCate(newPage, linkCate, browser);
				} catch (e) {
					console.error("Link Category Error", linkCate, e.message);
					continue;
				}
			}
		}
		await page.close();
		// await browser.close();
	} catch (e) {
		console.log("Error scraper: ", e);
	}
};

/**
 * @param page
 * @param linkCate // string
 * @param browser
 */
async function getListCate(page, linkCate, browser) {
	await page.goto(linkCate, { waitUntil: "networkidle2" });

	const listCategories = await page.$$eval(".tw-text-center > div > a.tw-relative", (nodes) => nodes.map((node) => node.href));
	if (listCategories?.length > 0) {
		for (const cateLevel2 of listCategories.slice(0, 1)) {
			try {
				const newPage = await browser.newPage();
				getListCate(newPage, cateLevel2, browser);
			} catch (e) {
				console.error(`Link ${cateLevel2} ${e.message}`);
				continue;
			}
		}
	} else {
		// Wait
		await page.waitForSelector("div.product-results-organize");
		const listProducts = await page.$$eval("div.product-results-organize > div.product-desc > a.lnk-to-prod", (nodes) =>
			nodes.map((node) => node.href)
		);
		console.log("listProducts", listProducts);
		for (const linkProduct of listProducts) {
			try {
				await scrapingProduct(page, linkProduct);
			} catch (e) {
				console.error(`Link ${linkProduct} ${e.message}`);
				continue;
			}
		}
	}
	await page.close();
}

/**
 * @param page
 * @param productLink //string
 * @param maxRetries //Times retries if connection fail
 */
async function scrapingProduct(page, productLink, maxRetries = 3) {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			await page.goto(productLink, {
				waitUntil: "networkidle2",
			});

			await page.waitForSelector("#item-name");

			const textNameProduct = await page.$eval("#item-name", (el) => el.textContent?.trim() || "");
			// const [brand, model, ...nameParts] = textNameProduct.split(" - ");
			// const nameProduct = nameParts.join(" ").trim();

			const arrImage = await page.$$eval("#image-carousel > button", (nodes) =>
				nodes.map((node) => node.getAttribute("data-hero-img")).filter(Boolean)
			);
			dataModel.saveData(textNameProduct, "cablesandkits", arrImage);
			return;
		} catch (error) {
			console.error(`Attempt ${attempt} failed:`, error.message);
			if (attempt === maxRetries) {
				console.error(`Failed to load ${productLink} after ${maxRetries} attempts`);
				return;
			}
			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
		}
	}
}

module.exports = scraper;

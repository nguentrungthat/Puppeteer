const scraper = async (browser, url = "https://developer.chrome.com/") => {
	try {
		const page = await browser.newPage();
		const searchResultSelector = ".main > .products-grid";

		// Navigate the page to a URL
		await page.goto(url);

		// Wait and click on first result
		await page.waitForSelector(searchResultSelector);

		const dataMeraki = await page.$$eval(".main > .products-grid > ol > li ", (els) => {
			return [els[0]].map((el) => {
				// Find the <a> tag within the li
				const linkElement = el.querySelector(".product-item-link");
				// Return the text inside the <a> tag
				return {
					text: linkElement ? linkElement.textContent.trim() : null,
					link: linkElement ? linkElement.href : null,
				};
			});
		});

		if (dataMeraki?.length > 0) {
			let listProduct = [];

			// Using for...of loop to handle asynchronous operations
			for (const element of dataMeraki) {
				const newPage = await browser.newPage();
				await newPage.goto(element?.link);

				// Wait for the product title
				await newPage.waitForSelector(".product-info-main > .page-title-wrapper > h1 > span");
				const titleElement = await newPage.$(".product-info-main > .page-title-wrapper > h1 > span");
				const productTitle = await newPage.evaluate((el) => el.textContent, titleElement);

				// Wait for the product description
				await newPage.waitForSelector(".product-info-main > .attribute > div");
				const descriptionElement = await newPage.$(".product-info-main > .attribute > div");
				const productDescription = await newPage.evaluate((el) => el.textContent, descriptionElement);

				// Wait for the image
				await newPage.waitForSelector(".product > .gallery-placeholder > .fotorama-item img");
				const linkElement = await newPage.$(".product > .gallery-placeholder > .fotorama-item img");
				const linkImage = await newPage.evaluate((el) => el.src, linkElement);

				// Push the product details to the list
				listProduct.push({ title: productTitle, image: linkImage, shortDescription: productDescription });

				// Close the page instead of the browser
				await newPage.close();
			}

			console.log("listProduct", listProduct);
		}
		await browser.close();
	} catch (e) {
		console.log("Error scraper: ", e);
	}
};

module.exports = scraper;

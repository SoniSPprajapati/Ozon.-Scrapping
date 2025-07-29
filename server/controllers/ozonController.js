const puppeteer = require("puppeteer");

exports.scrapeOzon = async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new", // Use 'new' for newer puppeteer versions
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(
      `https://www.ozon.ru/search/?text=${encodeURIComponent(keyword)}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    await page.waitForSelector('[data-widget="searchResultsV2"]');

    const products = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll('[data-widget="searchResultsV2"] .tsBodyL')
      );
      return items.slice(0, 10).map((el) => {
        const title = el.innerText || "No title";
        const priceEl = el
          .closest('[data-widget="searchResultsV2"]')
          ?.querySelector('[data-test-id="tile-price"]');
        const price = priceEl
          ? priceEl.textContent.replace(/\s+/g, " ").trim()
          : "Price not found";
        const imageEl = el
          .closest('[data-widget="searchResultsV2"]')
          ?.querySelector("img");
        const image = imageEl ? imageEl.src : "";
        const linkEl = el.closest("a");
        const link = linkEl
          ? "https://www.ozon.ru" + linkEl.getAttribute("href")
          : "";

        return { title, price, image, link };
      });
    });

    await browser.close();
    return res.json({ data: products });
  } catch (err) {
    console.error("Scraping failed:", err.message);
    return res
      .status(500)
      .json({ message: "Scraping failed", error: err.message });
  }
};

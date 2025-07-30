import { Readable } from "stream";
import { pipeline } from "stream/promises";
import puppeteer from "puppeteer";
import { generateHTML } from "../data/html";

const generatePuppeteerPDF = async (sampleData) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const html = generateHTML(sampleData);

    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
    });

    await browser.close();
    return pdfBuffer;
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
};

const streamPuppeteerPDF = async (sampleData, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const html = generateHTML(sampleData);

  await page.setContent(html);
  const pdfStream = Readable.fromWeb(
    await page.createPDFStream({
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
    })
  );

  await pipeline(pdfStream, res);
  await browser.close();
};

export { generatePuppeteerPDF, streamPuppeteerPDF };

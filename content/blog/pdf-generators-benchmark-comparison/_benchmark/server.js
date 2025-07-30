import express from "express";
import { generateSampleData } from "./data/sampleData";
import {
  streamPDFKit,
  streamPDFMake,
  streamReactPDF,
  streamPuppeteerPDF,
  streamWkhtmltopdfPDF,
} from "./generators/index";

const app = express();

const streamPDF = (streamGenerator) => async (req, res) => {
  try {
    const size = req.query.size || "medium-text";
    const font = req.query.font;
    const sampleData = generateSampleData(size);

    streamGenerator(sampleData, res, font);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

app.get("/pdf/pdfkit", streamPDF(streamPDFKit));
app.get("/pdf/pdfmake", streamPDF(streamPDFMake));
app.get("/pdf/reactpdf", streamPDF(streamReactPDF));
app.get("/pdf/puppeteer", streamPDF(streamPuppeteerPDF));
app.get("/pdf/wkhtmltopdf", streamPDF(streamWkhtmltopdfPDF));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/test-endpoints.html");
});

app.listen(3000, () => {
  console.log("PDF Benchmark Server running on port 3000");
});

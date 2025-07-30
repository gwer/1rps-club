import PDFDocument from "pdfkit";
import { fontPaths } from "../data/fonts";

const streamPDFKit = (sampleData, res, customFont) => {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" },
  });
  doc.pipe(res);
  const font = customFont || "Roboto";
  const fontBold = `${font}-Bold`;

  doc.registerFont("Roboto", fontPaths.regular);
  doc.registerFont("Roboto-Bold", fontPaths.bold);
  doc.registerFont("Roboto-Italic", fontPaths.italic);
  doc.registerFont("Roboto-BoldItalic", fontPaths.boldItalic);

  doc.font(font).fontSize(20).text(sampleData.title, { paragraphGap: 12 });

  sampleData.content.forEach((paragraph) => {
    doc.font(font).fontSize(12).text(paragraph, { paragraphGap: 12 });
  });

  doc.font(fontBold).fontSize(16).text("Sample Table:", { paragraphGap: 12 });

  doc.font(font).fontSize(12).table({ data: sampleData.table });

  doc.end();
};

export { streamPDFKit };

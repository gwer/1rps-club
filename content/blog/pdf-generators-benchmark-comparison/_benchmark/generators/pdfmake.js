import PdfPrinter from "pdfmake/src/printer";
import { pdfMakeFonts } from "../data/fonts";

const streamPDFMake = (sampleData, res, customFont) => {
  const printer = new PdfPrinter(pdfMakeFonts);

  const docDefinition = {
    content: [
      { text: sampleData.title, style: "header" },
      ...sampleData.content.map((p) => ({ text: p, margin: [0, 10] })),
      { text: "Sample Table:", style: "subheader", margin: [0, 20, 0, 10] },
      sampleData.table.length > 0
        ? {
            table: {
              headerRows: 1,
              widths: Array(sampleData.table[0].length).fill("*"),
              body: sampleData.table,
            },
            layout: "lightHorizontalLines",
            margin: [0, 0, 0, 20],
          }
        : "",
    ],
    defaultStyle: {
      font: customFont || "Roboto",
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
      },
    },
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(res);

  pdfDoc.end();
};

export { streamPDFMake };

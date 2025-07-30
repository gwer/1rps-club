import wkhtmltopdf from "wkhtmltopdf";
import { generateHTML } from "../data/html";

const streamWkhtmltopdfPDF = (sampleData, res) => {
  const html = generateHTML(sampleData);

  return wkhtmltopdf(html, {
    pageSize: "A4",
    marginTop: "1cm",
    marginRight: "1cm",
    marginBottom: "1cm",
    marginLeft: "1cm",
    enableLocalFileAccess: true,
  }).pipe(res);
};

export { streamWkhtmltopdfPDF };

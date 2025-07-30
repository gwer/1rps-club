import { fontFaceCSS, fontFamily } from "./fonts";

export const generateHTML = (sampleData) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${fontFaceCSS}
          
          body { font-family: '${fontFamily}', sans-serif; margin: 40px; }
          h1 { font-size: 24px; margin-bottom: 20px; font-weight: 500; }
          h2 { font-size: 20px; margin: 20px 0 10px; font-weight: 500; }
          p { font-size: 16px; margin-bottom: 10px; line-height: 1.5; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 16px; }
          th { background-color: #f2f2f2; font-weight: 500; }
        </style>
      </head>
      <body>
        <h1>${sampleData.title}</h1>
        ${sampleData.content.map((p) => `<p>${p}</p>`).join("")}
        
        <h2>Sample Table:</h2>
        <table>
          <tr>
            ${
              sampleData.table.length > 0
                ? sampleData.table[0].map((cell) => `<th>${cell}</th>`).join("")
                : ""
            }
          </tr>
          ${
            sampleData.table.length > 1
              ? sampleData.table
                  .slice(1)
                  .map(
                    (row) =>
                      `<tr>${row
                        .map((cell) => `<td>${cell}</td>`)
                        .join("")}</tr>`
                  )
                  .join("")
              : ""
          }
        </table>
      </body>
    </html>
  `;
};

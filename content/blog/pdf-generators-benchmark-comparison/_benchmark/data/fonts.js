import { join } from "path";

// Paths to Roboto font files
const fontPaths = {
  regular: join(__dirname, "../fonts/Roboto-Regular.ttf"),
  bold: join(__dirname, "../fonts/Roboto-Medium.ttf"),
  italic: join(__dirname, "../fonts/Roboto-Italic.ttf"),
  boldItalic: join(__dirname, "../fonts/Roboto-MediumItalic.ttf"),
};

// PDFMake font configuration
const pdfMakeFonts = {
  Roboto: {
    normal: fontPaths.regular,
    bold: fontPaths.bold,
    italics: fontPaths.italic,
    bolditalics: fontPaths.boldItalic,
  },

  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

// CSS font-face declarations for web-based generators
const fontFaceCSS = `
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url('file://${fontPaths.regular}') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src: url('file://${fontPaths.bold}') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  src: url('file://${fontPaths.italic}') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  src: url('file://${fontPaths.boldItalic}') format('truetype');
}
`;

const fontFamily = "Roboto";

export { fontPaths, pdfMakeFonts, fontFaceCSS, fontFamily };

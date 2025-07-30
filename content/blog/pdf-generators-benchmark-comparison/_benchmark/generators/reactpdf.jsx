import React from "react";
import {
  renderToStream,
  Font,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { fontPaths } from "../data/fonts";

// Register Roboto fonts
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: fontPaths.regular,
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: fontPaths.bold,
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: fontPaths.italic,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: fontPaths.boldItalic,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const getStyles = (customFont) =>
  StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: customFont || "Roboto",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 16,
      marginTop: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    text: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 1.5,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 20,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCell: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },
    tableHeader: {
      fontSize: 10,
      fontWeight: "bold",
    },
    tableText: {
      fontSize: 10,
    },
    listItem: {
      fontSize: 12,
      marginBottom: 5,
      marginLeft: 10,
    },
  });

const ReactPDFDocument = ({ sampleData, font }) => {
  const styles = getStyles(font);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text key="title" style={styles.title}>
            {sampleData.title}
          </Text>
          {sampleData.content.map((paragraph, index) => (
            <Text key={`content-${index}`} style={styles.text}>
              {paragraph}
            </Text>
          ))}

          {/* Table */}
          <Text key="table-title" style={styles.subtitle}>
            Sample Table:
          </Text>
          <View key="table" style={styles.table}>
            {sampleData.table.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {row.map((cell, cellIndex) => (
                  <View key={cellIndex} style={styles.tableCell}>
                    <Text
                      style={
                        rowIndex === 0 ? styles.tableHeader : styles.tableText
                      }
                    >
                      {cell}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const streamReactPDF = async (sampleData, res, customFont) => {
  (
    await renderToStream(
      <ReactPDFDocument sampleData={sampleData} font={customFont} />
    )
  ).pipe(res);
};

export { streamReactPDF };

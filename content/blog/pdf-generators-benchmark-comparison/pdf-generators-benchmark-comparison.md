---
title: 'PDF Generators Comparison and Benchmark: PDFKit, PDFMake, React-PDF, Puppeteer & wkhtmltopdf'
description: 'A comparison of the best PDF generators for 2025'
date: 2025-07-31
tags: ['pdf', 'benchmark']
---

{% youtube "https://www.youtube.com/watch?v=4RNnHDUXT7A" %}

When you need to generate PDFs programmatically, the choice of library can dramatically impact your application's performance and server costs. With multiple solutions available — from lightweight libraries like PDFKit to browser-based approaches like Puppeteer — the performance difference between them can be overwhelming.

To find out which PDF generator is better, I benchmarked 5 popular solutions across different document sizes and scenarios. The results reveal performance gaps of up to **130x** between the fastest and slowest options, with file sizes varying by up to **18x**.

## TL;DR: Recommendations

- **High performance + small files**: PDFKit with standard fonts
- **Best balance of performance + convenience**: PDFMake
- **HTML/CSS rendering needed**: Wkhtmltopdf (or Puppeteer if you need support for modern CSS)

## Solutions Under Test

**JavaScript PDF Libraries:**

- **PDFKit** - Low-level PDF generation library.
- **PDFMake** - High-level declarative PDF creation over PDFKit
- **React-PDF** - Component-based PDF generation with React

**Browser-Based Solutions:**

- **Puppeteer** - Headless Chrome API
- **wkhtmltopdf** - Qt WebKit based PDF renderer

## Font Impact: Base 14 vs Custom Fonts

A crucial factor in PDF generation performance is font handling. The PDF standard defines **Base 14 fonts** (also known as Standard 14 fonts) — a set of fonts that must be available in every PDF viewer without embedding. These include Helvetica, Times-Roman, Courier, and Symbol fonts. When using Base 14 fonts, libraries can avoid font embedding entirely, resulting in smaller files and faster generation.

**⚠️ Unicode/Internationalization Caveat:** Standard fonts have limited character set support. While excellent for English and basic Latin scripts, they may not support Cyrillic, Chinese, Arabic, or many special characters.

Each library was tested with both scenarios:

- **Custom fonts (Roboto)** - Requires font embedding, larger files, slower generation
- **Standard fonts (Helvetica)** - No embedding needed, smaller files, faster generation

## Document Complexity

Documents were generated with text content and tables across three complexity levels: small (10 elements), medium (100 elements), and large (1000 elements).

## Benchmark Environment

**Hardware:**

- Digital Ocean Droplet (1 CPU, 2GB RAM)

**Software:**

- Node.js v24.4.1
- PDFKit v0.17.1
- PDFMake v0.2.20
- React-PDF v4.3.0
- Puppeteer v24.15.0
- wkhtmltopdf v0.4.0

**Test Methodology:**

- Load testing: Bombardier with 1 concurrent connection

{% githubLink "content/blog/pdf-generators-benchmark-comparison/_benchmark/", "Benchmark code" %}

## Server Performance: Requests Per Second

The server performance test measures how many PDF generation requests each library can handle per second.

### Text Documents Performance

{% benchmark
  {
    "PDFKit": 13.07,
    "PDFKit (Helvetica)": 64.02,
    "PDFMake": 9.31,
    "PDFMake (Helvetica)": 26.96,
    "React-PDF": 8.51,
    "React-PDF (Helvetica)": 16.83,
    "Puppeteer": 0.50,
    "wkhtmltopdf": 3.42
  },
  "Small documents (10 paragraphs) (RPS)"
%}

{% benchmark
  {
    "PDFKit": 8.69,
    "PDFKit (Helvetica)": 14.66,
    "PDFMake": 3.84,
    "PDFMake (Helvetica)": 4.03,
    "React-PDF": 1.15,
    "React-PDF (Helvetica)": 1.30,
    "Puppeteer": 0.51,
    "wkhtmltopdf": 2.92
  },
  "Medium documents (100 paragraphs) (RPS)"
%}

{% benchmark
  {
    "PDFKit": 2.21,
    "PDFKit (Helvetica)": 1.77,
    "PDFMake": 0.60,
    "PDFMake (Helvetica)": 0.45,
    "React-PDF": 0.07,
    "React-PDF (Helvetica)": 0.08,
    "Puppeteer": 0.35,
    "wkhtmltopdf": 1.00
  },
  "Large documents (1000 paragraphs) (RPS)"
%}

### Table Generation Performance

Tables are particularly challenging for PDF generators, especially when they contain many rows.

{% benchmark
  {
    "PDFKit": 2.80,
    "PDFKit (Helvetica)": 58.74,
    "PDFMake": 11.96,
    "PDFMake (Helvetica)": 54.74,
    "React-PDF": 5.22,
    "React-PDF (Helvetica)": 5.85,
    "Puppeteer": 0.55,
    "wkhtmltopdf": 3.48
  },
  "Small tables (10 rows) (RPS)"
%}

{% benchmark
  {
    "PDFKit": 0.45,
    "PDFKit (Helvetica)": 15.50,
    "PDFMake": 7.28,
    "PDFMake (Helvetica)": 15.46,
    "React-PDF": 0.71,
    "React-PDF (Helvetica)": 0.70,
    "Puppeteer": 0.50,
    "wkhtmltopdf": 2.99
  },
  "Medium tables (100 rows) (RPS)"
%}

{% benchmark
  {
    "PDFKit": 0.03,
    "PDFKit (Helvetica)": 1.80,
    "PDFMake": 1.49,
    "PDFMake (Helvetica)": 1.71,
    "React-PDF": 0.03,
    "React-PDF (Helvetica)": 0.03,
    "Puppeteer": 0.25,
    "wkhtmltopdf": 1.00
  },
  "Large tables (1000 rows) (RPS)"
%}

### Performance Analysis

- PDFKit is the absolute champion.
- Using standard fonts is much better than using custom fonts, especially for small documents.
- React-PDF is acceptable only for small documents.
- PDFKit got its tables support recently and it works really slowly with custom fonts. But it's great with standard fonts.
- PDFMake has its own tables implementation and it's the best option.
- Puppeteer and wkhtmltopdf are not the fastest, but they have less speed decrease with growing document size.

## File Size Comparison

Generated file sizes vary significantly between libraries and font choices, directly impacting bandwidth costs and download times.

### Text Document File Sizes

{% benchmark
  {
    "PDFKit": 15.2,
    "PDFKit (Helvetica)": 2.0,
    "PDFMake": 19.8,
    "PDFMake (Helvetica)": 4.6,
    "React-PDF": 17.8,
    "React-PDF (Helvetica)": 3.3,
    "Puppeteer": 14.7,
    "wkhtmltopdf": 9.9
  },
  "Small documents (KB)"
%}

{% benchmark
  {
    "PDFKit": 113.9,
    "PDFKit (Helvetica)": 100.2,
    "PDFMake": 368.5,
    "PDFMake (Helvetica)": 314.3,
    "React-PDF": 144.2,
    "React-PDF (Helvetica)": 117.5,
    "Puppeteer": 352.5,
    "wkhtmltopdf": 206.6
  },
  "Large documents (KB)"
%}

### Table File Sizes

{% benchmark
  {
    "PDFKit": 18.0,
    "PDFKit (Helvetica)": 2.7,
    "PDFMake": 19.9,
    "PDFMake (Helvetica)": 2.8,
    "React-PDF": 21.7,
    "React-PDF (Helvetica)": 3.7,
    "Puppeteer": 33.0,
    "wkhtmltopdf": 12.0
  },
  "Small tables (KB)"
%}

{% benchmark
  {
    "PDFKit": 119.5,
    "PDFKit (Helvetica)": 100.2,
    "PDFMake": 127.0,
    "PDFMake (Helvetica)": 96.6,
    "React-PDF": 201.2,
    "React-PDF (Helvetica)": 150.9,
    "Puppeteer": 1714.6,
    "wkhtmltopdf": 144.2
  },
  "Large tables (KB)"
%}

### File Size Analysis

Using standard fonts (Helvetica) consistently produces smaller files. This is especially important for small documents. PDFKit generates 2KB files with Helvetica vs 15.2KB with Roboto for small documents — a **7.6x difference**. This occurs because standard fonts don't require embedding, while custom fonts like Roboto must include the full font data in the PDF.

Puppeteer produces larger files, especially for complex tables (1.7MB vs ~100-200KB for other libraries).

## Conclusion

### PDFKit

**Pros:**

- Fastest option overall
- Generates smallest file sizes
- Flexible enough for most use cases

**Cons:**

- Low-level imperative API can be challenging for complex document preparation
- Performance issues with table generation when using custom fonts (may be fixed in future updates)

PDFKit is ideal when you need maximum server performance and don't mind the setup complexity.

---

### PDFMake

**Pros:**

- Performance close to PDFKit
- Custom table implementation without performance issues
- More convenient declarative approach to document description

**Cons:**

- May lack flexibility for complex use cases

PDFMake is perfect for efficiently generating relatively simple documents.

---

### React-PDF

**Pros:**

- Handles small text documents reasonably well

**Cons:**

- Very slow on large documents
- Poor table handling (tables break across page boundaries)
- Occasionally crashes with `yoga-layout` errors

React-PDF can currently only be used for generating simple and small text documents. No advantages over PDFMake were found.

---

### Puppeteer

**Pros:**

- Renders PDFs using browser engine — all you need is HTML + CSS

**Cons:**

- Resource-intensive
- Relatively slow on limited hardware
- Sometimes generates excessively large files

Puppeteer is suitable when you want convenient document generation for small volumes or have access to unlimited server resources.

---

### wkhtmltopdf

**Pros:**

- Like Puppeteer but faster and less resource-intensive
- Performance on large files comparable to PDFMake

**Cons:**

- Based on outdated QtWebKit and doesn't support modern CSS features

wkhtmltopdf works more efficiently than Puppeteer but requires developers to work with legacy CSS standards.

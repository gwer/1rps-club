#!/bin/bash
host="${HOST:-http://localhost:3000}"

trap exit SIGINT SIGTERM

run_test() {
  local url="$1"
  local duration="${2:-10}s"
  bombardier -c 1 -t 60s -d $duration "$url"
}

tests=(
  "$host/pdf/pdfkit?size=small"
  "$host/pdf/pdfkit?size=medium"
  "$host/pdf/pdfkit?size=large"
  "$host/pdf/pdfkit?size=small-table"
  "$host/pdf/pdfkit?size=medium-table|20"
  "$host/pdf/pdfkit?size=large-table|60"
  "$host/pdf/pdfkit?size=small&font=Helvetica"
  "$host/pdf/pdfkit?size=medium&font=Helvetica"
  "$host/pdf/pdfkit?size=large&font=Helvetica"
  "$host/pdf/pdfkit?size=small-table&font=Helvetica"
  "$host/pdf/pdfkit?size=medium-table&font=Helvetica"
  "$host/pdf/pdfkit?size=large-table&font=Helvetica"
  "$host/pdf/pdfmake?size=small"
  "$host/pdf/pdfmake?size=medium"
  "$host/pdf/pdfmake?size=large|20"
  "$host/pdf/pdfmake?size=small-table"
  "$host/pdf/pdfmake?size=medium-table"
  "$host/pdf/pdfmake?size=large-table"
  "$host/pdf/pdfmake?size=small&font=Helvetica"
  "$host/pdf/pdfmake?size=medium&font=Helvetica"
  "$host/pdf/pdfmake?size=large&font=Helvetica|20"
  "$host/pdf/pdfmake?size=small-table&font=Helvetica"
  "$host/pdf/pdfmake?size=medium-table&font=Helvetica"
  "$host/pdf/pdfmake?size=large-table&font=Helvetica"
  "$host/pdf/reactpdf?size=small"
  "$host/pdf/reactpdf?size=medium|20"
  "$host/pdf/reactpdf?size=large|60"
  "$host/pdf/reactpdf?size=small-table"
  "$host/pdf/reactpdf?size=medium-table|20"
  "$host/pdf/reactpdf?size=large-table|60"
  "$host/pdf/reactpdf?size=small&font=Helvetica"
  "$host/pdf/reactpdf?size=medium&font=Helvetica|20"
  "$host/pdf/reactpdf?size=large&font=Helvetica|60"
  "$host/pdf/reactpdf?size=small-table&font=Helvetica"
  "$host/pdf/reactpdf?size=medium-table&font=Helvetica|20"
  "$host/pdf/reactpdf?size=large-table&font=Helvetica|60"
  "$host/pdf/puppeteer?size=small|20"
  "$host/pdf/puppeteer?size=medium|20"
  "$host/pdf/puppeteer?size=large|20"
  "$host/pdf/puppeteer?size=small-table|20"
  "$host/pdf/puppeteer?size=medium-table|20"
  "$host/pdf/puppeteer?size=large-table|20"
  "$host/pdf/wkhtmltopdf?size=small"
  "$host/pdf/wkhtmltopdf?size=medium"
  "$host/pdf/wkhtmltopdf?size=large"
  "$host/pdf/wkhtmltopdf?size=small-table"
  "$host/pdf/wkhtmltopdf?size=medium-table"
  "$host/pdf/wkhtmltopdf?size=large-table"
)

for test in "${tests[@]}"; do  
  IFS='|' read -r url duration <<< "$test"
  run_test "$url" "$duration"
done

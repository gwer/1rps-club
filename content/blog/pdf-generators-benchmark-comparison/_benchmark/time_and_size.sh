#!/bin/bash
host="${HOST:-http://localhost:3000}"

urls=(
  "$host/pdf/pdfkit?size=small"
  "$host/pdf/pdfkit?size=medium"
  "$host/pdf/pdfkit?size=large"
  "$host/pdf/pdfkit?size=small-table"
  "$host/pdf/pdfkit?size=medium-table"
  "$host/pdf/pdfkit?size=large-table"
  "$host/pdf/pdfkit?size=small&font=Helvetica"
  "$host/pdf/pdfkit?size=medium&font=Helvetica"
  "$host/pdf/pdfkit?size=large&font=Helvetica"
  "$host/pdf/pdfkit?size=small-table&font=Helvetica"
  "$host/pdf/pdfkit?size=medium-table&font=Helvetica"
  "$host/pdf/pdfkit?size=large-table&font=Helvetica"
  "$host/pdf/pdfmake?size=small"
  "$host/pdf/pdfmake?size=medium"
  "$host/pdf/pdfmake?size=large"
  "$host/pdf/pdfmake?size=small-table"
  "$host/pdf/pdfmake?size=medium-table"
  "$host/pdf/pdfmake?size=large-table"
  "$host/pdf/pdfmake?size=small&font=Helvetica"
  "$host/pdf/pdfmake?size=medium&font=Helvetica"
  "$host/pdf/pdfmake?size=large&font=Helvetica"
  "$host/pdf/pdfmake?size=small-table&font=Helvetica"
  "$host/pdf/pdfmake?size=medium-table&font=Helvetica"
  "$host/pdf/pdfmake?size=large-table&font=Helvetica"
  "$host/pdf/reactpdf?size=small"
  "$host/pdf/reactpdf?size=medium"
  "$host/pdf/reactpdf?size=large"
  "$host/pdf/reactpdf?size=small-table"
  "$host/pdf/reactpdf?size=medium-table"
  "$host/pdf/reactpdf?size=large-table"
  "$host/pdf/reactpdf?size=small&font=Helvetica"
  "$host/pdf/reactpdf?size=medium&font=Helvetica"
  "$host/pdf/reactpdf?size=large&font=Helvetica"
  "$host/pdf/reactpdf?size=small-table&font=Helvetica"
  "$host/pdf/reactpdf?size=medium-table&font=Helvetica"
  "$host/pdf/reactpdf?size=large-table&font=Helvetica"
  "$host/pdf/puppeteer?size=small"
  "$host/pdf/puppeteer?size=medium"
  "$host/pdf/puppeteer?size=large"
  "$host/pdf/puppeteer?size=small-table"
  "$host/pdf/puppeteer?size=medium-table"
  "$host/pdf/puppeteer?size=large-table"
  "$host/pdf/wkhtmltopdf?size=small"
  "$host/pdf/wkhtmltopdf?size=medium"
  "$host/pdf/wkhtmltopdf?size=large"
  "$host/pdf/wkhtmltopdf?size=small-table"
  "$host/pdf/wkhtmltopdf?size=medium-table"
  "$host/pdf/wkhtmltopdf?size=large-table"
)

echo "PDF Generation Test"
echo "===================="
printf "%-60s %-8s %-10s %-10s\n" "URL" "Status" "Time(ms)" "Size(KB)"
echo "--------------------------------------------------------------------------------------------"

for url in "${urls[@]}"; do
  result=$(curl -w "%{http_code}|%{time_total}|%{size_download}" \
                -s -o /dev/null \
                "$url" 2>/dev/null)
  short_url=${url#"$host"}

  if [[ $? -eq 0 ]]; then
    status=$(echo "$result" | cut -d'|' -f1)
    time_sec=$(echo "$result" | cut -d'|' -f2)
    size=$(echo "$result" | cut -d'|' -f3)
    time_ms=$(echo "scale=0; ($time_sec * 1000) / 1" | bc -l 2>/dev/null || echo "0")
    size_kb=$(echo "scale=1; $size / 1024" | bc -l 2>/dev/null || echo "0")
    printf "%-60s %-8s %-10s %-10s\n" "$short_url" "$status" "$time_ms" "$size_kb"
  else
    printf "%-60s %-8s %-10s %-10s\n" "$short_url" "ERROR" "0" "0"
  fi
done

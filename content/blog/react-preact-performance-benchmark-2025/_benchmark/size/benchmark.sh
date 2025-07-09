get_size() {
    wc -c | awk '{printf "%.2f KB", $1/1024}';
}

echo 'Bundle size:';
echo 'React: '$(bun build size/react.js --minify | get_size);
echo 'Preact: '$(bun build size/preact.js --minify | get_size);
echo '';

echo 'Bundle size (gzip):';
echo 'React: '$(bun build size/react.js --minify | gzip | get_size);
echo 'Preact: '$(bun build size/preact.js --minify | gzip | get_size);
echo '';
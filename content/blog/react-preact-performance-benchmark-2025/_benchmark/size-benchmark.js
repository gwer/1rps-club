const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Preact = require('preact');
const renderToString = require('preact-render-to-string');

function measureHtmlSize(html) {
  return {
    characters: html.length,
    bytes: Buffer.from(html).length,
    kb: Buffer.from(html).length / 1024
  };
}

const generateItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `This is the description for item ${i}. It contains some text to make it more realistic.`,
    isActive: i % 2 === 0,
    priority: Math.floor(Math.random() * 5),
    tags: Array.from({ length: 3 }, (_, j) => `tag-${j}-${i}`),
  }));
};

const smallData = generateItems(10);
const mediumData = generateItems(100);
const largeData = generateItems(1000);

const ReactSimpleComponent = () => {
  return React.createElement('div', { className: 'container' },
    React.createElement('h1', null, 'Hello, World!'),
    React.createElement('p', null, 'This is a simple React component')
  );
};

const PreactSimpleComponent = () => {
  return Preact.createElement('div', { className: 'container' },
    Preact.createElement('h1', null, 'Hello, World!'),
    Preact.createElement('p', null, 'This is a simple Preact component')
  );
};

console.log('HTML Size Comparison: React vs Preact\n');
console.log('| Test | React (KB) | Preact (KB) | Difference |');
console.log('|------|------------|-------------|------------|');

const reactSimpleHtml = ReactDOMServer.renderToString(React.createElement(ReactSimpleComponent));
const preactSimpleHtml = renderToString(Preact.createElement(PreactSimpleComponent));
const reactSimpleSize = measureHtmlSize(reactSimpleHtml);
const preactSimpleSize = measureHtmlSize(preactSimpleHtml);
console.log(`| Simple Component | ${reactSimpleSize.kb.toFixed(2)} | ${preactSimpleSize.kb.toFixed(2)} | ${((preactSimpleSize.kb - reactSimpleSize.kb) / reactSimpleSize.kb * 100).toFixed(2)}% |`);

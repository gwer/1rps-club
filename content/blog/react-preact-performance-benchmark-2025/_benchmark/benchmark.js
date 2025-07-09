const { Suite } = require('benchmark');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Preact = require('preact');
const renderToString = require('preact-render-to-string');

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

/**
 * Simple Components
 */
const ReactSimpleComponent = () => {
	return React.createElement(
		'div',
		{ className: 'container' },
		React.createElement('h1', null, 'Hello, World!'),
		React.createElement('p', null, 'This is a simple React component')
	);
};

const PreactSimpleComponent = () => {
	return Preact.createElement(
		'div',
		{ className: 'container' },
		Preact.createElement('h1', null, 'Hello, World!'),
		Preact.createElement('p', null, 'This is a simple Preact component')
	);
};

/**
 * Component with List
 */
const ReactListComponent = ({ items }) => {
	return React.createElement(
		'div',
		{ className: 'list-container' },
		React.createElement('h1', null, 'Item List'),
		React.createElement(
			'ul',
			null,
			items.map((item) =>
				React.createElement(
					'li',
					{ key: item.id },
					React.createElement('h2', null, item.title),
					React.createElement('p', null, item.description),
					React.createElement(
						'div',
						{ className: 'tags' },
						item.tags.map((tag) =>
							React.createElement('span', { key: tag, className: 'tag' }, tag)
						)
					),
					React.createElement(
						'div',
						{ className: item.isActive ? 'active' : 'inactive' },
						`Status: ${item.isActive ? 'Active' : 'Inactive'}`
					),
					React.createElement(
						'div',
						{ className: 'priority' },
						`Priority: ${item.priority}`
					)
				)
			)
		)
	);
};

const PreactListComponent = ({ items }) => {
	return Preact.createElement(
		'div',
		{ className: 'list-container' },
		Preact.createElement('h1', null, 'Item List'),
		Preact.createElement(
			'ul',
			null,
			items.map((item) =>
				Preact.createElement(
					'li',
					{ key: item.id },
					Preact.createElement('h2', null, item.title),
					Preact.createElement('p', null, item.description),
					Preact.createElement(
						'div',
						{ className: 'tags' },
						item.tags.map((tag) =>
							Preact.createElement('span', { key: tag, className: 'tag' }, tag)
						)
					),
					Preact.createElement(
						'div',
						{ className: item.isActive ? 'active' : 'inactive' },
						`Status: ${item.isActive ? 'Active' : 'Inactive'}`
					),
					Preact.createElement(
						'div',
						{ className: 'priority' },
						`Priority: ${item.priority}`
					)
				)
			)
		)
	);
};

/**
 * Nested Components
 */
const ReactNestedComponent = ({ depth = 5 }) => {
	if (depth <= 0) {
		return React.createElement('div', { className: 'leaf' }, 'Leaf Node');
	}

	return React.createElement(
		'div',
		{ className: 'nested' },
		React.createElement('h3', null, `Depth: ${depth}`),
		React.createElement(
			'div',
			{ className: 'children' },
			React.createElement(ReactNestedComponent, { depth: depth - 1 }),
			React.createElement(ReactNestedComponent, { depth: depth - 1 })
		)
	);
};

const PreactNestedComponent = ({ depth = 5 }) => {
	if (depth <= 0) {
		return Preact.createElement('div', { className: 'leaf' }, 'Leaf Node');
	}

	return Preact.createElement(
		'div',
		{ className: 'nested' },
		Preact.createElement('h3', null, `Depth: ${depth}`),
		Preact.createElement(
			'div',
			{ className: 'children' },
			Preact.createElement(PreactNestedComponent, { depth: depth - 1 }),
			Preact.createElement(PreactNestedComponent, { depth: depth - 1 })
		)
	);
};

/**
 * Benchmarking functions
 */
function benchmarkReactSimple() {
	return ReactDOMServer.renderToString(
		React.createElement(ReactSimpleComponent)
	);
}

function benchmarkPreactSimple() {
	return renderToString(Preact.createElement(PreactSimpleComponent));
}

function benchmarkReactSmallList() {
	return ReactDOMServer.renderToString(
		React.createElement(ReactListComponent, { items: smallData })
	);
}

function benchmarkPreactSmallList() {
	return renderToString(
		Preact.createElement(PreactListComponent, { items: smallData })
	);
}

function benchmarkReactMediumList() {
	return ReactDOMServer.renderToString(
		React.createElement(ReactListComponent, { items: mediumData })
	);
}

function benchmarkPreactMediumList() {
	return renderToString(
		Preact.createElement(PreactListComponent, { items: mediumData })
	);
}

function benchmarkReactLargeList() {
	return ReactDOMServer.renderToString(
		React.createElement(ReactListComponent, { items: largeData })
	);
}

function benchmarkPreactLargeList() {
	return renderToString(
		Preact.createElement(PreactListComponent, { items: largeData })
	);
}

function benchmarkReactNested() {
	return ReactDOMServer.renderToString(
		React.createElement(ReactNestedComponent, { depth: 5 })
	);
}

function benchmarkPreactNested() {
	return renderToString(
		Preact.createElement(PreactNestedComponent, { depth: 5 })
	);
}

console.log('Running benchmarks, this may take a while...');

new Suite()
	.add('React Simple', benchmarkReactSimple)
	.add('Preact Simple', benchmarkPreactSimple)
	.add('React Small List', benchmarkReactSmallList)
	.add('Preact Small List', benchmarkPreactSmallList)
	.add('React Medium List', benchmarkReactMediumList)
	.add('Preact Medium List', benchmarkPreactMediumList)
	.add('React Large List', benchmarkReactLargeList)
	.add('Preact Large List', benchmarkPreactLargeList)
	.add('React Nested', benchmarkReactNested)
	.add('Preact Nested', benchmarkPreactNested)
	.on('cycle', function (event) {
		console.log(String(event.target));
	})
	.run({ async: false });

export default function (eleventyConfig) {
	eleventyConfig.addShortcode('benchmark', function (data, title = '') {
		const values = Object.values(data);
		const max = Math.max(...values);

		let html = `<div class="benchmark">`;
		if (title) html += `<h4>${title}</h4>`;

		Object.entries(data).forEach(([name, value]) => {
			const percentage = (value / max) * 100;
			html += `
				<div class="benchmark__row">
					<span class="benchmark__library-name">${name}</span>
					<div class="benchmark__progress-container">
						<div class="benchmark__progress-bar" 
								 style="--width: ${percentage}%">
						</div>
					</div>
					<span class="benchmark__value-display">${Intl.NumberFormat().format(
						value
					)}</span>
				</div>`;
		});

		html += `</div>`;
		return html;
	});

	eleventyConfig.addShortcode('githubLink', (path, text) => {
		return `[${
			text || path
		}](https://github.com/gwer/1rps-club/tree/main/${path})`;
	});

	eleventyConfig.addShortcode('youtube', (videoURL, title) => {
		const url = new URL(videoURL);
		const id = url.searchParams.get('v');
		return `<iframe class="yt-shortcode" src="https://www.youtube.com/embed/${id}" title="${title}" frameborder="0" allowfullscreen></iframe>`;
	});
}

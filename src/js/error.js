const noResultsTemplate = message => ` 
	<div class="notification is-dark" id="no-results">
		 ${message}
	</div>
`;

const errorTemplate = (message, err) => `
	<div class="notification is-danger" id="no-results">
		<p>${message}</p>
		<p>${err}</p>
	</div>
`;

export const noResultsRenderDom = message => {
	const main = document.querySelector('main');
	main.innerHTML = noResultsTemplate(message);
};

export const errorRenderDom = (message, err) => {
	const main = document.querySelector('main');
	main.innerHTML = errorTemplate(message, err);
};
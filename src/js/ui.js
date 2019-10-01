export const toggleClass = (elemento, toggleClass) => {
	elemento.classList.toggle(toggleClass);
};

export const toggle = elemento => (removeClass, addClass) => {
	elemento.classList.remove(removeClass);
	elemento.classList.add(addClass);
};

const loader = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');

export const renderLoader = toggle(loader);
export const renderErrorMessage = toggle(errorMessage);


import { toggleClass } from './ui.js';
import { renderBeersDom } from './beers.js';
import { saveFilter } from './storage.js';

const navbarBurger = document.querySelector('.navbar-burger');
const searchInput = document.querySelector('#search');

Date.prototype.getMonthFormatted = function() {
	let month = this.getMonth() + 1;
	return month < 10 ? '0' + month : '' + month; 
};

navbarBurger.addEventListener('click', function () {
	const target = this.dataset.target;
	const elementTarget = document.getElementById(target);
	toggleClass(this, 'is-active');
	toggleClass(elementTarget, 'is-active');
	searchInput.focus();
});

const buttonSearch = document.querySelector('.button');
const formSearch = document.querySelector('#form-search');
const inputDate = document.querySelector('#search-date');

formSearch.addEventListener('submit', evt => {
	evt.preventDefault();
	buttonSearch.focus(); 
	saveFilter();
	if (inputDate.value.length !== 0) {
		const date = new Date(inputDate.value);
		const monthYear = `${date.getMonthFormatted()}/${date.getFullYear()}`;
		return renderBeersDom(searchInput.value, monthYear);
	}
	renderBeersDom(searchInput.value);
});


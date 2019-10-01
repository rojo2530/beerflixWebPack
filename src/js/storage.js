const inputSearch = document.querySelector('#search');
const inputDate = document.querySelector('#search-date');

const filters = {
	name: 'name',
	date: 'date'
};

export const saveFilter = () => {
	localStorage.setItem(filters.name, inputSearch.value);
	localStorage.setItem(filters.date, inputDate.value);
};

const restoreFilter = () => {
	inputSearch.value = localStorage.getItem('name');
	inputDate.value = localStorage.getItem('date');
};

restoreFilter();
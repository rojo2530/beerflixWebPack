import { toggleClass, renderLoader } from './ui.js';
import api from './api.js';
import { noResultsRenderDom, errorRenderDom } from './error.js';

const templateBeer = beer => `
	<div class="column is-one-quarter-desktop is-half-tablet">
		<div class="card">
		 <header class="card-header">
				<p class="card-header-title">
					${beer.name}
				</p>
				<a href="#" class="card-header-icon" aria-label="more options">
					<span class="icon">
						<i class="fa fa-angle-down" aria-hidden="true"></i>
					</span>
				</a>
			</header>
			<div class="card-content ${beer.isHidden ? 'is-hidden' : ''}">
				<div class="media">
					<div class="media-left">
						<figure class="image is-32x32">
							<img src="${beer.image}" alt="Placeholder image">
						</figure>
					</div>
					<div class="media-content">
						<p class="title is-4"></p>
						<p class="subtitle is-6">${beer.likes}
							<span class="icon">
								<i class="fa fa-thumbs-up"></i>
							</span>
						</p>
						<p class="has-text-justified">${beer.description.substring(0,50)} <a href="/detail/${beer.beerId}">...read more</a>.
					</div>
				</div>
				<div class="content ">
				<br>
				<time datetime="2016-1-1"><span class="has-text-grey">First Brewed: </span><span>${beer.firstBrewed}</span></time>
				</div>
			</div>
		</div>
</div>
`;

const renderBeers = (element, beers) => {
	const htmlBeers = beers.map((beer,index) => {
		if (index > 1) {
			return templateBeer({...beer, 'isHidden': true});
		}
		return templateBeer(beer);
	}).join('');
	element.innerHTML = `
		<div class="columns is-multiline cards-group">${htmlBeers}
		</div>`
	; 
	const headersIcons = document.querySelectorAll('.card-header-icon');
	headersIcons.forEach(headerIcon => {
		headerIcon.addEventListener('click', evt => {
			evt.preventDefault();
			const cardHeader = headerIcon.parentNode;
			const cardContent = cardHeader.nextElementSibling; //Seleccionamos al tio del header-icon
			toggleClass(cardContent, 'is-hidden');
		});
	});
};

const { getBeers, getAllBeers } = api();
const buttonSearch = document.querySelector('.button');

const renderBeersDom = async (text,date) => {
	try {
		const main = document.querySelector('main');
		//Ha rellenado fecha
		if (date) {
			buttonSearch.classList.add('is-loading');
			const beers = await getAllBeers(text);
			const beersFilter = beers.filter(beer => (
				beer.firstBrewed === date)
			);
			if (beersFilter.length === 0) {
				return noResultsRenderDom('No Results found!!!');
			}
			return renderBeers(main, beersFilter.slice(0,9));  //Del resultado total solo mostramos los 10 primeros
		}
		if (typeof(text)!= 'undefined') {
			buttonSearch.classList.add('is-loading');
			const beers = await getBeers(text);
			if (beers.length === 0) {
				return noResultsRenderDom('No Results found!!!');
			}
			return renderBeers(main, beers);
		}
		//Cuando cargamos el home	
		renderLoader('hide', 'show');
		const beers = await getBeers();
		renderBeers(main, beers);
	} catch (err) {
		errorRenderDom('Error fetching beers!!', err);
	}
	finally {
		buttonSearch.classList.remove('is-loading');
		renderLoader('show', 'hide');
		history.pushState({}, null, '/'); //Cuando busquemos se vaya al frontal si recargar la web
	}
};

export { renderBeersDom };


import api from './api.js';
import { renderLoader } from './ui.js';
import addLikesListener from './likes.js';
import { errorRenderDom } from './error.js';
import { addCommentListener, renderComments} from './comments.js';
import { renderAllIngredients } from './ingredients.js';

const detailTemplate = beer => `
	<div class="detail-container">
		<div class="detail-container-vertical">
			<div class="detail-wrapper">
				<div class="product-details">
					<div class="product-left">
						<div class="product-info">
							<div class="product-manufacturer"></div>
							<div class="product-title">
								${beer.name}
							</div>
							<div class="product-price" price-data="320.03">
								$${beer.price}<span class="product-price-cents"></span>
							</div>
						</div>
						<div class="product-image">
							<img src="${beer.image}"/>
						</div>
					</div>
					<div class="product-right">
						<div class="product-description">
							${beer.description}
						</div>
						<div class="product-available">
							Contributed By:  <span class="product-extended"><a href="#">${beer.contributedBy}</a></span>
						</div>
						<div class="product-rating">
							<a href="#" title="Like it" class="btn-counter button is-rounded is-danger">
								<span class="icon">
									<i class="fa fa-thumbs-up"></i>
								</span>
							</a>
							<span id="likes-counter" class="subtitle is-4">${beer.likes}</span>
							<div class="product-rating-details">Likes
								<span class="rating-count"></span>
							</div>
						</div>
					</div>
			<div class="product-bottom">
				<span class="subtitle is-4">Ingredients</span>
					<div id ="ingredients">
						<div class="list malt is-hoverable list-ingredients">
							<a class="list-item  is-active">
								Malt
							</a>
						</div>
						<div class="list hops is-hoverable list-ingredients">
							<a class="list-item is-active">
								Hopes
							</a>
						</div>
					</div>  
			<div class="product-bottom">
				<span class="subtitle is-4">Comments</span>
				<div class="comments-group">
				
				</div>
				<form id="quote-form" action="." class="quote-form" novalidate>
						<div class="container-input-quote">
							<input id="quote" placeholder="Add your comment" class="input is-primary" type="text" required>
						</div>
						<div class="error-message is-hidden" id="error-for-full-name">Please fill out this field.</div>
						<button type="submit" id="button-comment" class="button is-primary">Add comment</button>
				</form>
			</div>
		</div>
	</div>
	</div>
	</div>
	</div>
`;

const { getBeerId } = api();

const renderDetailDOM = async id => {
	try {
		renderLoader('hide', 'show');
		const main = document.querySelector('main');
		const beer = await getBeerId(id);
		main.innerHTML = detailTemplate(beer);
		const commentsGroup = document.querySelector('.comments-group');
		renderComments(commentsGroup, beer.comment);
		renderAllIngredients(beer);
		window.scrollTo(0, 0); //Nos ponemos arriba del todo, sobre todo es para tema movil
		addCommentListener(id);
		addLikesListener(id);
	} catch (err) {
		errorRenderDom('Error fetching beer!!', err);
	} finally {
		renderLoader('show', 'hide');
	}
};

export default renderDetailDOM;


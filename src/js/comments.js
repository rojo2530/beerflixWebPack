import api from './api.js';
import { errorRenderDom } from './error.js';
import { toggle } from './ui.js';

const { createBeerComment, getBeerId } = api();

export const addCommentListener = id => {
	const quoteForm = document.querySelector('#quote-form');
	const quote = document.querySelector('#quote');
	const buttonComment = document.querySelector('#button-comment');
	const commentsGroup = document.querySelector('.comments-group');
	const errorMessage = document.querySelector('.error-message');
	const renderErrorMessage = toggle(errorMessage);
	quoteForm.addEventListener('submit', async  evt => {
		evt.preventDefault();
		if (quote.validity.valid) {
			try {
				buttonComment.classList.add('is-loading');
				await createBeerComment(id, quote.value);
				const beer = await getBeerId(id);
				const comment  = beer.comment.pop();
				//Lo hacemos con el appendChild para no recargar toda la lista de comentarios
				commentsGroup.appendChild(createCommentNode(comment));
				buttonComment.classList.remove('is-loading');
			} catch (err) {
				errorRenderDom('Error posting a comment', err);
			}
		} else {
			renderErrorMessage('is-hidden', 'show');
		}
	});
	//Para quitar el mensaje de error si deja el input del comentario vacío
	quote.addEventListener('focus', () => {
		if (!errorMessage.classList.contains('is-hidden')) {
			renderErrorMessage('show', 'is-hidden');
		}
	});
};

export const commentTemplate = comment => `
	<div class="comment">
		<div class="card">
			<div class="card-content">
				<p class="title is-6">
					“${comment.comment}”
				</p>
				<p class="subtitle is-6">
					${new Date(comment.dateComment).toLocaleString()}
				</p>
			</div>
		</div>
	</div>  
`;

export const createCommentNode = comment => {
	const commentElement = document.createElement('div');
	commentElement.classList.add('comment');
	commentElement.innerHTML = `
		<div class="card">
			<div class="card-content">
				<p class="title is-6">
				“${comment.comment}”
				</p>
				<p class="subtitle is-6">
				${new Date(comment.dateComment).toLocaleString()}
				</p>
			</div>
		</div>
	`;
	return commentElement;
};

export const renderComments = (element,comments) => {
	//  Se debe a un bug de la api, ya que cuando no hay comentarios el campo se llama comments, pero cuando creas 
	// comentarios se crea un nuevo campo array en la api, llamado comment en singular, por tanto controlamos que no sea undefined
	if (comments) {
		const htmlComments = comments.map(comment => commentTemplate(comment)).join('');
		element.innerHTML = htmlComments;
		return;
	}
	element.innerHTML = '';
};
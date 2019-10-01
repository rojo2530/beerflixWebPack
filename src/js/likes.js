import api from './api.js';
import { errorRenderDom } from './error.js';

const { addBeerLike } = api();

const addLikesListener = id => {
	const btnCounter = document.querySelector('.btn-counter');
	const spanCounter = document.querySelector('#likes-counter');
	btnCounter.addEventListener('click', async evt => {
		try {
			evt.preventDefault();
			btnCounter.classList.add('is-loading');
			await addBeerLike(id);
			spanCounter.innerText++;
			//No uso el evt, aquí porque se puede hacer click en el span tb
		} catch (err) {
			errorRenderDom('Error to post a like', err);
		} finally {
			btnCounter.classList.remove('is-loading');
		}
	});
};

export default addLikesListener;
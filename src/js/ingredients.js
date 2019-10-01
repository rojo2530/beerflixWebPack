const ingredientTemplate = ingredient => `
	<a class="list-item">
		${ingredient.name} - ${ingredient.amount.value} ${ingredient.amount.unit}
	</a>
`;

const ingredientsRenderDom = (element, ingredients) => {
	const listIngredientsHtml = ingredients.map(ingredientTemplate).join('');
	element.innerHTML += listIngredientsHtml;
};

export const renderAllIngredients = beer => {
	const ingredientsMalt = document.querySelector('.malt');
	const ingredientsHops = document.querySelector('.hops');
	ingredientsRenderDom(ingredientsMalt, beer.ingredients.malt);
	ingredientsRenderDom(ingredientsHops, beer.ingredients.hops);
};

// recipes = getSavedRecipes()

document.querySelector('#addRecipe').addEventListener('click', (e) => {
    location.assign(`edit.html#${uuidv4()}`)
})

let renderRecipes = (recipes) => {
    recipes.forEach(recipe => {
        let recipeTitle = document.createElement('h2')
        recipeTitle.textContent = recipe.title 
        document.querySelector('#recipes-container').appendChild(recipeTitle)
    });
}

renderRecipes(recipes)
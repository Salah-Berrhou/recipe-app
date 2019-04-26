// recipes = getSavedRecipes()

let filter = {
    text: '',
}

document.querySelector('#addRecipe').addEventListener('click', (e) => {
    let recipeID = uuidv4()
    recipes.push({
    id: recipeID,
    title: '' ,
    description: '' ,
    ingrediant: [],
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    location.assign(`edit.html#${recipeID}`)
})

document.querySelector('#search-filter').addEventListener('input', (e) => {
    filter.text = e.target.value
    renderRecipes(recipes, filter)
})

let renderRecipes = (recipes, filter) => {
    let filterdResipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filter.text.toLowerCase())
    })
    document.querySelector('#recipes-container').innerHTML = ''
    filterdResipes.forEach(recipe => {
        let recipeBox = document.createElement('div')
        let recipeTitle = document.createElement('h2')
        recipeTitle.textContent = recipe.title 

        let recipeDescription = document.createElement('p')
        recipeDescription.textContent = `${recipe.description.slice(0, 160)} ...`
        
        recipeBox.appendChild(recipeTitle)
        recipeBox.appendChild(recipeDescription)
        document.querySelector('#recipes-container').appendChild(recipeBox)

        recipeBox.addEventListener('click', (e) => {
            location.assign(`edit.html#${recipe.id}`)
        })
    });
    console.log(recipes)
}

renderRecipes(recipes, filter)
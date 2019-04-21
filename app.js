'use strict'


document.querySelector('#save').addEventListener('click', (e) => {
    let recipeTitle = document.querySelector('#recipeTitle').value 
    let recipeDescription = document.querySelector('#recipeSteps').value 

    let recipe = recipes.find((recipe) =>{
        if(recipe.id === location.hash.substring(1)){
            return true
        }else{
            return false
        }
    })

    if(recipe){
        let index = recipes.findIndex((recipe) => {
            return recipe.id === location.hash.substring(1)
        })
        recipes[index].title = recipeTitle
        recipes[index].description = recipeDescription
    }else{
        recipes.push({
            id: location.hash.substring(1),
            title: recipeTitle !== null? recipeTitle: `Untitled`,
            description: recipeDescription,
            ingrediant: [],
        })
    }
    console.log(recipes)
    localStorage.setItem('recipes', JSON.stringify(recipes))
})

document.querySelector('#ingrediant-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let index = recipes.findIndex((recipe) => {
        return recipe.id === location.hash.substring(1)
    })
    recipes[index].ingrediant.push(e.target[0].value)
    e.target[0].value = ''
    console.log(recipes)
    ingrediantRender(recipes)
})

const ingrediantRender = (recipes) => {
    let index = recipes.findIndex((recipe) => {
        return recipe.id === location.hash.substring(1)
    })
    document.querySelector('#ingrediant-container').innerHTML = ''
    recipes[index].ingrediant.forEach(ingrediant => {
        let ingrediantName = document.createElement('p')
        ingrediantName.textContent = ingrediant
        document.querySelector('#ingrediant-container').appendChild(ingrediantName)
    });
}
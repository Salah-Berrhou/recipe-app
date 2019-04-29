'use strict'
// to get the id of the recipe we are editing so we will used it every time we need to edit anything
let recipeID = recipes.findIndex((recipe) => {
    return recipe.id === location.hash.substring(1)
})
// to get the values of the rcipe and show them in the edit panel
document.querySelector('#recipeTitle').value = recipes[recipeID].title
document.querySelector('#recipeSteps').value = recipes[recipeID].description

// save recipes in local storeg
document.querySelector('#save').addEventListener('click', (e) => {
    let recipeTitle = document.querySelector('#recipeTitle').value 
    let recipeDescription = document.querySelector('#recipeSteps').value 

    recipes[recipeID].title = recipeTitle !== '' ? recipeTitle : 'Untitled'
    recipes[recipeID].description = recipeDescription

    localStorage.setItem('recipes', JSON.stringify(recipes))
    console.log(recipes)
})
// adding ingrediant and rendering them
document.querySelector('#ingrediant-form').addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.target[0].value !== ''){
        recipes[recipeID].ingrediant.push({
            id: uuidv4(),
            title: e.target[0].value,
            completed: false,
        })
        e.target[0].value = ''
        ingrediantRender(recipes, recipeID)
        localStorage.setItem('recipes', JSON.stringify(recipes))
    }
})

// the building block of the ingrediant
const ingrediantRender = (recipes, recipeID) => {
    document.querySelector('#ingrediant-container').innerHTML = ''
    recipes[recipeID].ingrediant.forEach(ingrediant => {
        let ingrediantBox = document.createElement('div')
        let ingrediantCheacked = document.createElement('input')
        let ingrediantName = document.createElement('p')
        let ingrediantRemove = document.createElement('a')

        ingrediantCheacked.setAttribute('type', 'checkbox')
        ingrediantCheacked.checked = ingrediant.completed
        ingrediantBox.appendChild(ingrediantCheacked)
        ingrediantCheacked.addEventListener('change', (e) => {
            ingrediant.completed = e.target.checked
            if(ingrediant.completed){
                ingrediantName.classList.toggle('cheaked') 
            }else{
                ingrediantName.classList.remove('cheaked')
            }
            localStorage.setItem('recipes', JSON.stringify(recipes))
        })
        // TO ADD THE SLACH LINE OVER INGREDIANT IF IT COMPLETED EVREY TIME WE OPEN THE RECIPE PAGE I CAN'T PUT IT IN A FUNCTION ??
        if(ingrediant.completed){
            ingrediantName.classList.toggle('cheaked') 
        }else{
            ingrediantName.classList.remove('cheaked')
        }
        // REMOVING ONE INGREDIANT
        ingrediantRemove.textContent = 'Remove'
        ingrediantRemove.addEventListener('click', (e) => {
            removeIngrediant(ingrediant.id)
            ingrediantRender(recipes, recipeID)
            localStorage.setItem('recipes', JSON.stringify(recipes))

        })
        ingrediantName.textContent = ingrediant.title

        ingrediantBox.appendChild(ingrediantName)
        ingrediantBox.appendChild(ingrediantRemove)
        document.querySelector('#ingrediant-container').appendChild(ingrediantBox)
    });
}

// to remove the recipe
document.querySelector('#remove').addEventListener('click', function(e){
    recipes.splice(recipeID, 1)
    localStorage.setItem('recipes', JSON.stringify(recipes))
    location.assign('index.html')
})

const removeIngrediant = (id) => {
    let index = recipes[recipeID].ingrediant.findIndex((ingrediant) => ingrediant.id === id)
    recipes[recipeID].ingrediant.splice(index, 1)
}


ingrediantRender(recipes, recipeID)

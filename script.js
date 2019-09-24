const generateMealBtn = document.querySelector('#generateMeal');
const mealElem = document.querySelector('#meal');

generateMealBtn.addEventListener('click', () => {
    getMeal()
    .then(result => {
        // console.log(result);
        console.log(result.meals[0]);

        displayMealData(result.meals[0]);
    })
    .catch(err => {
        console.log(err);
    });
});

async function getMeal() {
    let apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    let response = await fetch(apiUrl);
    let data = await response.json();

    return data;
}

function displayMealData(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        else {
            break;
        }
    }

    const incredientsList = `
        <img src="${meal.strMealThumb}" alt="Meal Image">
        
        ${meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ''
        }
        
        ${meal.strArea 
            ? `<p><strong>Area:</strong> ${meal.strArea}</p>` 
            : ''
        }
        
        <h4>Ingredients:</h4>

        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>

        <h3>${meal.strMeal}</h3>
        <p>${meal.strInstructions}</p>
    `;

    mealElem.innerHTML = incredientsList;
}
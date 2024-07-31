function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if (i.className === "menu-nav") {
        i.className += " responsive";
    } else {
        i.className = "menu-nav";
    }
}

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " btn-1";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " btn-1";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

const searchBtn = document.getElementById('browse-btn');
const mealList = document.getElementById('food');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    const mealDetails = document.getElementById('food-details');
    mealDetails.classList.remove('showRecipe');
});

// Get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('input-browse').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="food-itm" data-id="${meal.idMeal}">
                            <div class="food-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="food-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="food-btn">View Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
}

// Get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('food-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}
// Display recipe details in a modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="meal image">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    const mealDetails = document.getElementById('food-details');
    const mealDetailsContent = document.getElementById('food-details-content');
    mealDetails.classList.add('showRecipe');
    mealDetailsContent.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#login form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch('login.php', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(data => alert(data));
    });

    document.querySelector("#register form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch('register.php', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(data => alert(data));
    });
});
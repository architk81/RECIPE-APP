const searchform = document.querySelector('form');
const searchdiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('.inputvalue');
let searchQuery = '';
const APP_ID = 'e99fb4b0';
const APP_KEY = '7e1052063857f645d9d007887d6070e6';
const base_url1 = `https://api.edamam.com/search?q=`;
const base_url2 = `&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;



// on clicking the search the button
buttonElement.onclick = function (event) {

    event.preventDefault();
    searchQuery = inputElement.value;
    console.log(searchQuery);

    // fetching the query
    const URL  = base_url1 + searchQuery + base_url2;
    fetch(URL).then((api_data) => {
        return api_data.json();
    })
        .then((actual_data) => {
            console.log(actual_data);
            generateHTML(actual_data.hits);
        })
        .catch((error) => {
            console.log(`Error is :- ${error}`);
        })

    inputElement.value = '';    
}

// generatet the HTML
function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
            `<div class="item">
               <img src="${result.recipe.image}" alt="">
               <div class="flex-container">
                 <h1 class="title">${result.recipe.label}</h1>
                 <a class = "view-btn" href="${result.recipe.url}" target="_blank">Recipe</a>
              </div>
              <p class="data">
                 Calories : ${Math.floor(result.recipe.calories)}
              </p>
              <p class="data2">
                 Diet Labels : ${result.recipe.dietLabels == '' ? 'NULL' : result.recipe.dietLabels}
              </p>
              <p class="data3">
                 Time Taken : ${result.recipe.totalTime == 0 ? 30 : result.recipe.totalTime } min
              </p>
            </div>`
    })

    searchdiv.innerHTML = generatedHTML;
}


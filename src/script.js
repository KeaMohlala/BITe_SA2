function createFilterListHTML() {
  return `
    <ul class="filter-list">
      <li>
        <span>Meal Type:</span>
        <select id="mealTypeFilter" multiple>
          <option value="">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Teatime">Teatime</option>
        </select>
      </li>
      <li>
        <span>Cuisine Type:</span>
        <select id="cuisineTypeFilter" multiple>
          <option value="">All</option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="British">British</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central Europe">Central Europe</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="French">French</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Kosher">Kosher</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="South American">South American</option>
          <option value="South East Asian">South East Asian</option>
        </select>
      </li>
      <li>
        <span>Diet:</span>
        <select id="dietFilter" multiple>
          <option value="">All</option>
          <option value="balanced">Balanced</option>
          <option value="high-fiber">High-Fiber</option>
          <option value="high-protein">High-Protein</option>
          <option value="low-fat">Low-Fat</option>
          <option value="low-carb">Low-Carb</option>
          <option value="low-sodium">Low-Sodium</option>
        </select>
      </li>
    </ul>
  `;
}

var resultsContainer = document.querySelector(".row");
var recipesButton = document.getElementById("moreRecipesButtonContainer");

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("ingredientForm");
  var input = document.getElementById("ingredientInput");
  var filter = document.querySelector(".filter-button");

  // Initialize the filters
  var mealTypeFilter, cuisineTypeFilter, dietFilter;

  function initializeFilters() {
    mealTypeFilter = document.getElementById("mealTypeFilter");
    cuisineTypeFilter = document.getElementById("cuisineTypeFilter");
    dietFilter = document.getElementById("dietFilter");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Ensure filters are initialized
    initializeFilters();

    var ingredients = input.value
      .toLowerCase()
      .trim()
      .split(",")
      .map((i) => i.trim()); // Assuming ingredients are comma-separated

    if (!mealTypeFilter || !cuisineTypeFilter || !dietFilter) {
      resultsContainer.innerHTML = `<h4>Please Apply Filters Before Submitting</h4>`;
      return;
    }

    // Dynamically capture the currently selected filter values
    var selectedMealType = Array.from(mealTypeFilter.selectedOptions).map(
      (option) => option.value
    );
    var selectedCuisineType = Array.from(cuisineTypeFilter.selectedOptions).map(
      (option) => option.value
    );
    var selectedDiet = Array.from(dietFilter.selectedOptions).map(
      (option) => option.value
    );

    if (ingredients.length > 0) {
      fetchRecipes(
        ingredients.join(),
        selectedMealType,
        selectedCuisineType,
        selectedDiet
      );
    } else {
      resultsContainer.innerHTML = `<h4>Please Enter Ingredients</h4>`;
    }
    //input.value = ""; // Clear the input field
  });

  filter.addEventListener("click", function () {
    document.querySelector(".filters").innerHTML = createFilterListHTML();
    initializeFilters(); // Initialize the filters after creating the filter list
  });
});

function fetchNextPage(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Process and display recipes
      data.hits.forEach((hit) => {
        var recipeCard = document.createElement("div");
        recipeCard.className = "col-md-6 card";

        var recipeImage = document.createElement("img");
        recipeImage.src = hit.recipe.image;
        recipeImage.alt = hit.recipe.label;

        var recipeTitle = document.createElement("h5");
        recipeTitle.className = "recipe-title";
        recipeTitle.textContent = hit.recipe.label;

        var recipeTime = document.createElement("p");
        recipeTime.className = "recipe-time";
        recipeTime.textContent = `Cooking Time: ${hit.recipe.totalTime} minutes`;

        var recipeLink = document.createElement("a");
        recipeLink.className = "recipe-link";
        recipeLink.href = hit.recipe.url;
        recipeLink.target = "_blank";
        recipeLink.textContent = "Full Recipe";

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeTime);
        recipeCard.appendChild(recipeLink);

        resultsContainer.appendChild(recipeCard);
      });
      var nextpageButton = document.createElement("button");
      nextpageButton.className = "button-nextpage";
      nextpageButton.textContent = "More Recipes";
      nextpageButton.onclick = function () {
        fetchNextPage(data._links.next.href);
      };
      recipesButton.innerHTML = "";
      recipesButton.appendChild(nextpageButton);
      if (data._links.next.href) {
        nextpageButton.style.display = "block";
      } else {
        nextpageButton.style.display = "none";
      }
    })
    .catch((error) => console.error("Error fetching next page:", error));
}

function fetchPage(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Process and display recipes
      data.hits.forEach((hit) => {
        var recipeCard = document.createElement("div");
        recipeCard.className = "col-md-6 card";

        var recipeImage = document.createElement("img");
        recipeImage.src = hit.recipe.image;
        recipeImage.alt = hit.recipe.label;

        var recipeTitle = document.createElement("h5");
        recipeTitle.className = "recipe-title";
        recipeTitle.textContent = hit.recipe.label;

        var recipeTime = document.createElement("p");
        recipeTime.className = "recipe-time";
        recipeTime.textContent = `Cooking Time: ${hit.recipe.totalTime} minutes`;

        var recipeLink = document.createElement("a");
        recipeLink.href = hit.recipe.url;
        recipeLink.target = "_blank";
        recipeLink.textContent = "Full Recipe";

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeTime);
        recipeCard.appendChild(recipeLink);

        resultsContainer.appendChild(recipeCard);
      });
    })
    .catch((error) => console.error("Error fetching page:", error));
}

function fetchRecipes(query, mealType, cuisineType, diet) {
  var appId = "21ae8994";
  var appKey = "7578b2b129cbd412347cd9e03a326232";
  let typeMeal = mealType
    .map(function (meal) {
      return meal ? `&mealType=${meal}` : "";
    })
    .join("");

  // Construct the query string for cuisineType
  let typeCuisine = cuisineType
    .map(function (cuisine) {
      return cuisine ? `&cuisineType=${cuisine}` : "";
    })
    .join("");

  // Construct the query string for diet
  let typeDiet = diet
    .map(function (d) {
      return d ? `&diet=${d}` : "";
    })
    .join("");

  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
    query
  )}${typeMeal}${typeCuisine}${typeDiet}&app_id=${appId}&app_key=${appKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = ""; // Clear previous results
      if (data.hits.length === 0) {
        // No recipes found, set a message
        resultsContainer.innerHTML =
          "<h4>No recipes found matching your criteria.</h4>";
      } else {
        var recipeCount = data.count;
        resultsContainer.innerHTML = `<h4> ${recipeCount} Recipes Found </h4>`;
        if (data._links.next) {
          fetchNextPage(data._links.next.href);
        } else {
          fetchPage(url);
        }
      }
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}

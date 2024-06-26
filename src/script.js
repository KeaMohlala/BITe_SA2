document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("ingredientForm");
  var input = document.getElementById("ingredientInput");
  var resultsContainer = document.querySelector(".row");
  var mealTypeFilter = document.getElementById("mealTypeFilter");
  var cuisineTypeFilter = document.getElementById("cuisineTypeFilter");
  var dietFilter = document.getElementById("dietFilter");
  var recipesButton = document.getElementById("moreRecipesButtonContainer");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    var ingredients = input.value
      .toLowerCase()
      .trim()
      .split(",")
      .map((i) => i.trim()); // Assuming ingredients are comma-separated

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
      alert("Please enter ingredients.");
    }
    //input.value = ""; // Clear the input field
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
});

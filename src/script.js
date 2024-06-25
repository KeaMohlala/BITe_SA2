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
    if (ingredients.length > 0) {
      // Capture the currently selected filter values
      var mealType = mealTypeFilter.value;
      var cuisineType = cuisineTypeFilter.value;
      var diet = dietFilter.value;
      fetchRecipes(ingredients.join(), mealType, cuisineType, diet);
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
    var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
      query
    )}${mealType ? `&mealType=${mealType}` : ""}${
      cuisineType ? `&cuisineType=${cuisineType}` : ""
    }${diet ? `&diet=${diet}` : ""}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = ""; // Clear previous results
        if (data.hits.length === 0) {
          // No recipes found, set a message
          resultsContainer.innerHTML =
            "<h5>No recipes found matching your criteria.</h5>";
        } else {
          var recipeCount = data.count;
          resultsContainer.innerHTML = `<h5> ${recipeCount} Recipes Found </h5>`;
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

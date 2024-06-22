var offcanvasElementList = [].slice.call(
  document.querySelectorAll(".offcanvas")
);
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new bootstrap.Offcanvas(offcanvasEl);
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("ingredientForm");
  var input = document.getElementById("ingredientInput");
  var resultsContainer = document.querySelector(".row");
  var applyFiltersBtn = document.getElementById("applyFilters");

  var filters = {
    mealType: "",
    cuisineType: "",
    diet: "",
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    var ingredients = input.value
      .toLowerCase()
      .trim()
      .split(",")
      .map((i) => i.trim()); // Assuming ingredients are comma-separated
    if (ingredients.length > 0) {
      fetchRecipes(ingredients.join());
    } else {
      alert("Please enter ingredients.");
    }
    input.value = ""; // Clear the input field
  });

  applyFiltersBtn.addEventListener("click", function () {
    filters.mealType = document.getElementById("mealType").value;
    filters.cuisineType = document.getElementById("cuisineType").value;
    filters.diet = document.getElementById("diet").value;
    fetchRecipes();
    var offcanvasElement = document.querySelector("#filterMenu");
    var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance.hide();
  });

  function fetchRecipes(query = "") {
    var appId = "21ae8994";
    var appKey = "7578b2b129cbd412347cd9e03a326232";
    var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
      query
    )}&app_id=${appId}&app_key=${appKey}%09&imageSize=THUMBNAIL`;

    if (filters.mealType) {
      url += `&mealType=${filters.mealType}`;
    }

    if (filters.cuisineType) {
      url += `&cuisineType=${filters.cuisineType}`;
    }

    if (filters.diet) {
      url += `&diet=${filters.diet}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = ""; // Clear previous results
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
      .catch((error) => console.error("Error fetching recipes:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("ingredientForm");
  var input = document.getElementById("ingredientInput");
  var resultsDiv = document.getElementById("results");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    var ingredients = input.value
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

  function fetchRecipes(query) {
    var appId = "21ae8994";
    var appKey = "7578b2b129cbd412347cd9e03a326232";
    var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
      query
    )}&app_id=${appId}&app_key=${appKey}%09&imageSize=THUMBNAIL`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resultsDiv.innerHTML = ""; // Clear previous results
        data.hits.forEach((hit) => {
          var resultElement = document.createElement("div");
          resultElement.textContent = hit.recipe.label; // Display recipe label
          resultsDiv.appendChild(resultElement);
        });
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }
});

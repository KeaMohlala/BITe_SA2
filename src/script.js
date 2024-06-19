document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("ingredientForm");
  var input = document.getElementById("ingredientInput");
  var resultsDiv = document.getElementById("results");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    var ingredient = input.value.trim(); // Get the trimmed input value
    if (ingredient) {
      // Check if the input is not empty
      resultsDiv.innerHTML += `<p>${ingredient}</p>`; // Display the input value
      input.value = ""; // Clear the input field
    } else {
      alert("Please enter an ingredient.");
    }
  });
});

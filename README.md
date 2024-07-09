BITe SA
-------------------------------------------------------------------------

BITe SA is an ingredient based recipe finding web application that allows users to filter recipes based on their dietary preferences. 

What inspired me to create BITe SA was a challenge I encountered one evening - what to cook for my family with the ingredients already in my fridge. 
At its core BITe SA addresses a common yet overlooked hurdle in home cooking - making the most of what we already have in our fridges and pantries. 

Deployed site: https://bitesa.netlify.app/

Author: Keamogetse Mohlala (https://www.linkedin.com/in/keamogetse-mohlala/)

Usage:
Using BITe_SA is straightforward! Simply enter the name of an ingredient you'd like to cook with, select your preferred meal type, cuisine, and dietary restrictions, and click Submit. 
BITe_SA will then display a selection of recipes that match your criteria. You can also browse through more recipes by clicking the More Recipes" button.

Contributing:
We welcome contributions from the community! If you have ideas for new features, bug reports, or just want to say hi, feel free to reach out. 
To contribute, fork the repository, make your changes, and submit a pull request.

Related Projects:
Check out these other exciting projects related to food and technology: Recipe Finder, MyFridgeFood


Algorithm Details
-----------------------------------------------------------------------
At the heart of BITe_SA lies a sophisticated algorithm designed to fetch, filter, and display recipes based on user input. 
This algorithm leverages the Edamam API, a powerful resource for accessing a vast database of recipes.
- Fetching Recipes
  -  The algorithm begins by constructing a URL with query parameters derived from user input. These parameters include the search query (ingredients), meal type, cuisine type, and dietary restrictions.
     This URL is then used to send a GET request to the Edamam API.

- Filtering Recipes
  - The filtering process is seamlessly integrated into the fetching mechanism.
    By adjusting the query parameters in the API request, the algorithm ensures that only recipes matching the user's criteria are returned.
    This eliminates the need for a separate filtering step, streamlining the process.

- Displaying Recipes
  - Once the recipes are fetched, the algorithm dynamically generates HTML elements for each recipe and appends them to the results container.
    This includes displaying an image, title, cooking time, and a link to the full recipe.
    Additional recipes can be loaded by clicking the "More Recipes" button, which triggers another API request for the next set of recipes.

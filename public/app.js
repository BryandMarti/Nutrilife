document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const recipeSearchForm = document.getElementById('recipeSearchForm');
  const recipeResults = document.getElementById('recipeResults');
  const carousel = recipeResults.querySelector('.carousel');

  // Event listener for recipe search form submission
  if (recipeSearchForm) {
    recipeSearchForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      const searchParams = new URLSearchParams(formData).toString();

      try {
        const response = await fetch(`/search-recipes?${searchParams}`);
        const data = await response.json();

        // Clear previous results
        carousel.innerHTML = '';

        data.results.slice(0, 2).forEach(async (recipe) => {
          const recipeElement = document.createElement('div');
          recipeElement.className = 'recipe-item';

          // Create a temporary element to manipulate the summary HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = recipe.summary;

          // Find all <a> tags within the summary and add target="_blank"
          const links = tempDiv.querySelectorAll('a');
          links.forEach(link => {
            link.setAttribute('target', '_blank');
          });

          recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img class="recipeImg" src="${recipe.image}" alt="${recipe.title}">
            <p>${tempDiv.innerHTML}</p>
            <h4>Ingredients:</h4>
            <ul class="ingredientsUl">
              ${(recipe.ingredients || []).map(ingredient => `
                <li>${ingredient.amount} ${ingredient.unit} of ${ingredient.name}</li>
              `).join('')}
            </ul>
          `;

          try {
            // Fetch recipe instructions
            const instructionsResponse = await fetch(`/recipe-instructions/${recipe.id}`);
            const instructionsData = await instructionsResponse.json();

            if (instructionsData.length > 0) {
              const instructionsElement = document.createElement('div');
              instructionsElement.innerHTML = `
                <h4>Instructions:</h4>
                <ol>
                  ${instructionsData.map(step => `
                    <li>
                      <p>${step.step}</p>
                      <ul>
                        ${step.ingredients.map(ingredient => `
                          <li>
                            <img src="${ingredient.image}" alt="${ingredient.name}">
                            ${ingredient.name}
                          </li>
                        `).join('')}
                      </ul>
                    </li>
                  `).join('')}
                </ol>
              `;
              recipeElement.appendChild(instructionsElement);
            }
          } catch (error) {
            console.error('Error fetching recipe instructions:', error);
          }

          carousel.appendChild(recipeElement);
        });

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    });
  }
});

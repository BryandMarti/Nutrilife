document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const recipeSearchForm = document.getElementById('recipeSearchForm');
  const recipeResults = document.getElementById('recipeResults');
  const carousel = recipeResults.querySelector('.carousel');
  const chatbotHeader = document.getElementById('chatbot-header');
  const chatbotBody = document.getElementById('chatbot-body');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const subscribeBtn = document.getElementById('subscribe-btn');
  const subscribeForm = document.getElementById('subscribe-form');
  const closeBtn = document.getElementById('close-btn');
  const overlay = document.getElementById('overlay');
  const subscribeSubmitBtn = document.getElementById('subscribe-submit');

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

        // Display recipe results
        data.results.forEach(async (recipe) => {
          const recipeElement = document.createElement('div');
          recipeElement.className = 'recipe-item';
          recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${recipe.summary}</p>
            <h4>Ingredients:</h4>
            <ul>
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
                            <img src="${ingredient.image}" alt="${ingredient.name}" width="50">
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
        
        let currentIndex = 0;
        const totalRecipes = carousel.children.length;
        const updateCarousel = () => {
          carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
        };

        const leftArrow = recipeResults.querySelector('.carousel-arrow.left');
        const rightArrow = recipeResults.querySelector('.carousel-arrow.right');

        rightArrow.addEventListener('click', () => {
          if (currentIndex < totalRecipes - 1) {
            currentIndex++;
            updateCarousel();
          }
        });

        leftArrow.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
          }
        });

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    });
  }

  // Event listener for chatbot header toggle
  if (chatbotHeader) {
    chatbotHeader.addEventListener('click', () => {
      toggleChatbotBody();
    });
  }

  // Event listener for chatbot input keypress
  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', async function(event) {
      if (event.key === 'Enter') {
        const message = chatbotInput.value.trim();
        if (message) {
          displayMessage('You', message);
          chatbotInput.value = '';

          try {
            const response = await axios.get('/chat', {
              params: { text: message }
            });
            displayMessage('Bot', response.data.answerText, response.data.media);
          } catch (error) {
            console.error('Error fetching chatbot response:', error);
          }
        }
      }
    });
  }

  // Event listener for subscribe button
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      showSubscribeForm();
    });
  }

  // Event listener for close button on subscribe form
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hideSubscribeForm();
    });
  }

  // Event listener for overlay click to close subscribe form
  if (overlay) {
    overlay.addEventListener('click', () => {
      hideSubscribeForm();
    });
  }

  // Event listener for subscribe form submission
  if (subscribeSubmitBtn) {
    subscribeSubmitBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission
      console.log('Subscribe button clicked');
      // Add logic for form submission (e.g., send email)
    });
  }

  function toggleChatbotBody() {
    chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
  }

  function displayMessage(sender, message, media = null) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatbotMessages.appendChild(messageElement);

    if (media && Array.isArray(media)) {
      media.forEach(item => {
        const title = item.title || 'No title';
        const image = item.image || '';
        const link = item.link || '#';

        const mediaElement = document.createElement('div');
        mediaElement.innerHTML = `
          <h4>${title}</h4>
          <img src="${image}" alt="${title}" style="max-width: 100%;">
          <p><a href="${link}" target="_blank">View Recipe</a></p>
        `;
        chatbotMessages.appendChild(mediaElement);
      });
    }

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showSubscribeForm() {
    subscribeForm.style.display = 'block';
    overlay.style.display = 'block';
  }

  function hideSubscribeForm() {
    subscribeForm.style.display = 'none';
    overlay.style.display = 'none';
  }
});

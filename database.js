const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

// Configure Handlebars
app.set('views', path.join(__dirname, 'views'));

// Database connection setup
const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5717815',
  port: 3306,
  password: 'Vw3E5gnnnF',
  database: 'sql5717815'
});

// Serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  connection.query('INSERT INTO subscriptions (email) VALUES (?)', [email], function (err, results) {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    console.log('Query results:', results);
    res.send('Subscription successful');
  });
});


// API route for recipe search
app.get('/search-recipes', async (req, res) => {
  const { query, diet, intolerances, includeIngredients, excludeIngredients, maxReadyTime } = req.query;

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
      query,
      diet,
      intolerances,
      includeIngredients,
      excludeIngredients,
      maxReadyTime,
      instructionsRequired: 'true',
      fillIngredients: 'true',
      addRecipeInformation: 'true',
      addRecipeInstructions: 'true',
      addRecipeNutrition: 'true',
      ignorePantry: 'false',
      sort: 'max-used-ingredients',
      offset: '0',
      number: '2'
    },
    headers: {
      'x-rapidapi-key': '1fbb6bafc4msh07902fb84e5a92ep1b86b1jsne8f63e4210e5',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    // Include instructions and steps in the response
    const recipes = response.data.results.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,
        ingredients: recipe.extendedIngredients.map(ingredient => ({
          name: ingredient.name,
          amount: ingredient.measures.us.amount,
          unit: ingredient.measures.us.unitShort
        }))
      };
    });
    res.json({ results: recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'An error occurred while searching recipes.' });
  }
});


app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/meal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'meal.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});
app.get('/resources', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resources.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = connection;

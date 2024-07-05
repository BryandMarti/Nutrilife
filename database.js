const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const axios = require("axios")
const publicDir = path.join(__dirname, 'public');

app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.use(express.static(publicDir));


const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5717815',
  port: 3306,
  password: 'Vw3E5gnnnF',
  database: 'sql5717815'
});

const PORT = 3000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','home.html'))
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'public','about.html'))
});

app.get('/meal', (req, res) => {
    res.sendFile(path.join(__dirname,'public','meal.html'))
});

app.get('/contact',(req,res)=>{
      res.sendFile(path.join(__dirname,'public','form.html'))
}) 


connection.connect(function(err) {
  if (err) throw err;
  console.log('Connection Successful');
});
 
app.post("/form", async (req, res) => {
const firstname= req.body.firstname;
console.log(firstname);
const lastname= req.body.lastname;
console.log(lastname);
const email= req.body.email;
console.log(email);
const subject= req.body.subject;
console.log(subject);





/////////////////////////////////////////////////
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
      number: '5'
    },
    headers: {
      'x-rapidapi-key': '1fbb6bafc4msh07902fb84e5a92ep1b86b1jsne8f63e4210e5',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    const recipes = response.data.results.map(recipe => {
      return {
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,

        ingredients: recipe.extendedIngredients.map(ingredient => ({
          name: ingredient.name,
          amount: ingredient.measures.us.amount,
          unit: ingredient.measures.us.unitShort
        })),
      };
    });

    res.json({ results: recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'An error occurred while searching recipes.' });
  }
});

app.get('/recipe-instructions/:id', async (req, res) => {
  const { id } = req.params;

  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/analyzedInstructions`,
    params: {
      stepBreakdown: 'true'
    },
    headers: {
      'x-rapidapi-key': '1fbb6bafc4msh07902fb84e5a92ep1b86b1jsne8f63e4210e5',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const instructions = response.data[0];

    const instructionsData = instructions
      ? instructions.steps.map(step => ({
          number: step.number,
          step: step.step,
          ingredients: step.ingredients.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
            image: ingredient.image
          }))
        }))
      : [];

    res.json(instructionsData);
  } catch (error) {
    console.error('Error fetching recipe instructions:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipe instructions.' });
  }
});
///////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.render('index');
});

const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5717815',
  port: 3306,
  password: 'Vw3E5gnnnF',
  database: 'sql5717815'
});
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'password',
//     database: 'mydb'
// })

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connection Successful');
});

  let userInput 
app.post("/subscribe", async (req, res) => {  
    const email = req.body.email;

  // Performs my query
  connection.query(`INSERT INTO subscription(user_email) VALUES ('${email}')`, function(err, results, fields) {
    if (err) {
      console.error('Error querying the database:', err.stack);
      return;
    }
    console.log('Query results:', results);

    connection.end(function(err) {
      if (err) {
        console.error('Error closing the connection:', err.stack);
        return;
      }
      console.log('Connection closed.');
    });
  });
});



///////////////////////////////////////////////////////////
  connection.query(`INSERT INTO Form (first_Name, last_Name, email, subject) VALUES ('${firstname}'), ('${lastname}'),('${email}'),('${subject}')`,
  function (err, results) {
    console.log(results);
  }
);
    console.log('Query results:');
    connection.end(function(err) {
      if (err) {
        console.error('Error closing the connection:', err.stack);
        return;
      }
      console.log('Connection closed.');
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const axios = require("axios")

// Set the path to the public directory
const publicDir = path.join(__dirname, 'public');
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.use(express.static(publicDir));

// Set the view engine to Handlebars (hbs)
// app.set('view engine', 'hbs');

// Set the path to the views directory
// app.set('views', path.join(__dirname, 'views'));

const port = 7000;

// Route for rendering the index page
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



app.listen(port, () => {
  console.log('We are on port:', port);
});

module.exports = connection;





// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'mydb'
// });
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('Connection Successful');
//     // Performs my query
//     connection.query("SELECT * FROM mydb.user_info", function(err, results, fields) {
//         if (err) {
//             console.error('Error querying the database:', err.stack);
//             return;
//         }
//         console.log('Query results:', results);
      
//         connection.end(function(err) {
//             if (err) {
//                 console.error('Error closing the connection:', err.stack);
//                 return;
//             }
//             console.log('Connection closed.');
//         });
//     });
// });
// module.exports = connection;
// app.post("/subscribe", (req, res) => {    
//     const {  email} = req.body
//     console.log (email)
// })

// app.listen(port,()=>{
//     console.log('We are on port:',port)
// })




//create an index file for the inout fields, and index.js
//have a script tag in the htl to link the index.js
//In index.js have an eventlistener that gets the value, store them to variable username and password
//Move lines 14 through 29 in a function and call that function in index.js
//it will need to return true if the information exists in the database and throw an error if it doesn't exist
//based on what the function returnd, whether true route to a welcome page and if incorrect send an error message.
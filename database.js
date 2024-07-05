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
    res.sendFile(path.join(__dirname,'public','about.html'))
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
  console.log('We are on PORT:', PORT);
});

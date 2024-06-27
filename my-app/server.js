const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3001;
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./authdb');
require('dotenv').config();
const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));


app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedpword = await bcrypt.hash(password,10);
  const query = "INSERT INTO users (email, password) VALUES ($1, $2)"
  try{
    await db.query(query, [email,hashedpword]);
    res.status(201).json({message: 'Successfully registered'});
  }
  catch (err){
    res.status(500).json({message: 'Unsucessful Registration; Try again'});
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = $1';
  
  try{
    const result = await db.query(query,[email]);
    const user = result.rows[0];
    if(user && await bcrypt.compare(password,user.password)){
      req.session.userId = user.id;
      res.status(200).json({ message: 'Login successful', redirectTo: '/problems' });
    }
    else{
      res.status(400).json({message: 'Invalid password'});
    }

  }
  catch (err){
    res.status(500).json({message: 'Login unsuccessful'}); 
  }
});


const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({message: 'Unauthorized'});
};

app.get('/problems', isAuthenticated, (req, res) => {
  res.status(200).json({message: 'Welcome to the problems'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


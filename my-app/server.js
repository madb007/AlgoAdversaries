const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./authdb');
//require('dotenv').config();
const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));


app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (email, password) VALUES ($1, $2)';

    await db.query(query, [email, hashedPassword]);

    res.status(201).json({ message: 'Successfully registered' });
  } catch (err) {
    console.error('Registration error:', err);

    // Check if the error is a duplicate key error (e.g., email already exists)
    if (err.code === '23505') { // PostgreSQL unique_violation error code
      return res.status(409).json({ message: 'Email already exists' });
    }

    // For other errors, send a generic error response
    res.status(500).json({ message: 'Unsuccessful registration; Try again' });
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


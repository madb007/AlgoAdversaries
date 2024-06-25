const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login Data:', { email, password });
  // Server logic here
  res.status(200).json({ message: 'Login successful' });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  // Server logic here
  res.status(201).json({ message: 'Registration successful' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
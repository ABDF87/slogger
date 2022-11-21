require('dotenv').config();
const express = require('express');
const app = express();

const fs = require("fs")
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');

connectDB();


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

// app.use('/', require('./routes/root'))


app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/projects', require('./routes/api/projects'));
app.use('/tasks', require('./routes/api/tasks'));
app.use('/details', require('./routes/api/details'));
app.use('/all', require('./routes/api/tasks'));
app.use('/all', require('./routes/api/details'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});



mongoose.connection.once('open', () => {
  console.log('Connected to Mango DB');
  app.listen(PORT, () => {
    console.log(`Server is startiing on port ${PORT}`);
  });
});

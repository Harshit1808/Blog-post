// server.js
const dotenv = require("dotenv")
const express = require('express');
const connectDB = require('./db/conn');
const routes = require('./router/routes');

//const authenticate = require('./middleware/authentication');
dotenv.config({path: './.env' });
const app = express();
const port = process.env.PORT;

app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


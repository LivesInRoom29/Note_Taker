// Dependencies
const express = require('express');
const router = require('./routes/routes');

// Sets up Express app and port
const app = express();
const PORT = process.env.PORT || 4001;

// Sets up express app to handle data parsing (applies middleware)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// To access static files in the public folder
app.use(express.static('public'));
app.use(router); //middleware

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up Express app and port
const app = express();
const PORT = process.env.PORT || 4000;

// Sets up express app to handle data parsing (applies middleware)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    // return index.html file
    res.sendFile(path.join(__dirname, "public/index.html"));
    console.log("sent index")
});

app.get('/notes', (req, res) => {
    // return notes.html file
    console.log("sent notes.html");
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


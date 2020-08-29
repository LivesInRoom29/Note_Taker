// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const routes = require('./routes');
const db = require('./db/db.json');

// Sets up Express app and port
const app = express();
const PORT = process.env.PORT || 4001;

// Sets up express app to handle data parsing (applies middleware)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// To access static files in the public folder
app.use(express.static('public'));

// ___________Routes ___________
app.get('/', (req, res) => {
    // return index.html file
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/notes', (req, res) => {
    // return notes.html file
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get('/api/notes', (req, res) => {
    // read db.json file and return all saved notes as JSON
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        return res.send(data);
    });

});

// recieves a new note to save on the request body, add it to the db.json file and return the new note to the client
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // Need to add a unique id number to each note when it is saved.
    req.body.id = uuidv4();

    db.push(req.body);

    fs.writeFile('./db/db.json', JSON.stringify(db), {encoding: 'utf8'}, (err) => {
        if (err) throw err;
    });

    res.send("success!");

});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

module.exports = routes;
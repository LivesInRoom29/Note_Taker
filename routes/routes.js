const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');

const router = express.Router();

// ___________Routes ___________
router.get('/', (req, res) => {
    // return index.html file
    res.sendFile("./public/index.html");
});
// ------------------
// Why did this one not work like the one above?
router.get('/notes', (req, res) => {
    // return notes.html file
    console.log(path.resolve(__dirname, "./../public"));
    res.sendFile("/notes.html", { root: path.resolve(__dirname, "./../public") });
});

router.get('/api/notes', (req, res) => {
    // read db.json file and return all saved notes as JSON
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        return res.send(data);
    });
});

// recieves a new note to save on the request body, add it to the db.json file and return the new note to the client
router.post('/api/notes', (req, res) => {
    // Add a unique id number to each note when it is saved.
    req.body.id = uuidv4();
    // Push the new object from the req (+id) to db
    db.push(req.body);

    fs.writeFile('./db/db.json', JSON.stringify(db), {encoding: 'utf8'}, (err) => {
        if (err) throw err;
    });

    res.send("success!");
});

module.exports = router;
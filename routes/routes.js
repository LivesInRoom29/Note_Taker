const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');

const router = express.Router();

// ___________Routes ___________
router.get('/', (req, res) => {
    // return index.html file
    res.sendFile("./public/index.html");
});

router.get('/notes', (req, res) => {
    // return notes.html file
    res.sendFile("./public/notes.html");
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

module.exports = router;
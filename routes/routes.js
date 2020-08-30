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

    res.send('Success!');
});

// delete a note by id#
router.delete('/api/notes/:id', (req, res) => {
    // Check to make sure the note with the ID exists in the db array
    // found will be true it is does exist
    const found = db.some(note => note.id === req.params.id);

    if (found) {
        res.json({
            msg: 'Note deleted',
            db: db.filter(note => note.id !== req.params.id)
        });
    } else {
        // if there's not note with that id,
        res.status(400).json({ msg: `No note with the ID of ${req.params.id} exists.`});
    }
});

module.exports = router;
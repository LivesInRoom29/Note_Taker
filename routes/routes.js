const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');

const router = express.Router();

// ___________Routes ___________
// ---------- HTML routes ----------
router.get('/', (req, res) => {
    // return index.html file
    res.sendFile(path.join(__dirname, '../public/INDEX.html'));
});

router.get('/notes', (req, res) => {
    // return notes.html file
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// ---------- API routes ----------
// To load the notes from the db file
router.get('/api/notes', (req, res) => {
    // read db.json file and return all saved notes as JSON
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        return res.send(JSON.parse(data));
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

    idToDelete = req.params.id;

    // Check to make sure the note with the ID exists in the db array
    // found will be true it is does exist
    const found = db.some(note => note.id === idToDelete);

    if (found) {
        // Use filter to make newDB that includes all notes except for the one with the id
        const newDB = db.filter(note => note.id !== idToDelete);

        // Write the newDB data to the db.json file to update the array of notes
        fs.writeFile('./db/db.json', JSON.stringify(newDB), {encoding: 'utf8'}, (err) => {
            if (err) throw err;
        });

        res.send(`Note with id of ${idToDelete} was deleted!`);
    } else {
        // if there's not note with that id, return error status
        res.status(400).json({ msg: `No note with the ID of ${req.params.id} exists.`});
    }
});

module.exports = router;
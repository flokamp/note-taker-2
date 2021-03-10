const router = require('express').Router();
let { notes } = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res)=>{
  res.json(notes)
})

// push to notes array and json file
router.post('/notes', (req, res) => {
  const note = req.body;
  if (req.body.id) {
    // find that note in the notes array using the id
    const { id } = req.body;
    let existing = notes.findIndex(note => note.id === id)
    console.log(existing)
    // update existing note objext
    notes[existing] = note;

  // set unique id if note does not exist
  } else {
    note.id = uuidv4();
    notes.push(note);
  }
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({notes: notes}, null, 2)
  );
  res.json(note)
});

// delete note
router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  const deleted = notes.find(note => note.id === id)
  if (deleted) {
    notes = notes.filter(note => note.id !== id)
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({notes: notes}, null, 2)
    );
  } else {
    res.status(404).json({ message: "Note does not exist" })
  }
})

module.exports  = router;
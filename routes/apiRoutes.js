const router = require('express').Router();
let { notes } = require('../db/db.json');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res)=>{
  res.json(notes)
})

router.get('/notes/:id', (req, res) => {
  const result = notes.find(note => note.id === id);
  if (result) {
    res.json(result);
    return result;
  } else {
    res.send(404);
  }
});

// push to notes array and json file
router.post('/notes', (req, res) => {
  const note = req.body;
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  notes.push(note);

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
const router = require('express').Router();
const { notes } = require('../db/db.json');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res)=>{
  res.json(notes)
})

// push to notes array and json file
router.post('/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({notes: notes}, null, 2)
  );
  res.json(note)
});

module.exports  = router;
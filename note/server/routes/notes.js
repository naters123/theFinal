const sequenceGenerator = require('./sequenceGenerator');
const Note = require('../models/note');

var express = require('express');
var router = express.Router();
module.exports = router; 

  router.post('/', (req, res, next) => {
    console.log("Post: ", req.body)
    const maxNoteId = sequenceGenerator.nextId("notes");
  
    const note = new Note({
      id: maxNoteId,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date
    });
  
    note.save()
      .then(createdNote => {
        res.status(201).json({
          message: 'Note added successfully',
          note: createdNote
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });
  router.put('/:id', (req, res, next) => {
    Note.findOne({ id: req.params.id })
      .then(note => {
        note.name = req.body.name;
        note.description = req.body.description;
        note.date = req.body.date;
  
        Note.updateOne({ id: req.params.id }, note)
          .then(result => {
            res.status(204).json({
              message: 'Note updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Note not found.',
          error: { note: 'Note not found'}
        });
      });
  });


  router.delete("/:id", (req, res, next) => {
    Note.findOne({ id: req.params.id })
      .then(note => {
        Note.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Note deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Note not found.',
          error: { note: 'Note not found'}
        });
      });
  });


  router.get('/', (req, res, next) => {
    Note.find().then(notes => {
        res.status(200).json({
          message: 'Notes fetched successfully',
          notes: notes
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
    });
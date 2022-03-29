const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxNoteId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema);
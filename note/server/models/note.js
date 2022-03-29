const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   date: { type: String, required: true },
   description: { type: String, required: true },
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

module.exports = mongoose.model('Note', noteSchema);
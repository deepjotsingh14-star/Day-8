const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String , 
    content: String  
})

const noteModel = mongoose.model('Notes ', noteSchema);

module.exports = noteModel;
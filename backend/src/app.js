const express = require('express');
const noteModel = require('./models/notes.model');
const cors = require('cors');
const path = require('path');   
const app = express();

app.use(cors());
    app.use(express.json());
    app.use(express.static("./public"))

app.post("/api/notes", async(req, res) => {
    const{ title, content } = req.body;
  const note = await noteModel.create({
        title, content 
    })
    res.status(201).json({
        message: "Note created successfully",
        note: note
    });
})

app.get("/api/notes", async(req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        note: notes
    })})

app.delete("/api/notes/:id", async(req, res) => {    
        const id =req.params.id;
        await noteModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Note deleted successfully"
        })

})

app.patch("/api/notes/:id", async(req, res) => {    
    const id =req.params.id;
    const{content } = req.body;
    await noteModel.findByIdAndUpdate(id, { content });

    res.status(200).json({
        message: "Note updated successfully"
    })  
})
console.log(__dirname);

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
}   )

module.exports = app;
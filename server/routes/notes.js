const express=require('express')
const route=express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');


//fetch all notes
route.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//add the notes
route.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            console.log("ho")
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    //update the notes
    route.put('/updatenotes/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            // Create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };
    
            // Find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
    
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    //delete the notes
    route.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
        try{
            //find the note by id
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
    //delete the note only if the note belongs to the user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Success":"Note has been deleted" });
        }catch(error){
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
    })
module.exports=route;
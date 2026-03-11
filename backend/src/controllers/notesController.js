import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in the getAllNotes controller", error);
        res.status(500).json({message: "Internal error server"});
    }
};

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();
            res.status(201).json({nota:savedNote, message: "Note created successfully"});
    } catch (error) {
        console.error("Error in the createNote controller", error);
        res.status(500).json({message: "Internal error server"});
    }
};

export async function updateNote(req, res) {
    try {
       const {title, content} = req.body;
       const updatedNote = await Note.findByIdAndUpdate(req.params.id, 
        {title, content}, 
        {
        new: true,
       });
       if(!updatedNote) return res.status(404).json({message: "Note not found"});
       res.status(200).json(updatedNote);
    } catch (error){
        console.error("Error in the updateNote controller", error);
        res.status(500).json({message: "Internal error server"});
    }
};

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error in the deletedNote controller", error);
        res.status(500).json({message: "Internal error server"});
    }
};

export async function getNoteById(req, res) {
    try {
        const NoteFound = await Note.findById(req.params.id);
        if (!NoteFound) return res.status(404).json({message: "Note not found"});
        res.status(200).json(NoteFound);
    } catch (error) {
        console.error("Error in the getNoteById controller", error);
        res.status(500).json({message: "Internal error server"});
    }
};
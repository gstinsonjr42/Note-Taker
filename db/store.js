const util = require("util")
const fs = require("fs")

//generate unique id using a universally unique identifier package(run npm install uuid)
const { v1: uuidv1 } = require('uuid');
//const uuidv1 = require("uuid/v1");


//Use util.promisify to convert fs.readfile and fs.writeFile to a promise based method
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//create store classes for note functionality
class Store{
    //function that reads and returns a note from the database
    read(){
        return readFileAsync("db/db.json", "utf8");
    }
    write(note){
        return writeFileAsync("db/db.json",  JSON.stringify(note));
    }
    getNotes(){
       return this.read()
       .then((notes) =>{
           let parsedNotes;

           try{
               parsedNotes = [].concat(JSON.parse(notes));
           }
           catch(err){
               parsedNotes = [];
           }
           return parsedNotes;
       });
    }
    addNote(note){
        const { title, text } = note;

        if(!title){
            title = "Undefined";
        }
        if(!text){
            throw new Error("Note 'text' cannot be blank");
        }

        const addedNote = {title, text, id: uuidv1()};

        return this.getNotes()
            .then((notes)=>[...notes,addedNote])
            .then((updatedNotes)=>this.write(updatedNotes))
            .then(()=> addedNote);
    }
    removeNote(id){
        return this.getNotes()
        .then((notes)=> notes.filter((note)=>note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes))
    }
}
module.exports = new Store();


// require fs
const fs = require('fs');
// require util
const util = require('util');
// require uuid
const uuid = require('./uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            // parse the notes and return them
            const oldNotes = JSON.parse(notes)
            return oldNotes;
        })
    }

    addNote(note) {
        const { title, text } = note;
        // give note an id
        const newNote = { title, text, id: uuid() };
        newNote.title = title;
        newNote.text = text;
        this.getNotes().then((data) => {
            data.push(newNote);
            this.write(data);
        })
    }

    removeNote(id) {
        return this.getNotes()
            .then((notes) => {
                for (let i = 0; i < notes.length; i++) {
                    if (id === notes[i].id) {
                        notes.splice(i, 1)
                        return notes;
                    }
                }
            }).then((filtered) => {
                this.write(filtered)
            });
    }
}

module.exports = new Store();
const api = require('express').Router();

const store = require('../helpers/store')
// retrieve the notes
api.get('/notes', (req, res) => {
    console.log(('GET /api/notes'));
    store.getNotes().then((notes) => {
        res.json(notes)
    })
})

// post a new note
api.post('/notes', (req, res) => {
    console.log('POST /api/notes');
    store.addNote(req.body);
    res.json(req.body);
    return;
})

// delete note
api.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} called for /api/notes`);
    if (!res) {
        console.log('err');
    } else {
        store.removeNote(req.params.id);
        res.status('Note deleted');
    }
})

module.exports = api;
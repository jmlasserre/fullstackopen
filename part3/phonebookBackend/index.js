const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token(`body`, (req, res) => JSON.stringify(req.body))

let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json());
app.use(cors())
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
    res.json(notes);
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${notes.length} people</p><p>${new Date()}</p>`);
})

app.get('/api/persons/:id', (req, res) =>  {
    const id = req.params.id;
    const note = notes.find(note => note.id === id);
    if (note){
        res.json(note);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const note = {
        id: Math.round(Math.random()*9999999),
        name: body.name,
        number: body.number
    };
    if (notes.some(otherNote => otherNote.name === note.name && otherNote.number === note.number)){
        // The person has already been added.
        return res.status(409).json({
            error: "Name has already been added to phonebook"
        });
    }
    if (!note.name || !note.number){
        return res.status(400).json({
            error: "Missing attributes"
        })
    }
    notes = notes.concat(note);
    res.json(notes);
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${PORT}`)
})
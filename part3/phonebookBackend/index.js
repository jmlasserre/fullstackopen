const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token(`body`, (req, res) => JSON.stringify(req.body))

let names = [
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
    res.json(names);
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${names.length} people</p><p>${new Date()}</p>`);
})

app.get('/api/persons/:id', (req, res) =>  {
    const id = req.params.id;
    const newName = names.find(newName => newName.id === id);
    if (newName){
        res.json(newName);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    names = names.filter(newName => newName.id !== id);
    res.status(204).end();
})

app.put('/api/persons/:id', (req, res) => {
    const nameToReplace = req.body.name;
    const newNumber = req.body.number;
    const existingName = names.find(otherName => otherName.name === nameToReplace);
    const newName = {...existingName, number: newNumber };
    names = names.map(otherName => otherName.name === nameToReplace ? newName : otherName);
    return res.json(req.body);
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const newName = {
        id: Math.round(Math.random()*9999999),
        name: body.name,
        number: body.number
    };

    if (!newName.name || !newName.number){
        console.log("It's missing an attribute you jerk")
        return res.status(400).json({
            error: "Missing attributes"
        })
    }
    names = names.concat(newName);
    res.json(names);
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
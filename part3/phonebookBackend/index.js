// I did 3.14 while doing 3.13. My bad.

require("dotenv").config();
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]); // Found this fix online: https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/4
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token(`body`, (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result.map((person) => person));
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `<p>Phonebook has info for ${result.length} people</p><p>${new Date()}</p>`,
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
  .then((person) => {
    res.json(person);
  })
  .catch(() => {
    res.status(404).end();
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  names = names.filter((newName) => newName.id !== id);
  res.status(204).end();
});

app.put("/api/persons/:id", (req, res) => {
  const nameToReplace = req.body.name;
  const newNumber = req.body.number;
  const existingName = names.find(
    (otherName) => otherName.name === nameToReplace,
  );
  const newName = { ...existingName, number: newNumber };
  names = names.map((otherName) =>
    otherName.name === nameToReplace ? newName : otherName,
  );
  return res.json(req.body);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "Missing attributes",
    });
  }

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

// Finally fixed it. The path was incorrectly typed, meaning it never copied 'dist' into the root directory. My bad.

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

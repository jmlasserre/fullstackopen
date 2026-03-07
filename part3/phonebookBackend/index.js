require("dotenv").config();
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]); // Found this fix online: https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/4
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token(`body`, (req) => JSON.stringify(req.body));

app.use(express.static("dist"));
app.use(express.json());
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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const number = req.body.number;
  if (!number) {
    return res.status(400).json({
      error: "Missing attributes",
    });
  }
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        person.number = number;
        person.save().then((savedPerson) => {
          res.json(savedPerson);
        });
      } else {
        return res.status(404).end();
      }
    })
    .catch((error) => next(error));
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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

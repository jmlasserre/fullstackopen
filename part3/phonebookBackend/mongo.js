const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]); // Found this fix online: https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/4

const mongoose = require("mongoose");
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.nmtnn1o.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.error("No password given. Exiting...");
  process.exit(1);
} else if (process.argv.length === 3) {
  console.log("phonebook");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  if (name !== undefined && number !== undefined) {
    const newPerson = new Person({
      name: name,
      number: number,
    });

    newPerson.save().then(() => {
      console.log(`Added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
  } else {
    console.error("Missing parameters. Exiting...");
    process.exit(1);
  }
}

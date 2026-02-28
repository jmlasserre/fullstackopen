import { useState, useEffect } from "react";
import nameService from "./services/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setNewSearchName] = useState("");

  useEffect(() => {
    nameService.getAll().then(names => setPersons(names))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setNewSearchName={setNewSearchName} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons
        searchName={searchName}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;

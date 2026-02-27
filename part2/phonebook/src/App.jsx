import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number:"040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (e) => {
    e.preventDefault();
    if (
      persons.some(({ name }) => name.toLowerCase() === newName.toLowerCase())
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const name = { name: newName, number:newNumber };
      setPersons(persons.concat(name));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    //console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map((p) => (
          <div key={p.name}>{p.name} {p.number}</div>
        ))}
      </>
    </div>
  );
};

export default App;

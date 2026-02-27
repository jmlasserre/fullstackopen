import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number:"040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setNewSearchName] = useState("");

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
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setNewSearchName(e.target.value);
  }

  const namesToShow = searchName === "" 
    ? persons
    : persons.filter((p) => p.name.toLowerCase().includes(searchName));

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={searchName} onChange={handleSearchChange} />
      <h2>add a new</h2>
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
        {namesToShow.map(({ name, number }) => <div key={name}>{name} {number}</div>)}
      </>
    </div>
  );
};

export default App;

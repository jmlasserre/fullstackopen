import noteService from '../services/Persons';

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const addName = e => {
    e.preventDefault();
    if (
      persons.some(({ name }) => name.toLowerCase() === newName.toLowerCase())
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const name = { name: newName, number: newNumber };
      noteService
        .create(name)
        .then(returnedName => setPersons(persons.concat(returnedName))
      );
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);

  return (
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
  );
};

export default PersonForm;

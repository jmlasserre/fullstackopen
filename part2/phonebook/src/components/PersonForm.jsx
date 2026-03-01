import nameService from '../services/Persons';

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setMessage
}) => {
  const addName = e => {
    e.preventDefault();
    const name = { name: newName, number: newNumber };
    if (
      persons.some(({ name }) => name === newName)
    ) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const id = persons.find(p => p.name === newName).id;
        nameService
          .update(name, id)
          .then(updatedName => setPersons(persons.map(p => p.id === id ? updatedName : p)));
          setMessage(`Updated ${newName}'s number.`);
          setTimeout(() => setMessage(null), 5000);
      }
    } else {
      nameService
        .create(name)
        .then(returnedName => setPersons(persons.concat(returnedName)));
        setMessage(`Added ${newName}.`);
        setTimeout(() => setMessage(null), 5000);
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

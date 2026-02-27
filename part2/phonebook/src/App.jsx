import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault();
    const name = { name: newName };
    setPersons(persons.concat(name));
    setNewName('');
  }

  const handleNoteChange = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>{persons.map((p) => <div key={p.name}>{p.name}</div>)}</>
    </div>
  )
}

export default App
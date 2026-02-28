import nameService from '../services/Persons'
const Persons = ({ searchName, persons, setPersons }) => {
    const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      nameService.deleteName(id);
      setPersons(persons.filter(p => p.id !== id));
    }
  };
  const Person = ({ name, number, id }) => (
    <div key={name}>
      {name} {number}
      <button onClick={() => handleDelete(id, name)}>delete</button>
    </div>
  );

  const namesToShow =
    searchName === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(searchName.toLowerCase()),
        );

  return (
    <div>
      {namesToShow.map(({ name, number, id }) => (
        <Person key={name} name={name} number={number} id={id} />
      ))}
    </div>
  );
};

export default Persons;

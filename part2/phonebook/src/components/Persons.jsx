const Persons = ({ searchName, persons }) => {
  const Person = ({ name, number }) => (
    <div key={name}>
      {name} {number}
    </div>
  );
  const namesToShow =
    searchName === ""
      ? persons
      : persons.filter((p) => p.name.toLowerCase().includes(searchName));

  return (
    <div>
      {namesToShow.map(({ name, number }) => (
        <Person key={name} name={name} number={number} />
      ))}
    </div>
  );
};

export default Persons;

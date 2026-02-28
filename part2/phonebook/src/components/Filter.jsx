const Filter = ({ searchName, setNewSearchName }) => {
  const handleSearchChange = e => {
    setNewSearchName(e.target.value);
  };
  return (
    <div>
      filter shown with{" "}
      <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;

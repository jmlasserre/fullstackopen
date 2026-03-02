const Countries = ({ countryList, searchCountry, setMessage }) => {
  const countriesToShow = () => {
    if (countryList.length > 10) {
      setMessage("Too many matches, specify another filter");
      return [];
    } else if (countryList.length > 1) {
      return countryList
        .filter((c) => c.name.official.toLowerCase().contains(searchCountry))
        .map((c) => <div>{c.name.official}</div>);
    } else if (countryList.length === 1) {
      return countryList.map((c) => {
        <div>
          <h1>{c.name.official}</h1>
          <div>{`Capital ${c.capital[0]}`}</div>
          <div>{`Area ${c.area}`}</div>
          <h2>Languages</h2>
          <ul>
            {c.languages.map((l) => (
              <li>{l}</li>
            ))}
          </ul>
          <img src={c.flags.png} alt={`Flag of ${c.name.official}`}></img>
        </div>;
      });
    } else {
      return [];
    }
  };

  return (
    <div>
        {countriesToShow()}
    </div>
  )
};

export default Countries;

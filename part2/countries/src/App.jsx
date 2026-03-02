import countryService from "./services/CountryService";
import { useState, useEffect } from "react";
import Message from "./components/Message";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountryList(countries);
    });
  }, []);

  const handleCountryChange = (e) => setSearchCountry(e.target.value);

  const countriesToShow = () => {
    let listOfCountries =
      searchCountry !== ""
        ? countryList.filter((c) =>
            c.name.common.toLowerCase().includes(searchCountry.toLowerCase()),
          )
        : [];
    if (listOfCountries.length > 10) {
      return (
      <>
        Too many matches, specify another filter 
      </>);
    } else {
      if (listOfCountries.length === 1) {
        return (
          <>
            {listOfCountries.map((c) => (
              <div key={c.name.common}>
                <h1>{c.name.common}</h1>
                <div>{`Capital ${c.capital[0]}`}</div>
                <div>{`Area ${c.area}`}</div>
                <h2>Languages</h2>
                <ul>
                  {Object.values(c.languages).map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <img src={c.flags.png} alt={`Flag of ${c.name.common}`}></img>
              </div>
            ))}
          </>
        );
      } else {
        return listOfCountries.map((c) => (
          <div key={c.name.common}>{c.name.common}</div>
        ));
      }
    }
  };

  return (
    <div>
      <div>find countries <input value={searchCountry} onChange={handleCountryChange} /></div>
      <div>{countriesToShow()}</div>
    </div>
  );
};

export default App;

import countryService from "./services/CountryService";
import Country from "./components/Country";
import CountryShowcase from "./components/CountryShowcase";
import { useState, useEffect } from "react";

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
      return <>Too many matches, specify another filter</>;
    } else {
      if (listOfCountries.length === 1) {
        return <div key={listOfCountries[0].name.common}><Country country={listOfCountries[0]} showButton={false}/></div>;
      } else {
        return listOfCountries.map((c) => (
          <div key={c.name.common}>
            <Country
              country={c}
              showButton={true}
            />
          </div>
        ));
      }
    }
  };

  return (
    <div>
      <div>
        find countries{" "}
        <input value={searchCountry} onChange={handleCountryChange} />
      </div>
      <div>{countriesToShow()}</div>
    </div>
  );
};

export default App;

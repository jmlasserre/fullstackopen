import { useState } from "react";
import CountryShowcase from "./CountryShowcase";

const Country = ({ country, showButton }) => {
  const [shown, setShown] = useState(false);

  const showCountryShowcase = () => {
    setShown(!shown);
  };

  if (showButton) {
    return (
      <>
        {country.name.common}{" "}
        <button onClick={() => showCountryShowcase()}>
          {shown ? "hide" : "show"}
        </button>
        <CountryShowcase country={country} shown={shown} />
      </>
    );
  } else {
    return (
    <>
      <CountryShowcase country={country} shown={true}/>
    </>
    )
  }
};

export default Country;

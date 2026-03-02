import { useState } from "react";

const Country = ({ country, createCountryShowcase }) => {
  const [shown, setShown] = useState(false);

  const showCountryShowcase = () => {
    setShown(!shown);
    console.log("hello")
  };

  return (
    <>
      {country.name.common}{" "}
      <button onClick={() => showCountryShowcase()}>
        {shown ? "hide" : "show"}
      </button>
      {shown ? createCountryShowcase(country) : <></>}
    </>
  );
};

export default Country;

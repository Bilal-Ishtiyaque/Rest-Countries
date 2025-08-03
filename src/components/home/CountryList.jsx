import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";


const CountryList = ({ query }) => {
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,currencies,languages,tld,borders"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Unexpected data type:", data);
          throw new Error("We encountered a problem.");
        }

        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountryData(sortedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (isLoading) {
    return (
      <section className="countryList">
        <CountryListShimmer />
      </section>
    );
  }

  if (error) {
    return (
      <div className="errorMessage">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  const array = countryData
    .filter((ctr) => {
      return (
        ctr.name.common.toLowerCase().includes(query) ||
        ctr.region.toLowerCase().includes(query)
      );
    })
    .map((country) => {
      return (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flag={country.flags.svg}
          altVal={country.flags.alt}
          population={country.population}
          region={country.region}
          capital={country.capital}
          country={country}
        />
      );
    });

  return <section className="countryList">{array}</section>;
};

export default CountryList;
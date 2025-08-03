import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CountryDetailShimmer from "../components/countryDetail/CountryDetailShimmer";

export default function CountryDetail() {
  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function updateCountryData(country) {
    setCountryData({
      name: country.name.common,
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital || [],
      flag: country.flags.svg,
      tld: country.tld,
      languages: Object.values(country.languages || {}).join(", "),
      currencies: Object.values(country.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      borders: [],
    });

    if (!country.borders) return;

    Promise.all(
      country.borders.map((borderCode) =>
        fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
          .catch((err) => {
            console.warn(`Failed to fetch border: ${borderCode}`, err);
          })
      )
    ).then((borders) => {
      const filteredBorders = borders.filter(Boolean);
      setCountryData((prevState) => ({
        ...prevState,
        borders: filteredBorders,
      }));
    });

  }

  useEffect(() => {
    if (state?.country) {
      updateCountryData(state.country);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const [country] = data;
        if (!country) {
          setError("No country found.");
          return;
        }
        updateCountryData(country);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [countryName]);

  return (
    <main className="countryDetailsContainer">
      <button className="backButton" onClick={() => history.back()}>
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
      </button>

      {isLoading ? (
        <CountryDetailShimmer />
      ) : error ? (
        <div className="errorMessage">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        countryData && (
          <>
            <div className="countryDetails">
              <img
                src={countryData.flag}
                alt={`${countryData.name} flag`}
                className="countryDetailsImg"
              />
              <div>
                <h1>{countryData.name}</h1>
                <div className="detailsText">
                  <div>
                    <p>
                      <b>Population: </b>
                      {countryData.population.toLocaleString("en-PK")}
                    </p>
                    <p>
                      <b>Region: </b> {countryData.region}
                    </p>
                    <p>
                      <b>Sub Region: </b> {countryData.subregion}
                    </p>
                    <p>
                      <b>Capital: </b> {countryData.capital.join(", ")}
                    </p>
                  </div>

                  <div>
                    <p>
                      <b>Top Level Domain: </b> {countryData.tld}
                    </p>
                    <p>
                      <b>Currencies: </b> {countryData.currencies}
                    </p>
                    <p>
                      <b>Languages: </b> {countryData.languages}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {countryData.borders.length > 0 && (
              <div className="borderCountries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => (
                  <Link key={border} to={`/countryDetail/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </>
        )
      )}
    </main>
  );
}

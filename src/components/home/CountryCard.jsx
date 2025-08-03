import { Link } from "react-router-dom"

const CountryCard = ({name, flag, altVal, population, region, capital, country}) => {

  return (
    <article className="card">
        <Link to={`/countryDetail/${name}`} state={{country}}>
        <figure>
            <img src={flag} alt={altVal || `${name} flag`} className="cardImg" />
        </figure>
        <figcaption className="cardText">
            <h3 className="cardTitle">{name}</h3>
            <p>
                <b>Population: </b> {population != null ? population.toLocaleString("en-PK") : "N/A"}
            </p>
            <p>
                <b>Region: </b> {region || "Unknown"}
            </p>
            <p>
                <b>Capital: </b> {capital?.[0] || "-"}
            </p>
        </figcaption>
        </Link>
    </article>
  )
}

export default CountryCard;
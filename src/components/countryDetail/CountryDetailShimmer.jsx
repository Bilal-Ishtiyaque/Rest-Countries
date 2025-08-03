import "./CountryDetailShimmer.css";

const CountryDetailShimmer = () => {
  return (
    <>
      <div className="countryDetails shimmerDetail">
        <figure className="countryDetailsImg animate"></figure>
        <div>
          <h1 className="animate"></h1>
          <div className="detailsText">

            <div>
              <p className="animate"></p>
              <p className="animate"></p>
              <p className="animate"></p>
              <p className="animate"></p>
            </div>

            <div>
              <p className="animate"></p>
              <p className="animate"></p>
              <p className="animate"></p>
            </div>

          </div>
        </div>

      </div>

      <div className="borderCountries shimmerDetailBorders">
        <a className="animate"></a>
        <a className="animate"></a>
        <a className="animate"></a>
        <a className="animate"></a>
        <a className="animate"></a>
      </div>

      
    </>
  );
};

export default CountryDetailShimmer;

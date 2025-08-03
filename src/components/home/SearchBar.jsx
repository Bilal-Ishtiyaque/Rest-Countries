const SearchBar = ({ setQuery }) => {
  return (
    <nav className="searchContainer">
      <div className="searchBar">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </div>

      <select onChange={(e) => setQuery(e.target.value.toLowerCase())}>
        <option hidden>Select region</option>
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Antarctic">Antarctic</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </nav>
  );
};

export default SearchBar;

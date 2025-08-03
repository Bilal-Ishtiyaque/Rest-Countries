import { useState } from "react";
import SearchBar from "../components/home/SearchBar";
import CountryList from "../components/home/CountryList";

const Home = () => {
  const [query, setQuery] = useState("");
  return (
    <main>
      <SearchBar setQuery={setQuery} />
      <CountryList query={query} />
    </main>
  );
};

export default Home;
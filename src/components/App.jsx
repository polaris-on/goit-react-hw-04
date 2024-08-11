import { useEffect, useState } from "react";
import List from "./List/List";
import { fetchImg } from "../services/pixabay-api.js";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchImg(query, page, 3);
        console.log(response);
        setTotal(response.total_pages);
        setHits((prev) => [...prev, ...response.results]);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setHits([]);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (query) => {
    setQuery(query);
    setHits([]);
    setPage(1);
  };

  return (
    <div>
      <SearchBar setQuery={handleSetQuery} />
      {isLoading && <Loader />}
      {isError && <div>Ooops...</div>}
      {/* {query && <div>Here is some {query}...</div>} */}
      <List items={hits} />
      {total > page && !isLoading && (
        <button onClick={() => setPage((prev) => prev + 1)}>Load more</button>
      )}
    </div>
  );
};

export default App;

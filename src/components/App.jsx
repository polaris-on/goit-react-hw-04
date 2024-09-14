import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery .jsx";
import { fetchImg } from "../services/unsplash-api.js";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";
import "./App.css";
import ImageModal from "./ImageModal/ImageModal.jsx";

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!query) return;
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
  const loadMore = () => setPage((prev) => prev + 1);

  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const [alt, setAlt] = useState("");
  const [modalUrls, setModalUrls] = useState("");

  function openModal(alt, modalUrls) {
    setIsOpen(true);
    setAlt(alt);
    setModalUrls(modalUrls);
  }

  function closeModal() {
    setIsOpen(false);
    setAlt("");
  }

  return (
    <div className="app">
      <SearchBar onSubmit={handleSetQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div className="container">
        {hits.length > 0 && (
          <>
            {query && <div>Here is some {query}...</div>}
            <ImageGallery
              items={hits}
              openModal={openModal}
              closeModal={closeModal}
            />
          </>
        )}

        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          modalUrls={modalUrls}
          alt={alt}
        />
        {total > page && !isLoading && <LoadMoreBtn loadMore={loadMore} />}
      </div>
    </div>
  );
};

export default App;

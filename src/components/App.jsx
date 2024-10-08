import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        const response = await fetchImg(query, page, 3);

        if (response.results.length === 0) {
          setErrorMessage(`No images found for "${query}".`);
          setIsError(true);
          return;
        } else {
          setTotal(response.total_pages);
          setHits((prev) => [...prev, ...response.results]);
        }
      } catch (error) {
        setIsError(true);
        setHits([]);
        setQuery("");
        setErrorMessage(error.message || "Unknown error occurred");
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
      <SearchBar
        onSubmit={handleSetQuery}
        setErrorMessage={setErrorMessage}
        setIsError={setIsError}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={errorMessage} />}
      <div className="container">
        {hits.length > 0 && (
          <>
            {query && (
              <div>
                Here is some <strong>{query}</strong>:
              </div>
            )}
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
        {total > page && !isLoading && !isError && (
          <LoadMoreBtn loadMore={loadMore} />
        )}
      </div>
    </div>
  );
};

export default App;

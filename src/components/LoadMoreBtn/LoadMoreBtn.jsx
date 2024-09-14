import s from "./LoadMore.module.css";

const LoadMoreBtn = ({ loadMore }) => (
  <button onClick={loadMore} className={s.loadMore}>
    Load more
  </button>
);

export default LoadMoreBtn;

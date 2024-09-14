import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const List = ({ items, openModal, closeModal }) => {
  //   console.log(items);
  return (
    <ul className={s.imagesList}>
      {items.map((item) => (
        <li key={item.id} className={s.imagesItem}>
          <ImageCard
            item={item}
            openModal={openModal}
            closeModal={closeModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;

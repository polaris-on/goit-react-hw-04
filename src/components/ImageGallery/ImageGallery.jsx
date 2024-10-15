import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ items, onImageClick }) => {
  return (
    <ul className={s.imagesList}>
      {items.map((item) => (
        <li key={item.id} className={s.imagesItem}>
          <ImageCard item={item} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

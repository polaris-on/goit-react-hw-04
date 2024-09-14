import s from "./ImageCard.module.css";

const ImageCard = ({ item, openModal }) => {
  return (
    <div>
      <div className={s.imageWrapper}>
        <img
          onClick={() => openModal(item.alt_description, item.urls.regular)}
          src={item.urls.small}
          alt={item.alt_description}
        />
      </div>
    </div>
  );
};

export default ImageCard;

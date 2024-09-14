import s from "./ImageModal.module.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    backgroundColor: "#0d0d0d",
  },
};

Modal.setAppElement("#root");

const ImageModal = ({
  modalIsOpen,
  //   afterOpenModal,
  closeModal,
  modalUrls,
  alt,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={alt}
    >
      <img src={modalUrls} alt={alt} className={s.image} />
    </Modal>
  );
};

export default ImageModal;

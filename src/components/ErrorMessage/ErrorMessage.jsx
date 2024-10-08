import s from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={s.errorMessage}>{message || "Oops... Thats an error"}</div>
  );
};

export default ErrorMessage;

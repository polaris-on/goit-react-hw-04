import { Form, Formik, Field } from "formik";
import s from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSubmit, setErrorMessage, setIsError }) => {
  const initialValues = {
    query: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.query.trim()) {
      errors.query = "Please enter a search term";
      toast.error(errors.query);
    } else {
      setErrorMessage("");
      setIsError(false);
    }
    return errors;
  };
  const handleSubmit = (values, { resetForm }) => {
    setErrorMessage("");
    onSubmit(values.query);
    resetForm();
  };
  return (
    <header className={s.header}>
      <Toaster />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
        validateOnBlur={false}
      >
        <Form className={s.form}>
          <Field
            className={s.searchInput}
            name="query"
            placeholder="Search images and photos"
            type="search"
            autoComplete="off"
            autoFocus
          />
          <button type="submit" className={s.button}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;

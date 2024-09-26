import { Form, Formik, Field } from "formik";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values) => {
    onSubmit(values.query);
  };
  return (
    <header className={s.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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

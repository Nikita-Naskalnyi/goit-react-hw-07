
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import styles from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, `The "Name" is too Short!`)
    .max(50, `The "Name" is too Long!`)
    .required('The "Name" is Required field!')
    .test(
      "not-empty",
      'The "Name" must not be only spaces!',
      (value) => value?.trim().length > 0
    ),
  number: Yup.string()
    .min(3, `The "Number" is too Short!`)
    .max(50, `The "Number" is too Long!`)
    .required('The "Number" is Required field!')
    .test(
      "not-empty",
      'The "Number" must not be only spaces!',
      (value) => value?.trim().length > 0
    ),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact({ name: values.name, number: values.number }));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className={styles["form-container"]}>
          <label className={styles["field-label"]} htmlFor={nameFieldId}>
            Name
          </label>
          <div className={styles["input-group"]}>
            <Field
              className={styles["input-field"]}
              type="text"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage
              className={styles["error-message"]}
              name="name"
              component="div"
            />
          </div>

          <label className={styles["field-label"]} htmlFor={numberFieldId}>
            Number
          </label>
          <div className={styles["input-group"]}>
            <Field
              className={styles["input-field"]}
              type="tel"
              inputMode="tel"
              name="number"
              id={numberFieldId}
            />
            <ErrorMessage
              className={styles["error-message-large"]}
              name="number"
              component="div"
            />
          </div>

          <button
            className={styles["submit-btn"]}
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

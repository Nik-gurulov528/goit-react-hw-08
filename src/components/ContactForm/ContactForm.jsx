import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { addContact } from '../../redux/contacts/contactsOps';

export default function ContactForm() {
  const id = useId();
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .required('Required!'),
    number: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .required('Required!'),
  });

  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    dispatch(addContact(values));

    actions.resetForm();
  }

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.mainForm}>
          <div className={css.stylesField}>
            <label htmlFor={`${id}-name`}>Name</label>
            <Field
              id={`${id}-name`}
              type="text"
              name="name"
              className={css.inputField}
            />
            <ErrorMessage name="name" component="span" className={css.formError} />
          </div>
          <div className={css.stylesField}>
            <label htmlFor={`${id}-number`}>Number</label>
            <Field
              id={`${id}-number`}
              type="tel"
              name="number"
              className={css.inputField}
            />
            <ErrorMessage name="number" component="span" className={css.formError} />
          </div>
          <button type="submit" className={css.submitBtn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
}

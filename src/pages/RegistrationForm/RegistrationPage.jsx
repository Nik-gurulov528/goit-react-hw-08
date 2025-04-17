import css from './RegistrationPage.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';

export default function RegistrationPage() {
  const id = useId();
  const dispatch = useDispatch();

  const registOptions = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Too short')
      .max(15, 'Too long')
      .trim()
      .required('Required!'),
    email: Yup.string().trim().email('Invalid email').required('Required!'),
    password: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .required('Required!'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        dispatch(register(values));
        actions.resetForm();
      }}
      validationSchema={registOptions}
    >
      <Form className={css.registF}>
        <h1 className={css.registHeader}>First time here?</h1>
        <p className={css.registHeaderPart}>Then tell us about yourself</p>
        <div className={css.registField}>
          <label htmlFor={`${id}-name`}>Name</label>
          <Field
            type="text"
            name="name"
            id={`${id}-name`}
            className={css.registInput}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={css.registError}
          />
        </div>
        <div className={css.registField}>
          <label htmlFor={`${id}-email`}>Email</label>
          <Field
            type="email"
            name="email"
            id={`${id}-email`}
            className={css.registInput}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={css.registError}
          />
        </div>
        <div className={css.registField}>
          <label htmlFor={`${id}-password`}>Password</label>
          <Field
            type="password"
            name="password"
            id={`${id}-password`}
            className={css.registInput}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.registError}
          />
        </div>
        <button type="submit" className={css.registSubmit}>
          Submit
        </button>
      </Form>
    </Formik>
  );
}

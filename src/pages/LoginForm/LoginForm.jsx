import css from './LoginForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './../../redux/auth/authOps';
import * as Yup from 'yup';

export default function LoginForm() {
  const id = useId();

  const dispatch = useDispatch();

  const loginOptions = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email').required('Required!'),
    password: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .required('Required!'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        dispatch(login(values));
        actions.resetForm();
      }}
      validationSchema={loginOptions}
    >
      <Form className={css.loginF}>
        <h1 className={css.loginHeader}>Already used it?</h1>
        <p className={css.loginHeaderPart}>Then remind up about yourself</p>
        <div className={css.loginField}>
          <label htmlFor={`${id}-email`}>Email</label>
          <Field
            type="email"
            name="email"
            id={`${id}-email`}
            className={css.loginInput}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={css.loginError}
          />
        </div>
        <div className={css.loginField}>
          <label htmlFor={`${id}-password`}>Password</label>
          <Field
            type="password"
            name="password"
            id={`${id}-password`}
            className={css.loginInput}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.loginError}
          />
        </div>
        <button type="submit" className={css.loginSubmit}>
          Log in
        </button>
      </Form>
    </Formik>
  );
}

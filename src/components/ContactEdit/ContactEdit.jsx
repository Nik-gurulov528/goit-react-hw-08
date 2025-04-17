import css from './ContactEdit.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import { selectChangingItem } from '../../redux/contacts/selectors';
import { cancelChanging } from '../../redux/contacts/slice';
import { updateContact } from '../../redux/contacts/operations';
// import toast, { Toaster } from 'react-hot-toast';

export default function ContactEdit() {
  const id = useId();
  const changingUser = useSelector(selectChangingItem);
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

  //   const success = () => toast.success('Contact was successfully created!');

  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    dispatch(
      updateContact({
        id: changingUser.id,
        info: {
          name: values.name,
          number: values.number,
        },
      })
    );
    // success();

    actions.resetForm();
  }

  return (
    <>
      {/* <Toaster position="top-center" className={css.toasterSuccess} /> */}
      <Formik
        initialValues={{
          name: changingUser.name,
          number: changingUser.number,
        }}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.mainForm}>
          <div className={css.stylesField}>
            <label htmlFor={`${id}-name`}>Change name?</label>
            <Field
              id={`${id}-name`}
              type="text"
              name="name"
              className={css.inputField}
            />
            <ErrorMessage name="name" component="span" />
          </div>
          <p>or/and</p>
          <div className={css.stylesField}>
            <label htmlFor={`${id}-number`}>Change number?</label>
            <Field
              id={`${id}-number`}
              type="tel"
              name="number"
              className={css.inputField}
            />
            <ErrorMessage name="number" component="span" />
          </div>
          <div className={css.editBtns}>
            <button
              type="button"
              className={css.cancelBtn}
              onClick={() => {
                dispatch(cancelChanging());
              }}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitBtn}>
              Update info
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

import css from './ContactsPart.module.css';
import ContactForm from './../ContactForm/ContactForm';
import ContactEdit from '../ContactEdit/ContactEdit';
import SearchBox from './../SearchBox/SearchBox';
import ContactList from './../ContactList/ContactList';
import {
  selectError,
  selectIsChanging,
  selectLoading,
  selectStatus,
} from './../../redux/contacts/contactsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../redux/contacts/contactsOps';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactsPart() {
  const loadingStatus = useSelector(selectLoading);
  const errorStatus = useSelector(selectError);
  const changingStatus = useSelector(selectIsChanging);
  const whichStatus = useSelector(selectStatus);
  const dispatch = useDispatch();

  const success = () => toast.success('Operation was finished successfully');
  const fail = () => toast.error('Oops, something went wrong!');

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (whichStatus === 'success') {
      success();
    } else if (whichStatus === 'error') {
      fail();
    }
  }, [whichStatus]);

  return (
    <div className={css.container}>
      <Toaster />
      <h1 className="title">List of your contatcts</h1>
      {!changingStatus ? <ContactForm /> : <ContactEdit />}
      <SearchBox />
      {loadingStatus && !errorStatus && <p>Please, wait</p>}
      {!loadingStatus && <ContactList />}
    </div>
  );
}

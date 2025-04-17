import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

export default function ContactList() {
  const visibilityContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.collectionOfContacts}>
      {visibilityContacts.map(item => {
        return (
          <li key={item.id} className={css.itemStyle}>
            <Contact name={item.name} phone={item.number} id={item.id} />
          </li>
        );
      })}
    </ul>
  );
}

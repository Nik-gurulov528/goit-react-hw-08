import css from './HomePage.module.css';
import { RiContactsBook3Fill } from 'react-icons/ri';

export default function HomePage() {
  return (
    <div className={css.textWrapper}>
      <RiContactsBook3Fill size={128} color="#ffffff" />
      <h1>Welcome to "Contacts Saver"</h1>
      <p>
        In this place, you can save your contacts, which are important to you.
        Let's give a shot!
      </p>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import EnterPart from '../EnterPart/EnterPart';
import WelcomePart from '../WelcomePart/WelcomePart';
import css from './NavigationBar.module.css';
import { NavLink } from 'react-router-dom';

export default function NavigationBar() {
  const LoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.navWrapper}>
      <div className={css.groupWrapper}>
        <NavLink to="/" className={css.navItem}>
          Home
        </NavLink>
        {LoggedIn && (
          <NavLink to="/contacts" className={css.navItem}>
            Contacts
          </NavLink>
        )}
      </div>
      {LoggedIn ? <WelcomePart /> : <EnterPart />}
    </nav>
  );
}

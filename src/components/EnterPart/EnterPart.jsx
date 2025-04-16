import css from './EnterPart.module.css';
import { NavLink } from 'react-router-dom';

export default function EnterPart() {
  return (
    <div className={css.groupWrapper}>
      <NavLink to="/login" className={css.navItem}>
        Login
      </NavLink>
      <NavLink to="/register" className={css.navItem}>
        Register
      </NavLink>
    </div>
  );
}

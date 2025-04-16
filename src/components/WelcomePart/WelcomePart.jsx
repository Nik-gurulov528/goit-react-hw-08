import css from './WelcomePart.module.css';
import { selectName } from '../../redux/auth/authSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authOps';

export default function WelcomePart() {
  const enteredName = useSelector(selectName);

  const dispatch = useDispatch();

  return (
    <div className={css.groupWrapper}>
      <p>Hello, {enteredName}</p>
      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => dispatch(logout())}
      >
        Log out
      </button>
    </div>
  );
}

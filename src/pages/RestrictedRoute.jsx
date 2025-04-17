import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ component, anotherPage = '/' }) {
  const LoggedIn = useSelector(selectIsLoggedIn);

  return !LoggedIn ? component : <Navigate to={anotherPage} />;
}

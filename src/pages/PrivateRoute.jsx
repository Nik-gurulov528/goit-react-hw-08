import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component, anotherPage = '/' }) {
  const LoggedIn = useSelector(selectIsLoggedIn);

  return LoggedIn ? component : <Navigate to={anotherPage} />;
}

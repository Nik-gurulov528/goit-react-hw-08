import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import HomePage from './pages/HomePage/HomePage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import LoginForm from './pages/LoginForm/LoginForm';
import RegistrationPage from './pages/RegistrationForm/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import PrivateRoute from './pages/PrivateRoute';
import RestrictedRoute from './pages/RestrictedRoute';
import { selectIsRefreshing } from './redux/auth/selectors';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const refresh = useSelector(selectIsRefreshing);

  return (
    <div className="wrapper">
      <NavigationBar />
      {refresh ? (
        <p className="refreshingText">Loading data...</p>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} anotherPage="/login" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginForm />}
                anotherPage="/contacts"
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                anotherPage="/contacts"
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenAsync } from './redux/Slice/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import CharacterList from './components/CharacterListComponents/CharacterList/CharacterList';
import { ThemeProvider } from './components/ThemeContext-temp.jsx';
import Header from './components/Header';
import ListGrid from './components/index.jsx'



// Lazily load components
const Login = lazy(() => import('./components/Login'));
const NotFound = lazy(() => import('./components/AuthComponents/NotFound'));
const ProtectedRoute = lazy(() => import('./components/AuthComponents/ProtectedRoute'));

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      const refreshInterval = setInterval(() => {
        dispatch(refreshTokenAsync());
      }, 10 * 60 * 1000); // Refresh every 10 minutes
      return () => clearInterval(refreshInterval);
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {token ? (
            <>
              <Route path={ROUTES.HOME} element={
                <ProtectedRoute isAuthenticated={token}>
                  <ListGrid/>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path={ROUTES.HOME} element={<Login />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

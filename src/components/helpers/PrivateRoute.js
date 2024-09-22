// PrivateRoute.js
import { Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, user, ...rest }) {
  return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
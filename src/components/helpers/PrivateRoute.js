import { Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, user, isAdmin, adminOnly, ...rest }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && isAdmin !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return <Component {...rest} />;
}

export default PrivateRoute;
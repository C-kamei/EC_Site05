// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ auth, component: Component }) {
  const isAuthenticated = !!auth; // 実際にはより複雑な認証ロジックが必要

  return isAuthenticated ? <Component auth={auth} /> : <Navigate to="/login" />;
}

export default PrivateRoute;

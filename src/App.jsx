import React from 'react'
import Room from './pages/Room.jsx'
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './utils/AuthContext.jsx';
import Register from './pages/Register.jsx';

const router = createBrowserRouter([ 
  {
    path: '/',
    element: <PrivateRoute />, 
    children: [
      { path: '/', element: <Room /> }, 
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
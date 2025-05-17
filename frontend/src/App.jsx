import { useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Personalisation from './components/Personalisation';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Text from './components/Text';

function App() {
  const routerdata = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    }, 
    {
      path: "/signup",
      element: <Signup />,
    }, 
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/personalization",
      element: <Personalisation />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    { 
      path: "/user/preview/:id",
      element: <Profile />,
    },

])

  return (
    <>
    <RouterProvider router={routerdata} />
    </>
  )
}

export default App

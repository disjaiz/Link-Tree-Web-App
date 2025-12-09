import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Personalisation from './components/Personalisation';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

import {GoogleOAuthProvider} from '@react-oauth/google';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuthWrapper = () => {
    return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
    )
  }


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
      element: <GoogleAuthWrapper />,
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

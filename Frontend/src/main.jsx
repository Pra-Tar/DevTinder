import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Connections from "./pages/Connections.jsx";
import Profile from "./pages/Profile.jsx";
import Feed from "./pages/Feed.jsx";
import { Provider } from 'react-redux';
import store from './app/store.js'
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";

import "./index.css";
import EditProfile from './pages/EditProfile.jsx';
import Followers from './pages/Followers.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "feed", 
        element: <Feed />,
      },
      {
        path: "profile", 
        element: <Profile />,
      },
      {
        path:"followers",
        element:<Followers/>,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"edit",
        element:<EditProfile/>
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)


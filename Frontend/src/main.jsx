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
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";

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
      },
      {
        path: "page/privacy-policy",  // ✅ Add this line
        element: <PrivacyPolicy />,
      },
      {
        path: "page/terms-of-service",  // ✅ Add this line
        element: <TermsOfService />,
      },
      {
        path: "page/refund-policy",
        element: <RefundPolicy />,
      },
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


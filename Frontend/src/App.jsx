import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigate ,Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from './slice/userSlice';


const App = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token"); // if you're storing one

  if (storedUser && token /* optionally validate token */) {
    dispatch(login(JSON.parse(storedUser)));
  }


     if (window.location.pathname === "/") {
      navigate("/home", { replace: true });
    }

  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;

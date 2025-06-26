import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from '../slice/userSlice';

const Login = () => {
  const [email, setEmail] = useState("toshi123@gmail.com");
  const [password, setPassword] = useState("Toshi@123456789");
  const [error, setError] = useState(""); // 🆕 Error message state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setError(""); // Clear previous errors

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const user = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(login(user.data.user));
        localStorage.setItem("user", JSON.stringify(user.data.user));
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🛑 Show error message if present */}
        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;

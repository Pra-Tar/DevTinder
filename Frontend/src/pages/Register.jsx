import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slice/userSlice"; // Make sure this path is correct

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // If your backend sets a cookie
        }
      );

      // If registration is successful, fetch user profile
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
      console.error("Registration error:", err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

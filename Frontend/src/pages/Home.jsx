import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-80 text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Welcome!</h1>
        <p className="mb-6 text-gray-600">Please login or register to continue</p>
        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-xl transition duration-200 border border-gray-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

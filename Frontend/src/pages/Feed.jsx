import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loggedInUser = useSelector((state) => state.user.user); // Get logged-in user

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/feed?page=1&limit=100",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const filtered = response.data.filter(
          (user) => user._id !== loggedInUser?._id
        );

        setUsers(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load user feed.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [loggedInUser?._id]);

  const handleAction = async (actionType) => {
    const currentUser = users[currentIndex];
    const endpoint = `http://localhost:3000/api/connections/${actionType}/${currentUser._id}`;

    try {
      await axios.post(
        endpoint,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error(`Failed to mark user as ${actionType}`, err);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading users...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (currentIndex >= users.length)
    return <div className="text-center mt-10 text-green-600 text-lg">You've reached the end of the feed!</div>;

  const user = users[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
            {user.name[0]}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handleAction("interested")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Interested
          </button>
          <button
            onClick={() => handleAction("ignored")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Ignored
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;

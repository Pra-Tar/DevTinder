import { useEffect, useState } from "react";
import axios from "axios";

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/connections/followers", {
          withCredentials: true,
        });

        // Optional: if fromUserId is just an ID, you'd need to fetch user details here
        setFollowers(res.data);
      } catch (err) {
        console.error("Error fetching followers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading followers...</p>;
  }

  if (followers.length === 0) {
    return <p className="text-center mt-8 text-gray-500">You have no followers yet.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Your Followers
      </h1>

      <div className="max-w-xl mx-auto flex flex-col gap-6">
        {followers.map((follower) => (
          <div
            key={follower._id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Follower ID:{" "}
              <span className="text-blue-600">{follower.fromUserId.name || follower.fromUserId}</span>
            </h2>
            <p className="text-sm text-gray-500">
              Status: {follower.connectionStatus}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;

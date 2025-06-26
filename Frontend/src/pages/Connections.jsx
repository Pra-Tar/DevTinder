import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Connections = () => {
  const [requests, setRequests] = useState([]);
  const user = useSelector((state) => state.user.user);


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/requests`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching connection requests:", err);
      }
    };

    fetchRequests();
  }, []);

const handleAccept = async (req) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/connections/accepted/${req.fromUserId._id}`, {}, {
      withCredentials: true,
    });

    // Remove the accepted request from the list
    setRequests((prev) => prev.filter((r) => r._id !== req._id));
  } catch (err) {
    console.error("Failed to accept connection:", err);
  }
};

const handleReject = async (req) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/connections/rejected/${req.fromUserId._id}`, {}, {
      withCredentials: true,
    });

    // Remove the rejected request from the list
    setRequests((prev) => prev.filter((r) => r._id !== req._id));
  } catch (err) {
    console.error("Failed to reject connection:", err);
  }
};

  const interestedRequests = requests.filter(
    (req) => req.connectionStatus === "interested"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Connection Requests
      </h1>

      {interestedRequests.length === 0 ? (
        <p className="text-center text-gray-500">No connection requests yet.</p>
      ) : (
        <div className="flex flex-col gap-6 max-w-xl mx-auto">
          {interestedRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                From: <span className="text-blue-600">{req.fromUserId.name}</span>
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAccept(req)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() =>{ console.log(req);
                     handleReject(req) }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;

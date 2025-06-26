import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleEdit = () => navigate("/edit");
  const goToFeed = () => navigate("/feed");
  const goToRequests = () => navigate("/connections");
  const goToFollowers = () => navigate("/followers");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md overflow-hidden">
        <div className="relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Profile"
            className="w-full h-56 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
            <h2 className="text-white text-2xl font-semibold">{user?.name}</h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {user?.bio ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia. Neque minus laudantium reiciendis dicta pariatur qui mollitia eius."}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={goToFeed} className="btn btn-outline w-full">
              Go to Feed
            </button>
            <button onClick={goToRequests} className="btn btn-outline w-full">
              Connection Requests
            </button>
            <button onClick={goToFollowers} className="btn btn-outline w-full col-span-2">
              View Followers
            </button>
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

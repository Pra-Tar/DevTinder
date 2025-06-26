import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from '../slice/userSlice';


const Navbar = () => {
  const userName = useSelector((state)=>state.user.user)
  const isAuthenticated = useSelector((state)=>state.user.isAuthenticated)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // clear redux
    localStorage.removeItem("user"); // if using token storage
    navigate("/home"); // redirect to login
  };

  const handleProfile = ()=>{
     const token = localStorage.getItem("user"); // or 'user' depending on your key
    if (token) {
      navigate("/profile");
    } else {
      alert("Please log in first");
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex items-center justify-between w-full">
        {/* Left: brand */}
        <a className="btn btn-ghost text-xl normal-case">daisyUI</a>

        {/* Right: user section */}
        <div className="flex items-center gap-3">
          {isAuthenticated && <p className="text-base font-medium">Welcome {userName?.name}!</p>} 
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between" onClick={handleProfile}>
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

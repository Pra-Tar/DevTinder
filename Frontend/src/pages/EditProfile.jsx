import { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = ()=>{
    const {profileImage, setProfileImage} = useState()
    const {name, setName} = useState()
    const {about, setAbout} = useState()
    const user = useSelector((state)=>state.user.user)


    const handleSubmit = ()=>{

    }

    const handleSave = ()=>{

    }
    
    return(
                <div className="flex justify-center items-center mt-6">
       <div className="flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Profile</legend>

        <label className="label">Name</label>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Profile Picture</label>
        <input
          type="text"
          className="input"
          placeholder="profile image"
          value={profileImage}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="label">About</label>
        <input
          type="text"
          className="input"
          placeholder="about"
          value={about}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-1">
        <button className="btn btn-primary mt-4 flex-1" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary mt-4 flex-1" onClick={handleSubmit}>
          Submit
        </button>
        </div>

      </fieldset>
    </div>


            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Profile Image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.name}</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia. Neque minus laudantium reiciendis dicta pariatur qui mollitia eius, assumenda beatae vero odio sit voluptatem, animi ipsa delectus ut voluptatum.</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </div>


  );

}

export default EditProfile;
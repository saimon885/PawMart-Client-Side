import React, { use, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";

const UserPropile = () => {
  const { user, updateuser, setUser } = use(AuthContext);
  const handleupdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photourl = e.target.photo.value;
    updateuser({ displayName: name, photoURL: photourl })
      .then(() => {
        toast.success("User Update Successful.");
        setUser({
          ...user,
          displayName: name,
          photoURL: photourl,
        });
      })
      .catch((error) => toast.error(error.code));
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="  my-8">
      <title>Your-Profile</title>
      <div className="flex gap-8 flex-col md:flex-row  justify-center items-center">
        <div
          data-aos="fade-right"
          className=" bg-[#636e72] rounded-2xl shadow-2xl text-white space-y-2 text-center px-4 py-6 lg:text-left"
        >
          <h1 className="text-center text-2xl font-medium">Your profile</h1>
          <img
            className="mx-auto rounded-full border-2 border-blue-900 shadow-sm"
            src={user?.photoURL}
            alt=""
          />
          <h1 className="text-center ">{user?.displayName}</h1>
          <h2>{user?.email}</h2>
        </div>
        <div data-aos="fade-left" className="card w-full max-w-sm ">
          <div className="card-body shadow-2xl rounded-2xl">
            <div className="border-b pb-2 border-dotted">
              <h1 className="text-2xl">Update Your Profile</h1>
            </div>
            <form onSubmit={handleupdate}>
              <label className="text-[17px] font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user && user.displayName}
                required
                className="input w-full"
                placeholder="Enter Your Name"
              />
              <label className="text-[17px] font-medium">Photo URL</label>
              <input
                type="text"
                name="photo"
                defaultValue={user && user.photoURL}
                required
                className="input w-full"
                placeholder="Enter Your PhotoURL"
              />
              <button className="btn btn-secondary mt-4">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPropile;

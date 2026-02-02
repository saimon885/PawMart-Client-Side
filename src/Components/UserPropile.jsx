import React, { use, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";

const UserPropile = () => {
  const { user, updateuser, setUser } = use(AuthContext);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const handleupdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photourl = e.target.photo.value;
    updateuser({ displayName: name, photoURL: photourl })
      .then(() => {
        toast.success("Profile Updated Successfully!");
        setUser({
          ...user,
          displayName: name,
          photoURL: photourl,
        });
      })
      .catch((error) => toast.error(error.code));
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 font-sans">
      <title>Profile | {user?.displayName}</title>
      
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        
        <div 
          data-aos="fade-up" 
          className="w-full md:w-80 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
        >
          <div className="relative group">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-md transition-transform duration-300 group-hover:scale-105"
              src={user?.photoURL}
              alt="Profile"
            />
            <div className="absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="mt-6">
            <h1 className="text-xl font-bold text-slate-900">{user?.displayName}</h1>
            <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
          </div>

          <div className="w-full mt-8 pt-6 border-t border-slate-50">
            <span className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-tighter">
              Account Verified
            </span>
          </div>
        </div>

        <div 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
            <p className="text-sm text-slate-500">Update your public profile information</p>
          </div>

          <form onSubmit={handleupdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Photo URL</label>
              <input
                type="text"
                name="photo"
                defaultValue={user?.photoURL}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <button className="w-full bg-secondary text-white py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98] mt-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPropile;
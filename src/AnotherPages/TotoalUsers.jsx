import React, { useEffect, useState } from "react";
import {
  FaUserShield,
  FaUserEdit,
  FaTrashAlt,
  FaUserTag,
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import Swal from "sweetalert2";

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://my-assignment-10-flax.vercel.app/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleRoleUpdate = (user, newRole) => {
    const updateData = { role: newRole };

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.name} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${newRole}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-flax.vercel.app/users/${user._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              const updatedUsers = users.map((u) =>
                u._id === user._id ? { ...u, role: newRole } : u,
              );
              setUsers(updatedUsers);

              Swal.fire({
                title: "Updated!",
                text: `User is now an ${newRole}.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-flax.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = users.filter((user) => user._id !== id);
              setUsers(remaining);
              Swal.fire("Deleted!", "User has been removed.", "success");
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-white">
        <div className="relative flex justify-center items-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-slate-100 opacity-75"></div>

          {/* Rotating border ring */}
          <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin"></div>

          {/* Center Pet Icon */}
          <div className="absolute text-slate-900 animate-bounce">
            <MdOutlinePets size={24} />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-800 animate-pulse">
            Loading
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Fetching your furry friends...
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-1.5 mt-4">
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            User Management
          </h2>
          <p className="text-gray-500 text-sm">
            Update roles or remove users from the system
          </p>
        </div>
        <div className="text-right">
          <span className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md">
            Total: {users.length}
          </span>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-100 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                Current Role
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-50"
                      src={user.photo}
                      alt=""
                    />
                    <div className="ml-4 font-bold text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <FaUserTag className="mr-2" /> {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center items-center space-x-2">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRoleUpdate(user, "user")}
                        className="flex items-center bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white border border-amber-200 px-3 py-1.5 rounded-lg transition-all text-xs font-bold"
                        title="Demote to User"
                      >
                        <FaUserEdit className="mr-1" /> Make User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleUpdate(user, "admin")}
                        className="flex items-center bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-200 px-3 py-1.5 rounded-lg transition-all text-xs font-bold"
                        title="Promote to Admin"
                      >
                        <FaUserShield className="mr-1" /> Make Admin
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all shadow-sm"
                      title="Delete Permanently"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalUsers;

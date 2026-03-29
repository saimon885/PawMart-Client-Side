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
    fetch(`https://my-assignment-10-lime.vercel.app/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRoleUpdate = (user, newRole) => {
    const updateData = { role: newRole };

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.name} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-lime.vercel.app/users/${user._id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updateData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              setUsers(
                users.map((u) =>
                  u._id === user._id ? { ...u, role: newRole } : u,
                ),
              );
              Swal.fire("Updated!", "", "success");
            }
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-lime.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setUsers(users.filter((u) => u._id !== id));
              Swal.fire("Deleted!", "", "success");
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-base-100 text-base-content">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-base-300 opacity-75"></div>
          <div className="h-14 w-14 rounded-full border-4 border-base-300 border-t-primary animate-spin"></div>
          <div className="absolute text-primary animate-bounce">
            <MdOutlinePets size={24} />
          </div>
        </div>
        <h3 className="mt-4 text-sm font-bold">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 md:mt-10 p-4 md:p-6 bg-base-100 shadow-xl rounded-2xl text-base-content">
      <title>PetBond - Total Users</title>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-6 border-b border-base-300 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            User Management
          </h2>
          <p className="text-base-content/60 text-sm">Manage users easily</p>
        </div>
        <span className="bg-primary text-primary-content px-4 py-2 rounded-lg text-sm font-bold text-center">
          Total: {users.length}
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-base-300 rounded-xl">
        <table className="min-w-full">
          <thead className="bg-base-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold">User</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Role</th>
              <th className="px-6 py-3 text-center text-xs font-bold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-base-200 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                    src={user.photo}
                    alt=""
                  />
                  <span className="font-bold">{user.name}</span>
                </td>

                <td className="px-6 py-4 text-sm">{user.email}</td>

                <td className="px-6 py-4">
                  <span className="badge badge-outline font-bold flex gap-1">
                    <FaUserTag /> {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2 flex-wrap">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRoleUpdate(user, "user")}
                        className="btn btn-warning btn-xs"
                      >
                        <FaUserEdit /> User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleUpdate(user, "admin")}
                        className="btn btn-primary btn-xs"
                      >
                        <FaUserShield /> Admin
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-error btn-xs"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-base-200 p-4 rounded-xl shadow flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.photo}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />
              <div>
                <h4 className="font-bold">{user.name}</h4>
                <p className="text-sm text-base-content/60">{user.email}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="badge badge-outline">{user.role}</span>

              <div className="flex gap-2">
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleRoleUpdate(user, "user")}
                    className="btn btn-warning btn-xs"
                  >
                    User
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleUpdate(user, "admin")}
                    className="btn btn-primary btn-xs"
                  >
                    Admin
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-error btn-xs"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalUsers;

import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  MdBrowserUpdated,
  MdDeleteForever,
  MdOutlinePets,
  MdPostAdd,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Loading from "../Pages/Loading";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [mylist, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const ModlaRef = useRef(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(
        `https://my-assignment-10-lime.vercel.app/mylistdata?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setMyList(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-lime.vercel.app/mylistdata/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setMyList(mylist.filter((list) => list._id !== id));
          });

        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const handleUpdata = () => {
    ModlaRef.current.showModal();
  };

  const updateListData = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const id = e.target.proId.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.imageurl.value;
    const email = e.target.email.value;
    const date = format(new Date(), "dd-MM-yyyy");

    const NewUpdateList = {
      name,
      category,
      price,
      location,
      description,
      image,
      id,
      email,
      date,
    };

    fetch(`https://my-assignment-10-lime.vercel.app/mylistdata/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(NewUpdateList),
    })
      .then((res) => res.json())
      .then(() => {
        ModlaRef.current.close();
        toast.success("Your listing has been updated successfully!");
        setMyList(
          mylist.map((item) =>
            item._id === id ? { ...item, ...NewUpdateList } : item,
          ),
        );
      });
  };

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10 px-4 ">
      <title>PetBond - My Listings</title>
      <h1 className="text-center font-bold text-xl md:text-2xl mb-6 text-primary uppercase">
        My Listings
      </h1>

      {mylist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-base-200 rounded-2xl">
          <MdPostAdd size={60} className="text-base-content/30" />
          <h2 className="text-xl font-bold mt-4">No Listings Yet</h2>
          <Link to="/dashboard/addlistdata" className="btn btn-primary mt-4">
            Add Listing
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border rounded-xl bg-base-100">
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mylist.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>
                      <span className="badge badge-outline">
                        {data.category}
                      </span>
                    </td>
                    <td className="font-bold">{data.price}</td>
                    <td>{data.location}</td>
                    <td>{data.date}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={handleUpdata}
                        className="btn btn-primary btn-xs"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="btn btn-secondary btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card */}
          <div className="md:hidden space-y-4">
            {mylist.map((data) => (
              <div key={data._id} className="bg-base-200 p-4 rounded-xl shadow">
                <h3 className="font-bold text-lg">{data.name}</h3>
                <p className="text-sm">{data.category}</p>
                <p className="font-bold">{data.price}</p>
                <p className="text-sm">{data.location}</p>
                <p className="text-xs">{data.date}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleUpdata}
                    className="btn btn-primary btn-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-secondary btn-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal Section */}
      {mylist &&
        mylist.map((data) => (
          <div key={data._id}>
            <dialog
              ref={ModlaRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box p-6 sm:p-8  dark:bg-gray-900 rounded-2xl shadow-lg border border-base-300 dark:border-gray-700">
                <form onSubmit={updateListData} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="label text-base-content dark:text-base-100 font-medium">
                      Product / Pet Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={data.name}
                      required
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-800 dark:text-base-100 dark:border-gray-600"
                      placeholder="Enter Product/Pet Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="label text-base-content dark:text-base-100 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={data.email}
                      readOnly
                      className="input input-bordered w-full bg-base-200 dark:bg-gray-800 text-base-content dark:text-base-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Hidden Product ID */}
                  <input
                    type="text"
                    name="proId"
                    defaultValue={data._id}
                    readOnly
                    className="hidden"
                  />

                  {/* Category Dropdown */}
                  <div>
                    <label className="label text-base-content dark:text-base-100 font-medium">
                      Category
                    </label>
                    <select
                      defaultValue={data.category}
                      name="category"
                      required
                      className="select select-bordered w-full focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-base-100 dark:border-gray-600"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="Pets (Adoption)">Pets (Adoption)</option>
                      <option value="Pet Food">Pet Food</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Pet Care Products">
                        Pet Care Products
                      </option>
                    </select>
                  </div>

                  {/* Price & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label text-base-content dark:text-base-100 font-medium">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        defaultValue={data.price}
                        required
                        className="input input-bordered w-full focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-base-100 dark:border-gray-600"
                        placeholder="Enter Price"
                      />
                    </div>
                    <div>
                      <label className="label text-base-content dark:text-base-100 font-medium">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        defaultValue={data.location}
                        required
                        className="input input-bordered w-full focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-base-100 dark:border-gray-600"
                        placeholder="Enter Location"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="label text-base-content dark:text-base-100 font-medium">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={data.description}
                      required
                      rows="4"
                      className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-base-100 dark:border-gray-600"
                      placeholder="Enter description"
                    ></textarea>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="label text-base-content dark:text-base-100 font-medium">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="imageurl"
                      defaultValue={data.image}
                      required
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-base-100 dark:border-gray-600"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Submit Button */}
                  <input
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                    value="Update List"
                  />
                </form>

                {/* Modal Actions */}
                <div className="modal-action mt-4">
                  <form method="dialog">
                    <button className="btn btn-outline w-full sm:w-auto">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
    </div>
  );
};

export default MyListing;

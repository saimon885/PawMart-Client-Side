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

const MyListing = () => {
  const { user } = use(AuthContext);
  const [mylist, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const ModlaRef = useRef(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(
        `https://my-assignment-10-flax.vercel.app/mylistdata?email=${user.email}`,
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-flax.vercel.app/mylistdata/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            const remaining = mylist.filter((list) => list._id !== id);
            setMyList(remaining);
          });
        Swal.fire({
          title: "Delete!",
          text: "Your Listed Item has been deleted.",
          icon: "success",
        });
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
    const currntDate = new Date();
    const date = format(currntDate, "dd-MM-yyyy");

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

    fetch(`https://my-assignment-10-flax.vercel.app/mylistdata/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewUpdateList),
    })
      .then((res) => res.json())
      .then(() => {
        ModlaRef.current.close();
        toast.success("List Update Successful.");

        const updatedList = mylist.map((item) =>
          item._id === id ? { ...item, ...NewUpdateList } : item,
        );
        setMyList(updatedList);
      });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-white">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-slate-100 opacity-75"></div>
          <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin"></div>
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
      </div>
    );
  }

  return (
    <div className="py-10">
      <title>PetBond-MyList</title>
      <h1 className="text-center font-bold text-2xl mb-8 text-secondary uppercase tracking-wider">
        My-List
      </h1>

      {mylist.length === 0 ? (
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <div className="relative mb-6">
              <div className="bg-white p-6 rounded-full shadow-sm">
                <MdPostAdd size={60} className="text-slate-300" />
              </div>
              <MdOutlinePets
                className="absolute -top-2 -right-2 text-secondary animate-bounce"
                size={24}
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-700">
              No Listings Yet!
            </h2>
            <p className="text-slate-500 mt-2 mb-8 text-center max-w-xs">
              It seems you haven't added any pets or products to your list.
            </p>
            <Link
              to="/dashboard/addlistdata"
              className="btn btn-secondary text-white px-10 rounded-xl shadow-lg hover:shadow-secondary/20 transition-all"
            >
              Add Your First List
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto mx-5 rounded-box border border-base-content/4 bg-base-100 shadow-sm">
          <table className="table">
            <thead>
              <tr className="bg-[#f3f4f6] text-black">
                <th>S/N</th>
                <th>Product/Listing Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>PickUp Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mylist.map((data, index) => (
                <tr
                  key={data._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td className="font-medium text-slate-700">{data.name}</td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {data.category}
                    </span>
                  </td>
                  <td className="font-bold">{data.price}</td>
                  <td>{data.location}</td>
                  <td>{data.date}</td>
                  <td className="flex flex-row gap-2">
                    <button
                      onClick={handleUpdata}
                      className="btn btn-primary btn-sm rounded-lg"
                    >
                      Update <MdBrowserUpdated size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-secondary btn-sm rounded-lg"
                    >
                      Delete <MdDeleteForever size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Section */}
      {mylist &&
        mylist.map((data) => (
          <div key={data._id}>
            <dialog
              ref={ModlaRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form onSubmit={updateListData}>
                  <fieldset className="fieldset bg-white">
                    {/* Name */}

                    <label className="label">Product/Pet Name</label>

                    <input
                      type="text"
                      name="name"
                      defaultValue={data.name}
                      required
                      className="input focus:border-0 focus:outline-gray-200 w-full"
                      placeholder="Enter Product/Pet Name"
                    />

                    <label className="label">Email</label>

                    <input
                      type="email"
                      name="email"
                      defaultValue={data.email}
                      readOnly
                      className="input focus:border-0 focus:outline-gray-200 w-full"
                      placeholder="Enter Product/Pet Name"
                    />

                    <input
                      type="text"
                      name="proId"
                      defaultValue={data._id}
                      readOnly
                      className="input focus:border-0 hidden focus:outline-gray-200 w-full"
                      placeholder="Enter Product/Pet Name"
                    />

                    {/* Category Dropdown */}

                    <div>
                      <label className="label font-medium mb-1.5">
                        Category
                      </label>

                      <select
                        defaultValue={data.category}
                        name="category"
                        required
                        className="select w-full focus:border-0 focus:outline-gray-200"
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

                    <div className="flex gap-4">
                      <div>
                        {" "}
                        {/* price */}
                        <label className="label">Price</label>
                        <input
                          type="text"
                          name="price"
                          defaultValue={data.price}
                          required
                          className="input focus:border-0 w-full focus:outline-gray-200"
                          placeholder="Enter Price"
                        />
                      </div>

                      <div>
                        {" "}
                        {/* Location */}
                        <label className="label">Location</label>
                        <input
                          type="text"
                          name="location"
                          defaultValue={data.location}
                          required
                          className="input w-full focus:border-0 focus:outline-gray-200"
                          placeholder="Enter Location"
                        />
                      </div>
                    </div>

                    {/* Description Textarea */}

                    <div>
                      <label className="label font-medium mb-1.5">
                        Description
                      </label>

                      <textarea
                        name="description"
                        defaultValue={data.description}
                        required
                        rows="3"
                        className="textarea w-full focus:border-0 focus:outline-gray-200 h-[120px]"
                        placeholder="Enter description"
                      ></textarea>
                    </div>

                    {/* Image URL */}

                    <div>
                      <label className="label font-medium mb-1.5">
                        Image URL
                      </label>

                      <input
                        type="url"
                        name="imageurl"
                        defaultValue={data.image}
                        required
                        className="input w-full focus:border-0 focus:outline-gray-200"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <input
                      type="submit"
                      className="btn btn-primary mt-4"
                      value="Update List"
                    />
                  </fieldset>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}

                    <button className="btn">Close</button>
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

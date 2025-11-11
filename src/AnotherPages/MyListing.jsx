import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { toast } from "react-toastify";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [mylist, setMyList] = useState();
  const ModlaRef = useRef(null);
  useEffect(() => {
    user &&
      fetch(`http://localhost:3000/mylistdata?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("after my list", data);
          setMyList(data);
        });
  }, [user]);
  // console.log(mylist);
  const handleDelete = (id) => {
    // console.log(id);
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
        fetch(`http://localhost:3000/mylistdata/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            // console.log("after delete", data);
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
    console.log(NewUpdateList);
    // update List
    fetch(`http://localhost:3000/mylistdata/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewUpdateList),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after update", data);
      });
  };
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/4 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mylist &&
              mylist.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.category}</td>
                  <td>{data.price}</td>
                  <td>{data.location}</td>
                  <td>{data.date}</td>
                  <td className="flex flex-row gap-2">
                    <button onClick={handleUpdata} className="btn btn-primary">
                      Update{" "}
                    </button>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-primary"
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
                        className="select w-full  focus:border-0 focus:outline-gray-200"
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

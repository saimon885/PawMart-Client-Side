import React, { use } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { format } from "date-fns";
import { toast } from "react-toastify";

const AddListingPage = () => {
  const { user } = use(AuthContext);
  const handleAddList = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.imageurl.value;
    const email = user?.email;
    const currntDate = new Date();
    const date = format(currntDate, "dd-MM-yyyy");
    // console.log({
    //   name,
    //   category,
    //   price,
    //   location,
    //   description,
    //   image,
    //   email,
    //   date,
    // });
    const NewAddList = {
      name,
      category,
      price,
      location,
      description,
      image,
      email,
      date,
    };
    fetch("http://localhost:3000/petListdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewAddList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("List Added Successful.");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <h1 className="text-5xl font-bold heading-Font text-center my-3">
        Add New List
      </h1>
      <div className="flex justify-center items-center my-5">
        <div className="card w-4xs shadow-xl p-4">
          <form onSubmit={handleAddList}>
            <fieldset className="fieldset bg-white">
              {/* Name */}
              <label className="label">Product/Pet Name</label>
              <input
                type="text"
                name="name"
                required
                className="input focus:border-0 focus:outline-gray-200 w-full"
                placeholder="Enter Product/Pet Name"
              />
              {/* Category Dropdown */}
              <div>
                <label className="label font-medium mb-1.5">Category</label>
                <select
                  defaultValue={""}
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
                  <option value="Pet Care Products">Pet Care Products</option>
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
                    required
                    className="input focus:border-0 w-full focus:outline-gray-200"
                    placeholder="Enter Price"
                  />
                </div>
                <div>
                  {/* Location */}
                  <label className="label">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="input w-full focus:border-0 focus:outline-gray-200"
                    placeholder="Enter Location"
                  />
                </div>
              </div>
              {/* Description Textarea */}
              <div>
                <label className="label font-medium mb-1.5">Description</label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  className="textarea w-full focus:border-0 focus:outline-gray-200 h-[150px]"
                  placeholder="Enter description"
                ></textarea>
              </div>
              {/* Image URL */}
              <div>
                <label className="label font-medium mb-1.5">Image URL</label>
                <input
                  type="url"
                  name="imageurl"
                  required
                  className="input w-full focus:border-0 focus:outline-gray-200"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <input
                type="submit"
                className="btn btn-primary mt-4"
                value="Add List"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;

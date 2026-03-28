import React, { use } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import frame from "../util/confetti";
import { FaDog, FaCat, FaPaw } from "react-icons/fa";
import { GiBirdMask, GiRabbit } from "react-icons/gi";

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
    const email = e.target.email.value;
    const date = e.target.date.value;

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

    fetch("https://my-assignment-10-lime.vercel.app/petListdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewAddList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Your listing has been added successfully!");
          frame(3);
          e.target.reset();
        }
      });
  };

  return (
    <div className="min-h-screen py-10 relative overflow-hidden bg-base-200 text-base-content">
      <title>PetBond - Add List</title>

      {/* Watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 text-base-content">
        <FaDog className="absolute top-10 left-10 text-[150px] -rotate-12" />
        <FaCat className="absolute bottom-20 right-10 text-[130px] rotate-12" />
        <FaPaw className="absolute top-1/2 left-20 text-[80px] rotate-45" />
        <GiBirdMask className="absolute top-20 right-1/4 text-[100px] -rotate-12" />
        <GiRabbit className="absolute bottom-1/4 left-1/4 text-[110px] rotate-12" />
        <FaPaw className="absolute bottom-10 right-1/3 text-[60px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-base-100/90 backdrop-blur-sm rounded-2xl shadow-md border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-base-100 border-b border-base-300 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-base-content text-center uppercase tracking-wide">
              Add New List
            </h1>
            <p className="text-base-content/70 text-center mt-1 text-sm">
              Fill in the details to list your pet or product
            </p>
          </div>

          <form onSubmit={handleAddList} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label font-semibold text-base-content">
                  Product/Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all bg-base-100 text-base-content"
                  placeholder="e.g. Golden Retriever, Cat Food"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold text-base-content">
                  Category
                </label>
                <select
                  defaultValue={""}
                  name="category"
                  required
                  className="select select-bordered w-full focus:ring-2 focus:ring-primary/20 bg-base-100 text-base-content"
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

              <div>
                <label className="label font-semibold text-base-content">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-base-100 text-base-content"
                  placeholder="Enter Price"
                />
              </div>

              <div>
                <label className="label font-semibold text-base-content">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-base-100 text-base-content"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="label font-semibold text-base-content">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-base-200 text-base-content cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label font-semibold text-base-content">
                  Pick Up Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-base-100 text-base-content"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold text-base-content">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-primary/20 bg-base-100 text-base-content"
                  placeholder="Provide a detailed description..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold text-base-content">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageurl"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-base-100 text-base-content"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="btn bg-primary skeleton  w-full mt-4 shadow-md  hover:shadow-lg transition-all"
              >
                Add To List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;

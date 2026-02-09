import React, { use } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import frame from "../util/confetti";
// Icons for watermark
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

    fetch("https://my-assignment-10-flax.vercel.app/petListdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewAddList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("List Added Successful");
          frame(3);
          e.target.reset();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 relative overflow-hidden">
      <title>PetBond - Add List</title>

      {/* --- Watermarks Section --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0">
        <FaDog className="absolute top-10 left-10 text-[150px] -rotate-12" />
        <FaCat className="absolute bottom-20 right-10 text-[130px] rotate-12" />
        <FaPaw className="absolute top-1/2 left-20 text-[80px] rotate-45" />
        <GiBirdMask className="absolute top-20 right-1/4 text-[100px] -rotate-12" />
        <GiRabbit className="absolute bottom-1/4 left-1/4 text-[110px] rotate-12" />
        <FaPaw className="absolute bottom-10 right-1/3 text-[60px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center uppercase tracking-wide">
              Add New List
            </h1>
            <p className="text-gray-500 text-center mt-1 text-sm">
              Fill in the details to list your pet or product
            </p>
          </div>

          <form onSubmit={handleAddList} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label font-semibold text-gray-700">
                  Product/Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                  placeholder="e.g. Golden Retriever, Cat Food"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold text-gray-700">
                  Category
                </label>
                <select
                  defaultValue={""}
                  name="category"
                  required
                  className="select select-bordered w-full focus:ring-2 focus:ring-primary/20 bg-white"
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
                <label className="label font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-white"
                  placeholder="Enter Price"
                />
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-white"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  Pick Up Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-primary/20 bg-white"
                  placeholder="Provide a detailed description..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageurl"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 bg-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full mt-4 skeleton bg-primary shadow-md hover:shadow-lg transition-all"
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

import React from "react";

const AddListingPage = () => {
  const handleAddList = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const Location = e.target.location.value;
    const description = e.target.description.value;
    const Image = e.target.imageurl.value;
    console.log({ name, category, price, Location, description, Image });
  };
  return (
    <div>
      <h1 className="text-5xl font-bold heading-Font text-center my-5">
        Add New List
      </h1>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-xs shadow-xl p-4">
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
              {/* price */}
              <label className="label">Price</label>
              <input
                type="text"
                name="price"
                required
                className="input focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter Price"
              />
              {/* Location */}
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                required
                className="input w-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter Location"
              />
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

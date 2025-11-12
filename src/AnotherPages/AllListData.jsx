import React, { useState } from "react";
import { useLoaderData } from "react-router";
import SingleRecentCategory from "../Pages/SingleRecentCategory";

const AllListData = () => {
  const alldata = useLoaderData();
  const [searchdata, setSearchData] = useState(alldata);
  //   console.log(alldata);
  const handleSerch = (e) => {
    e.preventDefault();
    const search_text = e.target.serchinput.value;
    console.log(search_text);
    fetch(`http://localhost:3000/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("after search", data);
        setSearchData(data);
      });
  };
  // const handleCategory = () => {
  //   console.log("Hello WOrsl");
  // };
  return (
    <div>
      <title>PetBond-Pets & Supplies</title>
      <div className="flex items-center justify-between mb-10">
        <div></div>
        <form onSubmit={handleSerch} className="text-center">
          <div className="join">
            <div>
              <label className="input validator max-w-70 join-item">
                <input
                  className="w-full"
                  type="search"
                  name="serchinput"
                  placeholder="Search Product.."
                />
              </label>
            </div>
            <input
              className="btn btn-primary join-item"
              type="submit"
              value="Search"
            />
          </div>
        </form>
        <div>
          {/* <form onSubmit={handleCategory}>
            <div>
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
          </form> */}
        </div>
      </div>
      <div>
        {searchdata ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
            {searchdata.map((petData) => (
              <SingleRecentCategory
                key={petData._id}
                petData={petData}
              ></SingleRecentCategory>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center my-5">
              Product is Not Availableee !
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListData;

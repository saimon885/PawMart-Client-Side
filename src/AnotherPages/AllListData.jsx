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
  return (
    <div>
      <div className="flex justify-center mb-10">
        <form onSubmit={handleSerch} className="text-center">
          <div className="join">
            <div>
              <label className="input validator w-xs join-item">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {searchdata.map((petData) => (
          <SingleRecentCategory
            key={petData._id}
            petData={petData}
          ></SingleRecentCategory>
        ))}
      </div>
    </div>
  );
};

export default AllListData;

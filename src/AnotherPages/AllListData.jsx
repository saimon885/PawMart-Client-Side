import React, { useState } from "react";
import { useLoaderData } from "react-router";
import SingleRecentCategory from "../Pages/SingleRecentCategory";
import { useTypewriter } from "react-simple-typewriter";

const AllListData = () => {
  const alldata = useLoaderData();
  const [text] = useTypewriter({
    words: [
      "Pets & Supplies",
      "Pets (Adoption)",
      "Accessories",
      "Pet Care Products",
    ],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  const [searchdata, setSearchData] = useState(alldata);
  const [allListData, setAllListData] = useState(alldata);

  //   console.log(alldata);
  const handleSerch = (e) => {
    e.preventDefault();
    const text = e.target.serchinput.value;
    const search_text = text.trim().toLowerCase();
    // console.log(search_text);
    // console.log(search_text);
    fetch(
      `https://my-assignment-10-flax.vercel.app/search?search=${search_text}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      });
  };
  const handleSort = (categoryType) => {
    if (categoryType === "Sort By Category") {
      setAllListData(allListData);
      return;
    }
    const filtered = allListData.filter(
      (item) => item.category === categoryType
    );

    setSearchData(filtered);
  };
  return (
    <div className="mx-5 md:mx-10">
      <title>PetBond-Pets & Supplies</title>
      <div className="text-3xl text-center gap-2 flex justify-center items-center mx-auto font-bold mb-5">
        <img
          className="w-[40px]"
          src="https://img.icons8.com/?size=48&id=GzyPUsSOh1UV&format=png"
          alt=""
        />
        <span>{text}</span>
      </div>
      <div className="flex items-center flex-col md:flex-row justify-between mb-10">
        <div className=""></div>
        <div>
          {" "}
          <form onSubmit={handleSerch} className="text-center md:ml-35">
            <div className="join">
              <div>
                <label className="input validator join-item">
                  <input
                    className="w-full"
                    type="search"
                    name="serchinput"
                    placeholder="Search By Name.."
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
        <div className="mt-5 md:mt-0">
          <select
            onClick={(e) => handleSort(e.target.value)}
            className="select "
          >
            <option value={"Sort By Category"} selected disabled={true}>
              Sort By Category
            </option>
            <option value={"Pets (Adoption)"}>Pets (Adoption)</option>
            <option value={"Pet Food"}>Pet Food</option>
            <option value={"Accessories"}>Accessories</option>
            <option value={"Pet Care Products"}>Pet Care Products</option>
          </select>
        </div>
      </div>
      <div>
        {searchdata.length === 0 ? (
          <div>
            <h1 className="text-3xl my-5 font-bold text-center my-5">
              Search Item is Not Availableee !
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
            {searchdata.map((petData) => (
              <SingleRecentCategory
                key={petData._id}
                petData={petData}
              ></SingleRecentCategory>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListData;

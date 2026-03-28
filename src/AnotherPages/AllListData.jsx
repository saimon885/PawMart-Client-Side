import React, { useEffect, useState } from "react";

import SingleRecentCategory from "../Pages/SingleRecentCategory";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FiSearch, FiFilter } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AllListData = () => {
  const [alldata, setallData] = useState();
  const [totalPage, setTotalPage] = useState();
  const [categorySort, setCategorySort] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setloading] = useState(true);
  const [searchData, setSearchData] = useState("");
  const limit = 12;

  useEffect(() => {
    const categoryParam = categorySort ? `&category=${categorySort}` : "";

    fetch(
      `https://my-assignment-10-lime.vercel.app/petListdata?limit=${limit}&skip=${
        currentPage * limit
      }${categoryParam}&search=${searchData}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setallData(data.data);
        const page = Math.ceil(data.total / limit);
        setTotalPage(page);
        setloading(false);
      });
  }, [currentPage, categorySort, searchData]);

  const [text] = useTypewriter({
    words: [
      "Pets & Supplies",
      "Pets (Adoption)",
      "Accessories",
      "Pet Care Products",
    ],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 50,
  });

  const sortingData = (e) => {
    const sortingData = e.target.value;
    setCategorySort(sortingData);
    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.serchinput.value;
    setSearchData(searchValue);
    setCurrentPage(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>PetBond | All Items</title>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-base-200 dark:bg-base-300 px-6 py-3 rounded-2xl border border-base-300 dark:border-base-700 shadow-sm">
          <img
            className="w-10 h-10 object-contain"
            src="https://img.icons8.com/?size=48&id=GzyPUsSOh1UV&format=png"
            alt="pet icon"
          />
          <h1 className="text-2xl md:text-4xl font-black text-base-content dark:text-base-content tracking-tight">
            {text}
            <Cursor cursorColor="#d72050" />
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-200 dark:bg-base-300 p-4 rounded-[2rem] border border-base-300 dark:border-base-700 shadow-xl shadow-base-200/40 mb-12">
        <form onSubmit={handleSearch} className="w-full md:max-w-md">
          <div className="relative group">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 dark:text-base-content/40 group-focus-within:text-base-content transition-colors"
              size={20}
            />
            <input
              type="search"
              name="serchinput"
              placeholder="Search by pet name..."
              className="w-full pl-12  pr-24 py-3.5 bg-base-100 dark:bg-base-300 border-none rounded-2xl focus:bg-base-100 dark:focus:bg-base-200 focus:ring-4 focus:ring-base-300 dark:focus:ring-base-700 transition-all text-sm font-medium outline-none text-base-content dark:text-base-content/90 placeholder:text-base-content/50 dark:placeholder:text-base-content/40"
            />
            <button
              type="submit"
              className="absolute right-2 top-1.5 bottom-1.5 px-5 bg-primary text-base-100 text-xs font-bold rounded-xl hover:bg-secondary transition-all"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2 text-base-content/50 dark:text-base-content/40">
            <FiFilter size={18} />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Filter:
            </span>
          </div>
          <select
            onChange={sortingData}
            className="w-full md:w-56 px-4 py-3.5 bg-base-200 dark:bg-base-300 border-none rounded-2xl text-sm font-bold text-base-content dark:text-base-content/90 outline-none cursor-pointer focus:ring-4 focus:ring-base-300 dark:focus:ring-base-700 transition-all appearance-none"
            defaultValue=""
          >
            <option value="">All Categories</option>
            <option value="Pets (Adoption)">Pets (Adoption)</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Pet Care Products</option>
          </select>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center">
            <div className="min-h-[80vh] flex flex-col justify-center items-center bg-base-100 dark:bg-base-200">
              <div className="relative flex justify-center items-center">
                <div className="absolute animate-ping h-16 w-16 rounded-full bg-base-200 dark:bg-base-300 opacity-75"></div>
                <div className="h-14 w-14 rounded-full border-4 border-base-200 dark:border-base-300 border-t-base-content animate-spin"></div>
                <div className="absolute text-base-content dark:text-base-content/90 animate-bounce">
                  <MdOutlinePets size={24} />
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center gap-1">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-base-content dark:text-base-content/80 animate-pulse">
                  Loading
                </h3>
                <p className="text-[10px] text-base-content/50 dark:text-base-content/40 font-medium">
                  Fetching your furry friends...
                </p>
              </div>

              <div className="flex gap-1.5 mt-4">
                <div className="w-1.5 h-1.5 bg-base-200 dark:bg-base-300 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
                <div className="w-1.5 h-1.5 bg-base-300 dark:bg-base-200 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                <div className="w-1.5 h-1.5 bg-base-200 dark:bg-base-300 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
              </div>
            </div>
          </div>
        ) : alldata.length === 0 ? (
          <div className="py-20 text-center animate-fade-in">
            <div className="bg-base-200 dark:bg-base-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch
                size={32}
                className="text-base-content/40 dark:text-base-content/50"
              />
            </div>
            <h2 className="text-2xl font-bold text-base-content dark:text-base-content/90">
              No Items Found
            </h2>
            <p className="text-base-content/50 dark:text-base-content/40 mt-2">
              Try searching for something else or change the category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {alldata.map((petData) => (
              <SingleRecentCategory key={petData._id} petData={petData} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-row items-center gap-3 justify-center mt-15">
        {currentPage > 0 && (
          <div
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-outline"
          >
            <ChevronLeft /> prev
          </div>
        )}
        {[...Array(totalPage).keys()].map((d) => (
          <button
            key={d}
            onClick={() => setCurrentPage(d)}
            className={`btn ${d === currentPage ? "btn-primary" : "btn-outline"}`}
          >
            {d + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <div
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-outline"
          >
            Next <ChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListData;

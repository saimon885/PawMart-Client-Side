import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import SingleRecentCategory from "../Pages/SingleRecentCategory";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FiSearch, FiFilter } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";

const AllListData = () => {
  const alldata = useLoaderData();
  const [searchdata, setSearchData] = useState([]);
  const [allListData, setAllListData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    if (alldata) {
      setAllListData(alldata);
      setSearchData(alldata);
      setLoading(false);
    }
  }, [alldata]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.serchinput.value.trim().toLowerCase();

    if (!search_text) {
      setSearchData(allListData);
      return;
    }

    setLoading(true);

    fetch(
      `https://my-assignment-10-flax.vercel.app/search?search=${search_text}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
        setLoading(false);
      })
      .catch(() => {
        setSearchData([]);
        setLoading(false);
      });
  };

  const handleSort = (categoryType) => {
    setLoading(true);

    if (categoryType === "all") {
      setSearchData(allListData);
    } else {
      const filtered = allListData.filter(
        (item) => item.category === categoryType,
      );
      setSearchData(filtered);
    }

    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>PetBond | All Items</title>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <img
            className="w-10 h-10 object-contain"
            src="https://img.icons8.com/?size=48&id=GzyPUsSOh1UV&format=png"
            alt="pet icon"
          />
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            {text}
            <Cursor cursorColor="#ef4444" />
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 mb-12">
        <form onSubmit={handleSearch} className="w-full md:max-w-md">
          <div className="relative group">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
              size={20}
            />
            <input
              type="search"
              name="serchinput"
              placeholder="Search by pet name..."
              className="w-full pl-12 pr-24 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-900 transition-all text-sm font-medium outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1.5 bottom-1.5 px-5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <FiFilter size={18} />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Filter:
            </span>
          </div>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="w-full md:w-56 px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer focus:ring-4 focus:ring-slate-100 transition-all appearance-none"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
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

              <div className="flex gap-1.5 mt-4">
                <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
              </div>
            </div>
          </div>
        ) : searchdata.length === 0 ? (
          <div className="py-20 text-center animate-fade-in">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch size={32} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              No Items Found
            </h2>
            <p className="text-slate-500 mt-2">
              Try searching for something else or change the category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchdata.map((petData) => (
              <SingleRecentCategory key={petData._id} petData={petData} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListData;

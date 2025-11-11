import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import SingleRecentCategory from "./SingleRecentCategory";
import AddTwoBanner from "../Components/Banner/AddTwoBanner";

const RecentCategoryData = () => {
  const { name } = useParams();
  const Recentdata = useLoaderData();
  // console.log(Recentdata);
  const [recent, setRecent] = useState([]);
  const fixedRecent = recent.slice(0, 6);
  // console.log(recent);
  console.log(fixedRecent);

  useEffect(() => {
    if (Recentdata && Array.isArray(Recentdata)) {
      const filterData = Recentdata.filter((data) => data.category == name);
      setRecent(filterData);
    }
  }, [name, Recentdata]);
  return (
    <div>
      <div className="grid grid-cols-1 border-b border-dotted border-accent pb-5 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fixedRecent.map((petData) => (
          <SingleRecentCategory
            key={petData._id}
            petData={petData}
          ></SingleRecentCategory>
        ))}
      </div>
      <AddTwoBanner></AddTwoBanner>
    </div>
  );
};

export default RecentCategoryData;

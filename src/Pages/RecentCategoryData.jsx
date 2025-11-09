import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import SingleRecentCategory from "./SingleRecentCategory";

const RecentCategoryData = () => {
  const { name } = useParams();
  const Recentdata = useLoaderData();
  const [recent, setRecent] = useState([]);
  console.log(recent);
  useEffect(() => {
    if (Recentdata && Array.isArray(Recentdata)) {
      const filterData = Recentdata.filter((data) => data.category == name);
      setRecent(filterData);
    }
  }, [name, Recentdata]);
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {recent.map(petData => <SingleRecentCategory petData={petData}></SingleRecentCategory>)}
  </div>;
};

export default RecentCategoryData;

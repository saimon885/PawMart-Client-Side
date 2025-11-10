import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import SingleRecentCategory from "./SingleRecentCategory";

const RecentCategoryData = () => {
  const { name } = useParams();
  const Recentdata = useLoaderData();
  // const [homedata, sethomedata] = useState([])
  console.log(Recentdata);
  const [recent, setRecent] = useState([]);
  console.log(recent);

  // useEffect (()=>{
  //   fetch('http://localhost:3000/petListdata')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log("after get", data);
  //     sethomedata
  //   })

  // },[])
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

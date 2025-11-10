import React from "react";
import { useLoaderData } from "react-router";
import SingleListingDetails from "./SingleListingDetails";

const ListingDetails = () => {
  const ListingData = useLoaderData();
  //   console.log(ListingData);

  return (
    <div>
      {ListingData.map((data) => (
        <SingleListingDetails key={data._id} data={data}></SingleListingDetails>
      ))}
    </div>
  );
};

export default ListingDetails;

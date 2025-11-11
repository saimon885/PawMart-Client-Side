import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [mylist, setMyList] = useState();
  useEffect(() => {
    user &&
      fetch(`http://localhost:3000/mylistdata?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("after my list", data);
          setMyList(data);
        });
  }, [user]);
  console.log(mylist);
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/4 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mylist &&
              mylist.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.category}</td>
                  <td>{data.price}</td>
                  <td>{data.location}</td>
                  <td>{data.date}</td>
                  <td className="flex flex-row gap-2">
                    <button className="btn btn-primary">Update </button>
                    <button className="btn btn-primary">Delete </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListing;

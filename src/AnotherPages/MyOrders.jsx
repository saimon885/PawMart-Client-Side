import React, { use, useEffect, useState } from "react";
import { MdBrowserUpdated, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthContext";
const MyOrders = () => {
  const { user } = use(AuthContext);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://my-assignment-10-flax.vercel.app/myorders?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("after Order", data);
          setOrder(data);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-flax.vercel.app/myorders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            // console.log("after delete", data);
            const remaining = order.filter((list) => list._id !== id);
            setOrder(remaining);
          });
        Swal.fire({
          title: "Cancel!",
          text: "Your Order has been Cancel.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="p-4">
      <title>PetBond-MyOrders</title>
      <div className="overflow-x-auto rounded-box border border-base-content/4 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#f3f4f6] text-black">
              <th>S/N</th>
              <th>Product/Listing Name</th>
              <th>Byer Name</th>
              <th>Phone Number</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Address</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.productName}</td>
                  <td>{data.buyerName}</td>
                  <td>{data.phone}</td>
                  <td>{data.quantity}</td>
                  <td>{data.price}</td>
                  <td>{data.address}</td>
                  <td>{data.date}</td>
                  <td className="flex flex-row gap-2">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel <MdDeleteForever size={20} />
                    </button>
                    {/* এখানে আপডেট বাটন থাকতে পারে */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;

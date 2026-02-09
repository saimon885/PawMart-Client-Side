import React, { use, useEffect, useState } from "react";
import {
  MdOutlinePets,
  MdOutlineCancel,
  MdOutlineShoppingCart,
} from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthContext";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaHandHoldingUsd, FaDog, FaCat, FaPaw } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = use(AuthContext);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(
        `https://my-assignment-10-flax.vercel.app/myorders?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);
  // console.log(order);
  const handleDelete = (id) => {
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
  console.log(order);

  if (loading) {
    return (
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
      </div>
    );
  }
  // const updatePayment = (data, method) => {
  //   const updateInfo = {
  //     data: data,
  //     status: method,
  //   };
  //   console.log(updateInfo);
  // };

  const handleOnLinePayment = async (data) => {
    const totalPrice =
      parseFloat(data.price || 0) * parseInt(data.quantity || 1);

    const paymentInfo = {
      productName: data.productName,
      productId: data.productId,
      customer_email: data.email,
      price: totalPrice,
      id: data._id,
    };

    try {
      const res = await fetch(
        "https://my-assignment-10-flax.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentInfo),
        },
      );

      const result = await res.json();

      if (res.ok && result.url) {
        window.location.href = result.url;
      } else {
        console.error("Server Error Message:", result.error);
        alert("Payment redirect fail hoyeche: " + result.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  // const handleCashOn = (data) => {
  //   updatePayment(data, "Cash-On-Delivery");
  // };

  return (
    <div className="mx-5 relative min-h-screen overflow-hidden">
      <title>PetBond-MyOrders</title>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <FaDog className="absolute top-10 left-10 text-[150px] -rotate-12" />
        <FaCat className="absolute bottom-20 right-10 text-[130px] rotate-12" />
        <FaPaw className="absolute top-1/2 left-20 text-[80px] rotate-45" />
        <GiRabbit className="absolute bottom-1/4 left-1/3 text-[110px] rotate-12" />
      </div>

      <div className="relative z-10">
        <h1 className="text-center font-bold text-2xl mb-5 text-secondary">
          My-Orders
        </h1>

        {order.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-300">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
              <MdOutlineShoppingCart size={60} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700">
              No Orders Found!
            </h2>
            <p className="text-slate-500 mt-2 mb-6">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/allListData"
              className="btn btn-secondary text-white px-8"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-content/4 bg-white/80 backdrop-blur-sm">
            <table className="table">
              <thead>
                <tr className="bg-[#f3f4f6] text-black">
                  <th>S/N</th>
                  <th>Product Name</th>
                  <th>Buyer Name</th>

                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>DeliveryStatus</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {order.map((data, index) => (
                  <tr key={data._id} className="hover:bg-slate-50/50">
                    <td>{index + 1}</td>
                    <td>{data.productName}</td>
                    <td>{data.buyerName}</td>
                    <td>{data.quantity}</td>
                    <td className="font-bold">
                      {parseFloat(data.price || 0) *
                        parseInt(data.quantity || 1)}
                    </td>
                    <td>{data.address}</td>
                    <td>{data.orderAt}</td>
                    <td className="text-red-600">{data.deliveryStatus}</td>
                    <td className="flex flex-row gap-2">
                      {data.paymentStatus === "paid" ? (
                        <button className="btn btn-active btn-sm text-white">
                          Paid <TbCurrencyTaka size={18} />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOnLinePayment(data)}
                            className="btn btn-success btn-sm text-white"
                          >
                            Pay <TbCurrencyTaka size={18} />
                          </button>

                          <button
                            // onClick={() => handleCashOn(data)}
                            className="btn btn-primary btn-sm text-white"
                          >
                            COD <FaHandHoldingUsd size={18} />
                          </button>
                        </>
                      )}

                      {/* Delete button ta condition er baire thakbe jate shob somoy dekha jay */}
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="btn btn-secondary btn-sm"
                      >
                        <MdOutlineCancel size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

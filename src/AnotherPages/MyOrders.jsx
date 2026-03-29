import React, { useEffect, useState, useContext } from "react";
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
import { toast } from "react-toastify";
import Loading from "../Pages/Loading";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(
        `https://my-assignment-10-lime.vercel.app/myorders?email=${user.email}`,
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
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-lime.vercel.app/myorders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            const remaining = order.filter((list) => list._id !== id);
            setOrder(remaining);
            Swal.fire({
              title: "Cancelled!",
              text: "Your Order has been Cancelled.",
              icon: "success",
            });
          });
      }
    });
  };

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
        "https://my-assignment-10-lime.vercel.app/create-checkout-session",
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
        toast.error("Payment redirect fail: " + result.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const handlecashOn = (data) => {
    const update = {
      deliveryStatus: "COD",
      paymentStatus: "COD",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Confirm Cash on Delivery?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-assignment-10-lime.vercel.app/myorders/${data._id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(update),
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.modifiedCount > 0) {
              Swal.fire({
                title: "Confirmed!",
                text: "Your order is set to Cash on Delivery.",
                icon: "success",
              }).then(() => {
                const updatedOrders = order.map((o) =>
                  o._id === data._id ? { ...o, ...update } : o,
                );
                setOrder(updatedOrders);
              });
            }
          })
          .catch((err) => {
            Swal.fire({ title: "Error!", text: err.message, icon: "error" });
          });
      }
    });
  };

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  // Common Action Component for both views
  const ActionButtons = ({ data }) => (
    <div className="flex flex-row gap-2 flex-wrap items-center">
      {data.paymentStatus === "paid" ? (
        <button className="btn btn-disabled btn-sm  no-animation cursor-default">
          Paid <TbCurrencyTaka size={18} />
        </button>
      ) : data.paymentStatus === "COD" ? (
        <button className="btn btn-disabled  btn-sm no-animation cursor-default">
          COD <FaHandHoldingUsd size={18} />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => handleOnLinePayment(data)}
            className="btn btn-success btn-sm text-white"
          >
            Pay <TbCurrencyTaka size={18} />
          </button>
          <button
            onClick={() => handlecashOn(data)}
            className="btn btn-primary btn-sm text-white"
          >
            COD <FaHandHoldingUsd size={18} />
          </button>
        </div>
      )}

      {/* Delete button always shown according to requirement */}
      <button
        onClick={() => handleDelete(data._id)}
        className="btn btn-secondary btn-sm"
        title="Cancel Order"
      >
        <MdOutlineCancel size={18} />
      </button>
    </div>
  );

  return (
    <div className="mx-5 py-10 min-h-screen relative ">
      <title>PetBond - My Orders</title>

      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <FaDog className="absolute top-10 left-10 text-[150px] -rotate-12 text-secondary" />
        <FaCat className="absolute bottom-20 right-10 text-[130px] rotate-12 text-secondary" />
      </div>

      <div className="relative z-10">
        <h1 className="text-center font-bold text-2xl mb-5 text-primary">
          My Orders
        </h1>

        {order.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-base-200/50 dark:bg-base-700 rounded-3xl border border-dashed">
            <MdOutlineShoppingCart
              size={60}
              className="text-base-content/60 mb-4"
            />
            <h2 className="text-2xl font-bold">No Orders Found!</h2>
            <Link
              to="/allListData"
              className="btn btn-primary mt-6 text-white px-8"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-base-content/20 bg-base-100 dark:bg-base-800/80 backdrop-blur-sm">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200 dark:bg-base-700">
                    <th>S/N</th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((data, index) => (
                    <tr key={data._id} className="hover:bg-base-200/50">
                      <td>{index + 1}</td>
                      <td>{data.productName}</td>
                      <td>{data.quantity}</td>
                      <td className="font-semibold">
                        {Number(data.price || 0) * Number(data.quantity || 1)}
                      </td>
                      <td
                        className={
                          data.deliveryStatus === "Delivered"
                            ? "text-success font-bold"
                            : "text-error font-bold"
                        }
                      >
                        {data.deliveryStatus}
                      </td>
                      <td>
                        <ActionButtons data={data} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-4">
              {order.map((data) => (
                <div
                  key={data._id}
                  className="bg-base-100 dark:bg-base-800 rounded-2xl p-4 shadow-md border border-base-content/20"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg">{data.productName}</h2>
                    <span
                      className={`font-bold ${data.deliveryStatus === "Delivered" ? "text-success" : "text-error"}`}
                    >
                      {data.deliveryStatus}
                    </span>
                  </div>
                  <div className="text-sm opacity-70 mb-3 space-y-1">
                    <p>Buyer: {data.buyerName}</p>
                    <p>
                      Qty: {data.quantity} | Total:{" "}
                      {(
                        parseFloat(data.price || 0) *
                        parseInt(data.quantity || 1)
                      ).toFixed(2)}{" "}
                      <TbCurrencyTaka className="inline" />
                    </p>
                    <p>Date: {data.orderAt}</p>
                  </div>
                  <ActionButtons data={data} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

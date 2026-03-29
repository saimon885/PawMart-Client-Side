import React, { useEffect, useState, useContext, useRef } from "react";
import {
  MdOutlinePets,
  MdOutlineCancel,
  MdOutlineShoppingCart,
  MdDownloadDone,
} from "react-icons/md";
import Swal from "sweetalert2";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaHandHoldingUsd, FaDog, FaCat, FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthContext";
import { IoEyeOutline } from "react-icons/io5";

const Allorder = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalref = useRef(null);
  const [modaldata, setModalData] = useState();
  // console.log(modaldata);

  useEffect(() => {
    setLoading(true);
    fetch(`https://my-assignment-10-lime.vercel.app/orders`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);
  // console.log(order);

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
  const CompleteOrder = (id) => {
    const update = {
      deliveryStatus: "Complete",
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
        fetch(`https://my-assignment-10-lime.vercel.app/orders/${id}`, {
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
                  o._id === id ? { ...o, ...update } : o,
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
  const handleView = (data) => {
    modalref.current.showModal();
    setModalData(data);
  };
  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-base-100 dark:bg-base-200">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-base-200 dark:bg-base-700 opacity-75"></div>
          <div className="h-14 w-14 rounded-full border-4 border-base-200 border-t-primary animate-spin"></div>
          <div className="absolute text-primary animate-bounce">
            <MdOutlinePets size={24} />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase animate-pulse">
            Loading
          </h3>
        </div>
      </div>
    );
  }

  //   Common Action Component for both views
  const ActionButtons = ({ data }) => (
    <div className="flex flex-row gap-2 flex-wrap items-center">
      <div className="flex gap-2">
        <button
          title="View Order"
          onClick={() => handleView(data)}
          className="btn  btn-sm "
        >
          View <IoEyeOutline size={18} />
        </button>
      </div>

      {data.paymentStatus === "pending" ||
        (data.paymentStatus === "COD" && (
          <button
            onClick={() => CompleteOrder(data._id)}
            className="btn btn-success btn-sm"
            title="Confirm Order"
          >
            <MdDownloadDone size={18} />
          </button>
        ))}
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
    <div>
      <div className="mx-5 py-10 min-h-screen relative ">
        <title>PetBond - Total Orders</title>

        <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
          <FaDog className="absolute top-10 left-10 text-[150px] -rotate-12 text-secondary" />
          <FaCat className="absolute bottom-20 right-10 text-[130px] rotate-12 text-secondary" />
        </div>

        <div className="relative z-10">
          <h1 className="text-center font-bold text-2xl mb-5 text-primary">
            Total Orders
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
                            data.deliveryStatus === "Complete"
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
                        className={`font-bold ${data.deliveryStatus === "Complete" ? "text-success" : "text-error"}`}
                      >
                        {data.deliveryStatus}
                      </span>
                    </div>
                    <div className="text-sm opacity-70 mb-3 space-y-1">
                      <p>Buyer: {data.buyerName}</p>
                      <p>
                        Qty: {data.quantity} | Total:{" "}
                        {Number(data.price || 0) * Number(data.quantity || 1)}{" "}
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={modalref}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl border-t-4 border-primary">
          <h3 className="font-bold text-2xl mb-6 text-primary flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-secondary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Order Details
          </h3>

          {modaldata ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-base-200 rounded-xl space-y-3">
                  <h4 className="font-bold border-b pb-2 text-secondary">
                    Item Summary
                  </h4>
                  <p className="font-medium text-lg leading-tight">
                    {modaldata.productName}
                  </p>
                  <div className="divider my-1"></div>
                  <div className="flex justify-between">
                    <span>Unit Price:</span>
                    <span className="font-semibold">{modaldata.price} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-semibold">
                      × {modaldata.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-bold text-lg text-primary">
                      Total Price:
                    </span>
                    <span className="font-bold text-xl text-primary text-shadow-sm">
                      {(
                        Number(modaldata.price) * Number(modaldata.quantity)
                      ).toLocaleString()}{" "}
                      BDT
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-xl space-y-3">
                  <h4 className="font-bold border-b pb-2 text-secondary">
                    Customer Info
                  </h4>
                  <p>
                    <span className="text-gray-500 text-xs uppercase font-bold block">
                      Name
                    </span>{" "}
                    {modaldata.buyerName}
                  </p>
                  <p>
                    <span className="text-gray-500 text-xs uppercase font-bold block">
                      Email
                    </span>{" "}
                    {modaldata.email}
                  </p>
                  <p>
                    <span className="text-gray-500 text-xs uppercase font-bold block">
                      Phone
                    </span>{" "}
                    {modaldata.phone}
                  </p>
                  <p>
                    <span className="text-gray-500 text-xs uppercase font-bold block">
                      Address
                    </span>{" "}
                    {modaldata.address}
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <p className="text-sm">
                  <span className="font-bold block text-gray-600 mb-1">
                    Additional Notes:
                  </span>
                  <span className="italic">
                    {modaldata.additionalNotes ||
                      "No specific instructions provided."}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-4 border-t pt-4 px-2">
                <div className="flex gap-2">
                  <span className="badge badge-outline badge-primary px-3 py-3 capitalize">
                    {modaldata.paymentStatus}
                  </span>
                  <span
                    className={`badge px-3 py-3 capitalize ${modaldata.deliveryStatus === "pending" ? "badge-warning" : "badge-success"}`}
                  >
                    {modaldata.deliveryStatus}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Placed: {new Date(modaldata.orderAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <span className="loading loading-bars loading-lg text-primary"></span>
              <p className="animate-pulse">Fetching details...</p>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral btn-sm shadow-md">
                Close Receipt
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Allorder;

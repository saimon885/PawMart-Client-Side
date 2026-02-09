import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import {
  MdOutlineCancel,
  MdOutlineReceipt,
  MdFilterList,
  MdOutlinePets,
} from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

const OrderHistory = () => {
  const { user } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      fetch(
        `https://my-assignment-10-flax.vercel.app/payments?email=${user?.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          // Sorting by date (latest first) and taking top 10
          const formattedData = data.slice(0, 10);
          setOrders(formattedData);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-white">
        <div className="relative flex justify-center items-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-slate-100 opacity-75"></div>

          {/* Rotating border ring */}
          <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin"></div>

          {/* Center Pet Icon */}
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

        {/* Decorative dots */}
        <div className="flex gap-1.5 mt-4">
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header & Stats Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Showing top 10 most recent transactions
            </h1>
            <p className="text-slate-500 mt-1">
              Review your recent payments and order status.
            </p>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-5 px-6 text-slate-500 font-semibold text-[13px] border-b border-slate-100">
                    Product
                  </th>
                  <th className="text-slate-500 font-semibold text-[13px] border-b border-slate-100">
                    Transaction ID
                  </th>
                  <th className="text-slate-500 font-semibold text-[13px] border-b border-slate-100">
                    Date
                  </th>
                  <th className="text-slate-500 font-semibold text-[13px] border-b border-slate-100">
                    Amount
                  </th>
                  <th className="text-slate-500 font-semibold text-[13px] border-b border-slate-100 text-center">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="group hover:bg-slate-50/80 transition-all"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <MdOutlineReceipt color="green" size={22} />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-800 text-[15px]">
                              {order.productName}
                            </span>
                            <span className="text-xs text-slate-400 font-medium italic">
                              {order.trackingId}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono text-[12px] text-slate-500 uppercase tracking-tighter">
                        #{order.transactionId.substring(3, 15)}
                      </td>
                      <td className="text-[14px] text-slate-600">
                        {new Date(order.paidAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <div className="flex items-center gap-1 font-bold text-slate-900 text-[15px]">
                          ${(order.amount / 100).toLocaleString()}
                          <FiArrowUpRight className="text-slate-300" />
                        </div>
                      </td>
                      <td className="text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-20 text-center text-slate-400"
                    >
                      No transactions found in your history.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

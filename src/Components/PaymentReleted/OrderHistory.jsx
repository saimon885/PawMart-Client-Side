import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { MdOutlineReceipt, MdOutlinePets } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      fetch(
        `https://my-assignment-10-lime.vercel.app/payments?email=${user?.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const formattedData = data.slice(0, 10); // Top 10 recent
          setOrders(formattedData);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-base-200 dark:bg-base-300">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-base-300 opacity-75 dark:bg-base-400"></div>
          <div className="h-14 w-14 rounded-full border-4 border-base-300 border-t-primary animate-spin"></div>
          <div className="absolute text-primary dark:text-secondary animate-bounce">
            <MdOutlinePets size={28} />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-1">
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-base-content animate-pulse">
            Loading
          </h3>
          <p className="text-[12px] text-base-content/50 font-medium">
            Fetching your transaction history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 dark:bg-base-300 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-base-content dark:text-base-100 tracking-tight">
              Top 10 Recent Transactions
            </h1>
            <p className="text-base-content/60 dark:text-base-200 mt-1">
              Review your recent payments and order status.
            </p>
          </div>
        </div>

        {/* Desktop/Tablet Table */}
        <div className="hidden md:block  dark:bg-gray-900 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-0">
              <thead className="bg-base-100 dark:bg-gray-800">
                <tr>
                  <th className="py-4 px-6 text-sm text-base-content dark:text-base-200 font-semibold border-b border-base-300">
                    Product
                  </th>
                  <th className="text-sm text-base-content dark:text-base-200 font-semibold border-b border-base-300">
                    Transaction ID
                  </th>
                  <th className="text-sm text-base-content dark:text-base-200 font-semibold border-b border-base-300">
                    Date
                  </th>
                  <th className="text-sm text-base-content dark:text-base-200 font-semibold border-b border-base-300">
                    Amount
                  </th>
                  <th className="text-sm text-base-content dark:text-base-200 font-semibold border-b border-base-300 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300 dark:divide-gray-700">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="group hover:bg-base-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                            <MdOutlineReceipt size={22} />
                          </div>
                          <div>
                            <span className="block font-semibold text-base-content dark:text-base-100">
                              {order.productName}
                            </span>
                            <span className="text-xs text-base-content/50 dark:text-base-200 font-medium italic">
                              {order.trackingId}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono text-xs text-base-content/60 dark:text-base-200 uppercase tracking-tighter">
                        #{order.transactionId.substring(3, 15)}
                      </td>
                      <td className="text-sm text-base-content/80 dark:text-base-200">
                        {new Date(order.paidAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <div className="flex items-center gap-1 font-semibold text-base-content dark:text-base-100 text-sm">
                          ${(order.amount / 100).toLocaleString()}
                          <FiArrowUpRight className="text-base-content/40" />
                        </div>
                      </td>
                      <td className="text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-900"
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
                      colSpan="5"
                      className="py-20 text-center text-base-content/50 dark:text-base-200"
                    >
                      No transactions found in your history.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className=" dark:bg-gray-900 rounded-2xl p-4 shadow-md border border-base-300 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold text-base-content dark:text-base-100 text-lg">
                    {order.productName}
                  </h2>
                  <span
                    className={`font-bold text-sm px-2 py-1 rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-900"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-base-content/60 dark:text-base-200 mb-1">
                  Transaction: #{order.transactionId.substring(3, 15)}
                </p>
                <p className="text-sm text-base-content/70 dark:text-base-200 mb-1">
                  Date:{" "}
                  {new Date(order.paidAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-base-content/80 dark:text-base-100 font-semibold flex items-center gap-1">
                  Amount: ${(order.amount / 100).toLocaleString()}{" "}
                  <FiArrowUpRight className="text-base-content/40" />
                </p>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-base-content/50 dark:text-base-200">
              No transactions found in your history.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

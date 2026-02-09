import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
const Success = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({
    loading: true,
    success: false,
  });
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // method: "PATCH" ব্যবহার করুন
      fetch(
        `https://my-assignment-10-flax.vercel.app/payment-success?session_id=${sessionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPaymentInfo({
              transactionId: data.transactionId,
              trackingId: data.trackingId,
              amount: data.amount,
              loading: false,
              success: true,
            });
          } else {
            setPaymentInfo({ loading: false, success: false });
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          setPaymentInfo({ loading: false, success: false });
        });
    }
  }, [sessionId]);

  if (paymentInfo.loading) {
    return (
      <div className="text-center mt-10">Verifying Payment... Please Wait.</div>
    );
  }

  if (!paymentInfo.success) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-red-500 text-2xl font-bold">
          Payment Verification Failed!
        </h2>
        <p>Something went wrong. Please contact support.</p>
        <Link to="/dashboard/myorders" className="btn btn-primary mt-4">
          Go to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-green-200">
      <div className="text-center">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h2 className="text-2xl font-bold text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Transaction ID:</span>
          <span className="font-mono font-bold text-blue-600">
            {paymentInfo.transactionId}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Tracking ID:</span>
          <span className="font-bold text-gray-800">
            {paymentInfo.trackingId}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Amount Paid:</span>
          <span className="font-bold text-gray-800">${paymentInfo.amount}</span>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/dashboard/myorders"
          className="block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default Success;

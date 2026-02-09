import React from "react";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

const Canceled = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Canceled
        </h1>

        <p className="text-gray-600 mb-8">
          Your transaction was not completed. No charges were made to your
          account. You can try again whenever you are ready.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => (window.location.href = "/checkout")}
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-white text-gray-600 font-semibold py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Need help? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Canceled;

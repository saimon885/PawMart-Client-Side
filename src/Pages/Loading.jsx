import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen space-y-2 flex justify-center flex-col items-center">
      <span className="loading loading-spinner text-error"></span>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;

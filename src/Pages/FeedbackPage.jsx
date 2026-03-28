import React, { useContext, useState } from "react";
import { MdSend, MdRateReview } from "react-icons/md";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";

export const FeedbackPage = ({ data }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const feedbackData = {
      userName: user?.displayName || "Anonymous",
      image:
        user?.photoURL || "https://icons8.com/icon/60655/gender-neutral-user",
      userEmail: user?.email,
      productName: data?.name,
      description: form.feedback.value,
      date: new Date().toISOString(),
    };
    // console.log(feedbackData);

    const res = await fetch(
      "https://my-assignment-10-lime.vercel.app/feedbacks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      },
    );
    const result = await res.json();

    if (result.insertedId) {
      toast.success("Thank you for your feedback!");
      form.reset();
    }
  };
  if (loading) {
    <span>Loadign....</span>;
  }

  return (
    <div
      className="mt-12 bg-base-100 dark:bg-base-200 border border-base-200 dark:border-base-700 rounded-3xl p-6 shadow-sm"
      data-aos="fade-up"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <MdRateReview size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Leave a Feedback</h2>
          <p className="text-sm text-base-content/60">
            Share your thoughts about this listing
          </p>
        </div>
      </div>

      <form onSubmit={handleFeedback} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Your Name</span>
            </label>
            <input
              type="text"
              name="userName"
              defaultValue={user?.displayName}
              className="input input-bordered bg-base-200 dark:bg-base-300 focus:border-primary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Listing</span>
            </label>
            <input
              type="text"
              defaultValue={data?.name}
              readOnly
              className="input input-bordered bg-base-200 dark:bg-base-300 w-full"
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Your Experience</span>
          </label>
          <textarea
            name="feedback"
            required
            rows="4"
            className="textarea textarea-bordered bg-base-200 dark:bg-base-300 focus:border-primary w-full text-base"
            placeholder="Tell us what you liked or what could be improved..."
          ></textarea>
        </div>

        <div className="flex justify-end pt-2">
          {user ? (
            <button
              type="submit"
              className="btn btn-primary px-8 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Submit Feedback <MdSend size={18} />
            </button>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-primary px-8 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Submit
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

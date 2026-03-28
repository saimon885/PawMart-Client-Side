import React, { useEffect, useRef } from "react";
import frame from "../util/confetti";
import {
  MdCancel,
  MdEmail,
  MdLocalGroceryStore,
  MdCalendarMonth,
} from "react-icons/md";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";
import {
  FaArrowLeftLong,
  FaBangladeshiTakaSign,
  FaLocationDot,
} from "react-icons/fa6";
import { FeedbackPage } from "./FeedbackPage";

const SingleListingDetails = ({ data }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    category,
    date,
    _id,
    name,
    description,
    email,
    image,
    location,
    price,
  } = data;
  const ModlaRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const handleOrderClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    ModlaRef.current.showModal();
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const NewOrder = {
      buyerName: form.name.value,
      productName: form.productname.value,
      email: form.email.value,
      productId: form.listingid.value,
      quantity: form.quantity.value,
      price: form.price.value,
      address: form.location.value,
      phone: form.number.value,
      additionalNotes: form.description.value,
    };

    const res = await fetch("https://my-assignment-10-lime.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(NewOrder),
    });
    const result = await res.json();
    if (result.insertedId) {
      frame(3);
      ModlaRef.current.close();
      toast.success("Your order has been placed successfully!");
      form.reset();
      navigate("/dashboard/myorders");
    }
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto py-6 px-4 font-sans text-base-content dark:text-base-content/90">
        <title>PetBond | {name}</title>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-base-content/70 dark:text-base-content hover:text-base-content mb-6 transition-colors group"
        >
          <FaArrowLeftLong className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to browse</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-base-100 dark:bg-base-200 border border-base-200 dark:border-base-700 rounded-3xl p-5 shadow-sm">
          <div data-aos="fade-right" className="w-full">
            <div className="bg-base-200 dark:bg-base-300 rounded-2xl p-2 border border-base-200 dark:border-base-700">
              <img
                src={image}
                alt={name}
                className="w-full h-[350px] md:h-[450px] rounded-xl object-cover shadow-sm transform transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>

          <div className="flex flex-col h-full py-2" data-aos="fade-left">
            <div className="mb-4">
              <span className="px-3 py-1 bg-base-200 dark:bg-base-300 text-[10px] uppercase tracking-widest font-bold text-base-content/70 dark:text-base-content/50 rounded-full">
                {category}
              </span>
              <h1 className="text-xl font-bold mt-2 text-base-content dark:text-base-content/90">
                {name}
              </h1>
            </div>

            <div className="flex items-center gap-4 py-3 border-y border-base-200 dark:border-base-700 mb-4">
              <div className="text-2xs font-bold flex items-center gap-1 text-primary">
                <FaBangladeshiTakaSign size={16} />
                {price}
              </div>
              <div className="h-4 w-[1px] bg-base-200 dark:bg-base-700"></div>
              <div className="text-base-content/70 dark:text-base-content/50 flex items-center gap-2 text-sm italic">
                <FaLocationDot size={14} /> {location}
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="font-bold text-sm text-base-content dark:text-base-content/90 mb-1">
                Description
              </h3>
              <p className="text-base-content/70 dark:text-base-content/50 leading-snug text-sm mb-5">
                {description}
              </p>

              <div className="grid grid-cols-1 gap-2 bg-base-200 dark:bg-base-300 p-4 rounded-xl border border-base-200 dark:border-base-700">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-base-content/70 dark:text-base-content/50 flex items-center gap-2">
                    <MdEmail size={16} /> Seller Email
                  </span>
                  <span className="font-semibold text-base-content dark:text-base-content/90">
                    {email}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-base-content/70 dark:text-base-content/50 flex items-center gap-2">
                    <MdCalendarMonth size={16} /> Posted Date
                  </span>
                  <span className="font-semibold text-base-content dark:text-base-content/90">
                    {date}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              {user?.email === email ? (
                <div className="bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-700 text-base-content/70 dark:text-base-content p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
                  <MdCancel size={18} /> You cannot order your own product
                </div>
              ) : (
                <button
                  onClick={handleOrderClick}
                  className="w-full bg-primary cursor-pointer text-base-100 py-2 rounded-xl font-bold hover:bg-primary-focus transition-all flex justify-center items-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  <MdLocalGroceryStore size={18} />
                  Order Now
                </button>
              )}
            </div>
          </div>
        </div>

        <dialog ref={ModlaRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content/90">
            <form onSubmit={handleOrder}>
              <fieldset className="fieldset w-full">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="label">Buyer Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={user?.displayName}
                      readOnly
                      className="input focus:border-0 bg-base-200 dark:bg-base-300 focus:outline-gray-400 w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="label">Email</label>
                    <input
                      type="text"
                      name="email"
                      defaultValue={user?.email}
                      readOnly
                      className="input focus:border-0 bg-base-200 dark:bg-base-300 w-full focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Listing Name</label>
                  <input
                    type="text"
                    name="productname"
                    defaultValue={name}
                    readOnly
                    className="input focus:border-0 bg-base-200 dark:bg-base-300 w-full focus:outline-gray-400"
                  />
                </div>

                <label className="label">Listing Id</label>
                <input
                  type="text"
                  name="listingid"
                  defaultValue={_id}
                  readOnly
                  className="input focus:border-0 bg-base-200 dark:bg-base-300 w-full focus:outline-gray-400"
                />

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="label">Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      defaultValue={category === "Pets (Adoption)" ? 1 : ""}
                      className="input focus:border-0 bg-base-200 dark:bg-base-300 w-full focus:outline-gray-400"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="label">Price</label>
                    <input
                      type="text"
                      name="price"
                      defaultValue={price}
                      readOnly
                      className="input focus:border-0 bg-base-200 dark:bg-base-300 w-full focus:outline-gray-400"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full">
                    <label className="label">Address</label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="input w-full focus:border-0 bg-base-200 dark:bg-base-300 focus:outline-gray-400"
                      placeholder="Enter Your Address"
                    />
                  </div>
                </div>

                <label className="label">Phone Number</label>
                <input
                  type="number"
                  name="number"
                  required
                  className="input w-full focus:border-0 bg-base-200 dark:bg-base-300 focus:outline-gray-400"
                  placeholder="Enter Your Number"
                />

                <div>
                  <label className="label font-medium mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    className="textarea w-full focus:border-0 bg-base-200 dark:bg-base-300 focus:outline-gray-400 h-[50px]"
                    placeholder="Additional Notes"
                  ></textarea>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary mt-4 skeleton bg-primary"
                  value="Order Now"
                />
              </fieldset>
            </form>
            <div className="modal-action mt-2">
              <form method="dialog">
                <button className="btn btn-sm">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <FeedbackPage data={data}></FeedbackPage>
    </div>
  );
};

export default SingleListingDetails;

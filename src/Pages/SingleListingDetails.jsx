import React, { use, useEffect, useRef } from "react";
import { FaUserAlt } from "react-icons/fa";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaBangladeshiTakaSign,
  FaLocationDot,
  FaRegStar,
} from "react-icons/fa6";
import { FcCurrencyExchange } from "react-icons/fc";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
const SingleListingDetails = ({ data }) => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  console.log(data);
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
  const handleModel = () => {
    ModlaRef.current.showModal();
  };
  const handleOrder = (e) => {
    e.preventDefault();
    const buyerName = e.target.name.value;
    const productName = e.target.productname.value;
    const email = e.target.email.value;
    const productId = e.target.listingid.value;
    const quantity = e.target.quantity.value;
    const price = e.target.price.value;
    const address = e.target.location.value;
    const date = e.target.date.value;
    const phone = e.target.number.value;
    const additionalNotes = e.target.description.value;

    const NewOrder = {
      buyerName,
      productName,
      email,
      productId,
      quantity,
      price,
      address,
      date,
      phone,
      additionalNotes,
    };
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          ModlaRef.current.close();
          toast.success("Order Successful.");
          e.target.reset();
        }
      });
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div>
      <title>PetBond-details</title>
      <div
        data-aos="fade-up"
        className=" bg-white text-black flex flex-col lg:flex-row py-8 shadow-sm rounded-2xl space-y-4 md:space-y-0 px-5 items-center gap-10 md:gap-20  border border-dotted"
      >
        <div
          data-aos="fade-left"
          className="w-full bg-white  lg:w-[1000px] border-b md:border-0 pb-6 md:pb-0 border-dashed h-[300] lg:h-[400px]  p-4"
        >
          <img
            className=" mx-auto w-full h-full shadow p-2 rounded-2xl "
            src={image}
            alt=""
          />
        </div>
        <div
          data-aos="fade-right"
          className="space-y-3 w-full bg-white rounded-2xl shadow-sm p-4"
        >
          <h1 className="text-2xl font-bold">{name}</h1>

          <p className="border-b border-[#95a5a6] pb-5">
            <span className=" font-bold">Description : </span>{" "}
            <span className="">{description}</span>
          </p>
          <h1 className="my-5">
            <span className=" font-bold md:font-medium py-2 px-4 rounded-4xl  bg-[#82ccdd]">
              {category}
            </span>{" "}
          </h1>
          <h2 className="flex gap-1 items-center ">
            <MdOutlineDateRange color="#d72050" size={18} />
            <span className="  flex items-center gap-1 font-bold ">
              PostDate :{" "}
            </span>
            <span>{date}</span>
          </h2>

          <h2 className="flex gap-1 items-center">
            <FaLocationDot color="#d72050" size={18} />
            <span className=" font-bold">Location : </span>
            {location}
          </h2>
          <h1 className=" flex gap-2 items-center">
            <span className="flex gap-1 items-center">
              <span>
                <MdEmail size={19} color="#d72050" />
              </span>
              <span className="font-semibold">Email : </span>
            </span>
            {email}
          </h1>
          <h2 className="flex gap-1 items-center font-bold text-[#3498db]">
            <FaBangladeshiTakaSign size={19} color="#d72050" />
            <span className="  flex items-center gap-1">Price : </span>
            <span>{price}</span>
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary flex gap-1"
            >
              <FaArrowLeftLong size={21} /> Back
            </button>

            <button className="btn btn-primary">
              {user.email === email ? (
                <span>This is Your Product!</span>
              ) : category === "Pets (Adoption)" ? (
                <span onClick={handleModel} className="flex gap-1">
                  Adopt <FaArrowRightLong size={21} />
                </span>
              ) : (
                <span onClick={handleModel} className="flex gap-1">
                  Order Now <FaArrowRightLong size={21} />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="MODEL">
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog ref={ModlaRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white">
            <form onSubmit={handleOrder}>
              <fieldset className="fieldset w-full bg-white">
                <div className="flex gap-4">
                  <div>
                    {/* Name */}
                    <label className="label">Buyer Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={user.displayName}
                      readOnly
                      className="input focus:border-0 focus:outline-gray-200 w-full"
                      placeholder="Enter Product/Pet Name"
                    />
                  </div>
                  <div>
                    {/* Email */}
                    <label className="label">Email</label>
                    <input
                      type="text"
                      name="email"
                      defaultValue={user.email}
                      readOnly
                      className="input focus:border-0 w-full focus:outline-gray-200"
                    />
                  </div>
                </div>
                {/* Id */}

                <div>
                  <label className="label">Listing Name</label>
                  <input
                    type="text"
                    name="productname"
                    defaultValue={name}
                    readOnly
                    className="input focus:border-0 w-full focus:outline-gray-200"
                  />
                </div>
                <label className="label">Listing Id</label>
                <input
                  type="text"
                  name="listingid"
                  defaultValue={_id}
                  readOnly
                  className="input focus:border-0 w-full focus:outline-gray-200"
                />

                <div className="flex gap-4">
                  <div>
                    {/* Quantity */}
                    <label className="label">Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      defaultValue={category == "Pets (Adoption)" ? 1 : ""}
                      className="input focus:border-0 w-full focus:outline-gray-200"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    {/* price */}
                    <label className="label">Price</label>
                    <input
                      type="text"
                      name="price"
                      defaultValue={price}
                      readOnly
                      className="input focus:border-0 w-full focus:outline-gray-200"
                      placeholder="Enter Price"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    {/* Location */}
                    <label className="label">Address</label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="input w-full focus:border-0 focus:outline-gray-200"
                      placeholder="Enter Your Address"
                    />
                  </div>
                  <div>
                    {/* Date */}
                    <label className="label">Pick Up Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="input w-full focus:border-0 focus:outline-gray-200"
                    />
                  </div>
                </div>
                {/* Number */}
                <label className="label">Phone Number</label>
                <input
                  type="number"
                  name="number"
                  required
                  className="input w-full focus:border-0 focus:outline-gray-200"
                  placeholder="Enter Your Number"
                />
                {/* Additional Notes */}
                <div>
                  <label className="label font-medium mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    className="textarea w-full focus:border-0 focus:outline-gray-200 h-[50px]"
                    placeholder="Additional Notes"
                  ></textarea>
                </div>
                {/* Image URL */}

                <input
                  type="submit"
                  className="btn btn-primary mt-4"
                  value="Order Now"
                />
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default SingleListingDetails;

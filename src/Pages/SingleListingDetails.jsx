import React, { use, useEffect, useRef } from "react";
import frame from "../util/confetti";
import { FaArrowLeftLong, FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import { MdCancel, MdEmail, MdLocalGroceryStore, MdCalendarMonth } from "react-icons/md";
import { useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";

const SingleListingDetails = ({ data }) => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { category, date, _id, name, description, email, image, location, price } = data;
  const ModlaRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

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
      date: form.date.value,
      phone: form.number.value,
      additionalNotes: form.description.value,
    };

    const res = await fetch("https://my-assignment-10-flax.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(NewOrder),
    });
    const result = await res.json();
    if (result.insertedId) {
      frame(3);
      ModlaRef.current.close();
      toast.success("Order Placed Successfully!");
      form.reset();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 font-sans text-slate-800">
      <title>PetBond | {name}</title>

      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-black mb-6 transition-colors group"
      >
        <FaArrowLeftLong className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to browse</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
        <div data-aos="fade-right" className="w-full">
          <div className="bg-slate-50 rounded-2xl p-2 border border-slate-50">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-[350px] md:h-[450px] rounded-xl object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col h-full py-2" data-aos="fade-left">
          <div className="mb-4">
            <span className="px-3 py-1 bg-slate-100 text-[10px] uppercase tracking-widest font-bold text-slate-500 rounded-full">
              {category}
            </span>
            <h1 className="text-xl font-bold mt-2 text-slate-900">{name}</h1>
          </div>

          <div className="flex items-center gap-4 py-3 border-y border-slate-100 mb-4">
            <div className="text-2xs font-bold flex items-center gap-1 text-primary">
              <FaBangladeshiTakaSign size={16} />
              {price}
            </div>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <div className="text-slate-500 flex items-center gap-2 text-sm italic">
              <FaLocationDot size={14} /> {location}
            </div>
          </div>

          <div className="flex-grow">
            <h3 className="font-bold text-sm text-slate-900 mb-1">Description</h3>
            <p className="text-slate-600 leading-snug text-sm mb-5">
              {description}
            </p>

            <div className="grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500 flex items-center gap-2"><MdEmail size={16}/> Seller Email</span>
                <span className="font-semibold text-slate-700">{email}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500 flex items-center gap-2"><MdCalendarMonth size={16}/> Posted Date</span>
                <span className="font-semibold text-slate-700">{date}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-auto">
            {user.email === email ? (
              <div className="bg-amber-50 border border-amber-100 text-amber-700 p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
                <MdCancel size={18} /> You cannot order your own product
              </div>
            ) : (
              <button 
                onClick={() => ModlaRef.current.showModal()}
                className="w-full bg-secondary cursor-pointer text-white py-2 rounded-xl font-bold hover:bg-black transition-all flex justify-center items-center gap-2 shadow-lg active:scale-[0.98]"
              >
                <MdLocalGroceryStore size={18} />
                {category === "Pets (Adoption)" ? "Submit Adoption Request" : "Order Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog ref={ModlaRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <form onSubmit={handleOrder}>
            <fieldset className="fieldset w-full bg-white">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="label text-black">Buyer Name</label>
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
                <div className="w-1/2">
                  <label className="label text-black">Email</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={user.email}
                    readOnly
                    className="input focus:border-0 w-full focus:outline-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="label text-black">Listing Name</label>
                <input
                  type="text"
                  name="productname"
                  defaultValue={name}
                  readOnly
                  className="input focus:border-0 w-full focus:outline-gray-200"
                />
              </div>

              <label className="label text-black">Listing Id</label>
              <input
                type="text"
                name="listingid"
                defaultValue={_id}
                readOnly
                className="input focus:border-0 w-full focus:outline-gray-200"
              />

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="label text-black">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    defaultValue={category == "Pets (Adoption)" ? 1 : ""}
                    className="input focus:border-0 w-full focus:outline-gray-200"
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="w-1/2">
                  <label className="label text-black">Price</label>
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
                <div className="w-1/2">
                  <label className="label text-black">Address</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="input w-full focus:border-0 focus:outline-gray-200"
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="w-1/2">
                  <label className="label text-black">Pick Up Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="input w-full focus:border-0 focus:outline-gray-200"
                  />
                </div>
              </div>

              <label className="label text-black">Phone Number</label>
              <input
                type="number"
                name="number"
                required
                className="input w-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter Your Number"
              />

              <div>
                <label className="label font-medium text-black mb-1.5">
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
  );
};

export default SingleListingDetails;
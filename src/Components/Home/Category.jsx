import React, { use, Suspense } from "react";
import { NavLink } from "react-router";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const CategoryPromise = fetch("/Category.json").then((res) => {
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
});

const CategoryList = () => {
  const categoryData = use(CategoryPromise);

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
      {categoryData.map((data) => (
        <NavLink
          to={`/category/${data.name}`}
          key={data.id}
          className={({ isActive }) => 
            `px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium
            ${isActive 
              ? "bg-primary border-primary text-white shadow-lg scale-105" 
              : "border-gray-200 hover:border-primary hover:text-primary bg-white text-gray-700"
            }`
          }
        >
          {data.name}
        </NavLink>
      ))}
    </div>
  );
};

const Category = () => {
  const [text] = useTypewriter({
    words: ["Your Favorite Category", "The Best Deals", "Top Collections"],
    loop: true,
    typeSpeed: 250,
    deleteSpeed: 150,
    delaySpeed: 2000,
  });

  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          Select <span className="text-primary">{text}</span>
          <Cursor cursorColor="#your-primary-color" />
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Browse through our curated categories to find what you need.
        </p>
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center h-20">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      }>
        <CategoryList />
      </Suspense>
    </section>
  );
};

export default Category;
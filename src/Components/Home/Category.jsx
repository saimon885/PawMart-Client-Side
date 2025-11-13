import React, { use } from "react";

import { NavLink } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";

const CategoryPromise = fetch("/Category.json").then((res) => res.json());

const Category = () => {
  const [text] = useTypewriter({
    words: ["Your Category"],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  const CategoryData = use(CategoryPromise);

  if (!CategoryData) {
    return <div>Loading Categories...</div>;
  }

  return (
    <div className="my-8">
      <div>
        <h2 className="text-4xl text-center font-bold mb-8">
          Select <span className="text-primary">{text}</span>
        </h2>
      </div>
      <div className="space-x-2 space-y-2 flex-wrap md:space-x-4 flex justify-center items-center">
        {CategoryData.map((data) => (
          <NavLink to={`/category/${data.name}`} key={data.id} className="btn">
            {data.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Category;

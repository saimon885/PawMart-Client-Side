import React, { use } from "react";

import { NavLink } from "react-router-dom";

const CategoryPromise = fetch("/Category.json").then((res) => res.json());

const Category = () => {
  const CategoryData = use(CategoryPromise);

  if (!CategoryData) {
    return <div>Loading Categories...</div>;
  }

  return (
    <div className="my-8">
      <div className="space-x-4 flex justify-center items-center">
        {CategoryData.map((data) => (
          <NavLink to={`/${data.name}`} key={data.id} className="btn">
            {data.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Category;

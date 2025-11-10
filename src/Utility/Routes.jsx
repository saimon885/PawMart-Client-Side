import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Form/Login";
import Register from "../Components/Form/Register";
import Error404 from "../Error/Error404";
import RecentCategoryData from "../Pages/RecentCategoryData";
import HomeLayout from "../MainLayout/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404></Error404>,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },

      { path: "register", Component: Register },
    ],
  },
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "/:name",
        loader: () => fetch("http://localhost:3000/petListdata"),
        Component: RecentCategoryData,
      },
    ],
  },
]);

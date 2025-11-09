import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Form/Login";
import Register from "../Components/Form/Register";
import Error404 from "../Error/Error404";

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
]);

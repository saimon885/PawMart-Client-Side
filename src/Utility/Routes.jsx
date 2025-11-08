import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <span>404 page Not found</span>,
    Component: MainLayout,
    children: [{ index: true, Component: Home }],
  },
]);

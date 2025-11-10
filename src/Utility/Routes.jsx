import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Form/Login";
import Register from "../Components/Form/Register";
import Error404 from "../Error/Error404";
import RecentCategoryData from "../Pages/RecentCategoryData";
import HomeLayout from "../MainLayout/HomeLayout";
import Loading from "../Pages/Loading";
import ListingDetails from "../Pages/ListingDetails";
import AddListingPage from "../AnotherPages/AddListingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404></Error404>,
    hydrateFallbackElement: <Loading></Loading>,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },

      { path: "register", Component: Register },
      {
        path: "details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/petListdata/details/${params.id}`),
        element: <ListingDetails></ListingDetails>
      },
      {
        path:"addlistdata",
        element : <AddListingPage></AddListingPage>
      }
      
    ],
  },
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "/:name",
        loader: () => fetch("http://localhost:3000/petListdata"),
        hydrateFallbackElement: <Loading></Loading>,
        Component: RecentCategoryData,
      },
    ],
  },
]);

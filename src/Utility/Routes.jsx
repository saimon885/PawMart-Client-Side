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
import AllListData from "../AnotherPages/AllListData";
import MyListing from "../AnotherPages/MyListing";
import PrivetRouter from "../Privetrouter/PrivetRouter";
import MyOrders from "../AnotherPages/MyOrders";
import UserPropile from "../Components/UserPropile";

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
        element: (
          <PrivetRouter>
            <ListingDetails></ListingDetails>
          </PrivetRouter>
        ),
      },
      {
        path: "addlistdata",
        element: (
          <PrivetRouter>
            <AddListingPage></AddListingPage>
          </PrivetRouter>
        ),
      },
      {
        path: "allListData",
        loader: () => fetch("http://localhost:3000/petListdata"),
        Component: AllListData,
      },
      {
        path: "mylist",
        element: (
          <PrivetRouter>
            <MyListing></MyListing>
          </PrivetRouter>
        ),
      },
      {
        path: "myorders",
        element: (
          <PrivetRouter>
            <MyOrders></MyOrders>
          </PrivetRouter>
        ),
      },
      {
        path: "userpropile",
        element: (
          <PrivetRouter>
            <UserPropile></UserPropile>
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "category/:name",
        loader: () => fetch("http://localhost:3000/petListdata"),
        hydrateFallbackElement: <Loading></Loading>,
        Component: RecentCategoryData,
      },
    ],
  },
]);

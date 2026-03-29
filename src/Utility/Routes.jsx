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
import DashboardLayout from "../MainLayout/DashboardLayout";
import Success from "../Components/PaymentReleted/Success";
import Canceled from "../Components/PaymentReleted/Canceled";
import OrderHistory from "../Components/PaymentReleted/OrderHistory";
import DashboardHome from "../AnotherPages/DashboardHome";
import TotoalUsers from "../AnotherPages/TotoalUsers";
import AboutUs from "../AnotherPages/AboutUs";
import Allorder from "../AnotherPages/Allorder";
import AdminPrivetRouter from "../Privetrouter/AdminPrivetRouter";

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
          fetch(
            `https://my-assignment-10-lime.vercel.app/petListdata/details/${params.id}`,
          ),
        element: <ListingDetails></ListingDetails>,
      },

      {
        path: "allListData",

        Component: AllListData,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
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
        loader: () =>
          fetch("https://my-assignment-10-lime.vercel.app/homepetListdata"),
        hydrateFallbackElement: <Loading></Loading>,
        Component: RecentCategoryData,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout></DashboardLayout>
      </PrivetRouter>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
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
        path: "TotalOrder",
        element: (
          <AdminPrivetRouter>
            <Allorder></Allorder>
          </AdminPrivetRouter>
        ),
      },
      {
        path: "payment-success",
        Component: Success,
      },
      {
        path: "payment-cancelled",
        Component: Canceled,
      },
      {
        path: "order_histry",
        Component: OrderHistory,
      },
      {
        path: "totalUsers",
        element: (
          <AdminPrivetRouter>
            <TotoalUsers></TotoalUsers>
          </AdminPrivetRouter>
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
]);

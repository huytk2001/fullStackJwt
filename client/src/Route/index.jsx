import { Cancel } from "axios";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ListPageProducts from "../component/Product/ListPageProducts";
import ErrorPage from "../Page/ErrorPage";
import Home from "../Page/Home";
import Login from "../Page/Login";
import ProductDetails from "../Page/Product-details";
import Register from "../Page/Register";
import Success from "../Page/Success";
import CartFeaTure from "../redux/Card/Card";
import CheckOutPage from "../Page/CheckOutPage";

const AuthLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <Home />,
        path: "/",
        children: [
          {
            element: <ListPageProducts />,
            path: "product", // Không có dấu `/` ở đầu
          },
          {
            element: <ProductDetails />,
            path: "product-details/:id", // Đặt ngang hàng với `ListPageProducts`
          },
          {
            element: <CartFeaTure />,
            path: "card", // Đặt ngang hàng với `ListPageProducts`
          },
        ],
      },
      { element:<Success/>,
        path:"success"
      },
      {
element:<Cancel/>,
path:"cancel"
      },
      {
        element:<CheckOutPage/>,
        path:"checkout"
      }
    ],
  },
]);

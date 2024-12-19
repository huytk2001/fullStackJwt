import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../Page/ErrorPage";
import Login from "../Page/Login";
import Home from "../Page/Home";
import Register from "../Page/Register";
import ListPageProducts from "../component/Product/ListPageProducts";
import ProductDetails from "../Page/Product-details";
import CartFeaTure from "../redux/Card/Card";

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
    ],
  },
]);

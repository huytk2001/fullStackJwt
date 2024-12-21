import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../Page/ErrorPage";
import { Home } from "@mui/icons-material";
import ListPageProducts from "../component/Product/ListPageProducts";
import ProductDetails from "../Page/Product-details";
import CartFeature from "../redux/Card/Card";
import Success from "../Page/Success";
import { Cancel } from "axios";
import CheckOutPage from "../Page/CheckOutPage";
import Login from "../Page/Login";


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[

      {
        path:"",
        element:<Home/>
      },
      {path:"/login", element:<Login/>},
      {
        element: <ListPageProducts />,
        path: "product", // Không có dấu `/` ở đầu
      },
      {
        element: <ProductDetails />,
        path: "product-details/:id", // Đặt ngang hàng với `ListPageProducts`
      },
      {
        element: <CartFeature />,
        path: "card", // Đặt ngang hàng với `ListPageProducts`
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
    ]
  }
])
export default router
import { createRoot } from "react-dom/client";
import "./index.css";

import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/500.css"; // Specify weight
import "@fontsource/roboto/700.css"; // Specify weight
import "@fontsource/roboto/300.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import { Container } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./Route";
import { Provider } from "react-redux";
import { store, persist } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
// index.js / main.js
// import axiosClient from "./Api/axiosClient";

// const token = localStorage.getItem("accessToken");
// if (token) {
//   console.log("Token already exists:", token);
//   axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
// }

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <Container>
        <RouterProvider router={router}></RouterProvider>
      </Container>
    </PersistGate>
  </Provider>
);

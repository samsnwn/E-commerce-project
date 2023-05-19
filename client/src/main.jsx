import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NextUIProvider>
        <ToastContainer />
        <App />
      </NextUIProvider>
      {/* </PersistGate> */}
    </Provider>
  // </React.StrictMode>
);

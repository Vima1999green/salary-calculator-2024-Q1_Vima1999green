import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import salaryCalculatorReducer from "./features/salaryCalculatorSlice";
import "./index.css";

const store = configureStore({
  reducer: {
    salaryCalculator: salaryCalculatorReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

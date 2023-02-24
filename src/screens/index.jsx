import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, SignupPage, SigninPage } from "../pages";

const Screens = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
};

export default Screens;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, SignupPage, SigninPage } from "../pages";

function Screens() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default Screens;

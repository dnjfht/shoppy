import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

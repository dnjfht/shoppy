import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-full bg-slate-700">
      <div className="w-10/12 mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-full bg-slate-700">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

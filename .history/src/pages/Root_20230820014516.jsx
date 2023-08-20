import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Root({
  user,
  setUser,
  allCarts,
  setAllCarts,
  nonMemberAllCarts,
  setNonMemberAllCarts,
}) {
  const queryClient = new QueryClient();

  return (
    <div className="w-full">
      <div className="w-full">
        <Navbar
          user={user}
          setUser={setUser}
          allCarts={allCarts}
          setAllCarts={setAllCarts}
          nonMemberAllCarts={nonMemberAllCarts}
        />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <Footer />
      </div>
    </div>
  );
}

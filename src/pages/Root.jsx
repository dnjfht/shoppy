import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Scroll from "../components/Scroll";

export default function Root({
  user,
  setUser,
  allCarts,
  setAllCarts,
  nonMemberAllCarts,
  setNonMemberAllCarts,
}) {
  const queryClient = new QueryClient();

  const contentRef = useRef(null);

  return (
    <>
      <ScrollRestoration />
      <div className="w-full" ref={contentRef}>
        <div className="w-full">
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Navbar
              user={user}
              setUser={setUser}
              allCarts={allCarts}
              setAllCarts={setAllCarts}
              nonMemberAllCarts={nonMemberAllCarts}
              setNonMemberAllCarts={setNonMemberAllCarts}
            />

            <Outlet />
          </QueryClientProvider>
          <Footer />
          <Scroll contentRef={contentRef} />
        </div>
      </div>
    </>
  );
}

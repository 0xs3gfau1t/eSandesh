import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";

export default function Home(match) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

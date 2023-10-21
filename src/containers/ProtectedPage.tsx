"use client";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default ({ children, isPublic }: any) => {
  return (
    <div className={" bg-neutral-800 text-white h-screen w-screen flex " + inter.className}>
      {children}
      <ToastContainer />
    </div>
  );
};

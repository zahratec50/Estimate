import React from "react";
import Link from "next/link";
import Header from "@/components/templates/index/Header/Header";
import Footer from "@/components/modules/Footer/Footer";

export default function NotFound() {
  return (
    <div className="font-roboto w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        <Header />
        <div className="flex flex-col items-center justify-between gap-5">
          <div>
            <img
              src="../images/404 error with portals-rafiki.png"
              alt="404 error"
              className="w-[350px] h-[380px] md:w-[280px] md:h-[280px] "
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 mt-3 mb-5 px-5 md:px-0">
            <h2 className="text-lg md:text-2xl text-black-50 font-bold ">
              Page cannot be found
            </h2>
              <span className="text-lg md:text-2xl text-black-50 font-roboto text-center">
                The page you are trying to access doesn’t exist or has been
                moved. Try going back to our homepage.
              </span>
            
            <button className="text-white bg-secondary-500 rounded-md py-2 px-3">
              <Link href="/">Our homepage</Link>
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

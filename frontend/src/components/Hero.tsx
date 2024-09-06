import React from "react";
import { Grid } from "./ui/Grid";
import { Upload } from "./Upload";
import "@/app/globals.css"; // Import global styles
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
interface Props {}

function Hero(props: Props) {
  const {} = props;

  return (
    <>
      {/* <Grid/> */}
      <div className="relative">
        {/* <Grid /> */}
        <div className="relative lg:mt-30 mt-20 w-full flex lg:flex-row flex-col items-center justify-center lg:gap-40  ">
          <div className=" flex flex-col SansB lg:text-[4rem] text-[2.5rem] lg:items-start items-center lg:text-left text-center ">
            {/* <p className="w-[32rem]">Smart Seating Assignments, Just a Click Away</p> */}
            <span>Smart Seating</span>
            <span className="-mt-5">Assignments,</span>
            <span className="-mt-5">Just a Click Away</span>
            <button className="lg:mt-5 mt-10 text-[1.3rem] inline-flex lg:w-fit w-72 lg:h-12 h-fit animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none">
              Your Go-To Tool for Effortless Arrangements
            </button>
          </div>
          <div className=" max-lg:mt-10">
            <Upload />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;

import React from "react";

export function Grid() {
  return (
    <div className="absolute inset-0 -z-10 top-10 h-[80vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]  flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f3f3f4] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
    </div>
  );
}

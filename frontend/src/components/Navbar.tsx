import React from "react";
import "@/app/globals.css"; // Import global styles
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from react-icons
import { Grid } from "./ui/Grid";
interface Props {}

function Navbar(props: Props) {
  return (
    <>
      <Grid/>
      <div className="flex flex-row justify-between my-4 mx-5 z-80">

        <span className="gap-4 flex flex-row justify-center items-center">
          <img src="/Seat-io.svg" alt="Seat.io Logo" />
          <p className="SansB lg:text-[2rem] text-[1.5rem]">Seat.io</p>
        </span>

        <a
          href="https://github.com/balvind3r/seat-io" 
          target="_blank"
          // rel="noopener noreferrer"
          className="flex items-center"
        >
          <FaGithub className="lg:h-8 lg:w-8 h-6 w-6 text-2xl text-white hover:text-gray-300" />
        </a>
      </div>
    </>
  );
}

export default Navbar;

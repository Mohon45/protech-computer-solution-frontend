"use client";

import "./index.css";
import Logo from "../icon/Logo";

const Loader = (props) => {
  return (
    <div
      className={`flex justify-center bg-white items-center fixed top-0 left-0 right-0 bottom-0 z-50`}
      style={{
        opacity: props?.forProcess ? 0.5 : 1,
      }}
    >
      <div className="h-[200px] w-[200px] fade-in-out">
        <Logo />
      </div>
    </div>
  );
};

export default Loader;

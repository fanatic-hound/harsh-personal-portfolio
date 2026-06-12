import React from "react";
import ChibiAvatar from "./ChibiAvatar";

const Logo = () => {
  return (
    <div className="w-11 h-11 border-2 overflow-hidden flex items-center justify-center">
      <ChibiAvatar variant="head" size={40} />
    </div>
  );
};

export default Logo;

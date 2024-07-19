import React from "react";
import { RiEmpathizeLine } from "@remixicon/react";

const AppLogo = () => {
  return (
    <div className="flex justify-start items-center gap-2">
      <RiEmpathizeLine size={40} className="text-green-500" />
      <p className="text-white text-xl font-bold">
        Care<span className="text-green-500">Now</span>
      </p>
    </div>
  );
};

export default AppLogo;

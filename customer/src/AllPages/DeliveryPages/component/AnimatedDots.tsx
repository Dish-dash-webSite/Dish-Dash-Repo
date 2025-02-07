import React from "react";

const AnimatedDots = () => (
  <div className="flex justify-center space-x-2">
    <div className="w-3 h-3 bg-[#FC8A06] rounded-full animate-bounce delay-100"></div>
    <div className="w-3 h-3 bg-[#028643] rounded-full animate-bounce delay-200"></div>
    <div className="w-3 h-3 bg-[#FC8A06] rounded-full animate-bounce delay-300"></div>
  </div>
);

export default AnimatedDots;
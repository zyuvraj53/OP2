"use client";

import Carousel from "../../(components)/Carousel";

const WhatOurCustomersHaveToSay = () => {
  return (
    <div className="pb-[7vw] pt-[7vh] lg:pb-[5rem] lg:pt-[5rem] text-center">
      <div className="text-[10vw] lg:text-[5rem] lg:pl-9 font-bold text-black">What Our <span className="text-[#97571c]">Customers Have to Say</span></div>
      <div className="pt-[5vw]"><Carousel /></div>

    </div>
  );
}

export default WhatOurCustomersHaveToSay;
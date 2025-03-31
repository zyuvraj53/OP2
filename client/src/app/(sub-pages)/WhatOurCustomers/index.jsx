"use client";

import Carousel from "../../(components)/Carousel";

const WhatOurCustomersHaveToSay = () => {
  return (
    <div className="pb-[7rem]">
      <div className="text-[5rem] pl-9 font-bold text-black">What Our <span className="text-amber-700">Customers Have to Say</span></div>
      <div className="pt-[5rem]"><Carousel /></div>

    </div>
  );
}

export default WhatOurCustomersHaveToSay;
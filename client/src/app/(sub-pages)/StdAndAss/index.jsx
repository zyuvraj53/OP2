import React from "react";
import Image from "next/image";

function StandardisationsAndAssociations() {
  const imageWidth = 256;
  const imageHeight = 512;

  const AssocimageWidth = 256 + 128;
  const AssocimageHeight = 512;
  return (
    <div className="pb-[7vw] lg:pb-[7rem] flex lg:flex-row flex-col text-center justify-between font-bold pr-9">

      <div className="lg:hidden block border border-gray-300 mx-8 "></div>

      <div className="text-[10vw] lg:text-[4rem] pl-9 lg:py-0 py-5 text-black lg:flex-[55]">
        Our <span className="text-amber-700">Standardisations</span>
        <div className="flex flex-col justify-center items-center pt-10 lg:pt-52">
          <Image
            src="/Stand1.png"
            width={imageWidth}
            height={imageHeight}
            alt=""
          />
          <div className="flex md:flex-row flex-col">
            <Image
              src="/Stand2.png"
              width={imageWidth}
              height={imageHeight}
              alt=""
              className="lg:pl-0 pl-12"
            />
            <Image
              src="/Stand3.png"
              width={imageWidth + 56}
              height={imageHeight}
              alt=""
            />
          </div>
          <Image
            src="/Stand4.png"
            width={imageWidth}
            height={imageHeight}
            alt=""
          />
        </div>
      </div>

      <div className="border border-gray-300 mx-8"></div>

      <div className="text-[10vw] lg:text-[4rem] pl-9 text-black lg:flex-[45]">
        Our <span className="text-amber-700">Associations</span>
        <div className="flex flex-col justify-center items-center lg:pt-52">
          <div className="flex lg:flex-row flex-col">
            <Image
              src="/Assoc1.png"
              width={AssocimageWidth}
              height={AssocimageHeight}
              alt=""
            />
            <Image
              src="/Assoc2.png"
              width={AssocimageWidth}
              height={AssocimageHeight}
              alt=""
            />
          </div>
          <Image
            src="/Assoc3.png"
            width={AssocimageWidth}
            height={AssocimageHeight}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default StandardisationsAndAssociations;

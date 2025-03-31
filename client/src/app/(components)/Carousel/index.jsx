"use client";

import React, { useCallback } from "react";
// import CarouselCard from "../(sub-components)/CarouselCard";
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Carousel = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay({ delay: 4000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const imageWidth = 512;
  const imageHeight = 1024;

  return (
    <div className="embla">
      <button
        title="left"
        className="relative left-0 p-2 translate-y-72 bg-gray-800 text-white rounded-full shadow-md opacity-80 hover:opacity-100 z-[5]"
        onClick={scrollPrev}
      >
        <ChevronLeft size={24} />
      </button>
      <div className="embla__viewport mx-auto bg-[#FFF5E4] mt-12 border py-10" ref={emblaRef}>
        <div className="embla__container h-full gap-10">
          <div className="embla__slide flex items-center jusitfy-center ml-10 rounded-full">
            <Image src="/Client1.jpeg" width={imageWidth} height={imageHeight} alt=""/>
          </div>
          <div className="embla__slide flex items-center jusitfy-center rounded-full">
            <Image src="/Client2.jpeg" width={imageWidth} height={imageHeight} alt=""/>
          </div>
          <div className="embla__slide flex items-center jusitfy-center rounded-full">
            <Image src="/Client3.jpeg" width={imageWidth} height={imageHeight} alt=""/>
          </div>
          <div className="embla__slide flex items-center jusitfy-center rounded-full">
            <Image src="/Client4.jpg" width={imageWidth} height={imageHeight} alt=""/>
          </div>
          <div className="embla__slide flex items-center jusitfy-center rounded-full">
            <Image src="/Client5.jpg" width={imageWidth} height={imageHeight} alt=""/>
          </div>
        </div>
      </div>
      <button
        title="right"
        className="relative left-0 p-2 bg-gray-800 -translate-y-64 translate-x-[103rem] text-white rounded-full shadow-md opacity-80 hover:opacity-100"
        onClick={scrollNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default Carousel;
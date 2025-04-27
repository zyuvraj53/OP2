"use client";
import Navbar from "./(components)/Navbar";
import WhatOurCustomersHaveToSay from "./(sub-pages)/WhatOurCustomers";
import WhoAreWe from "./(sub-pages)/WhoAreWe";
import Form from "./(components)/Form";
import Footer from "./(sub-pages)/Footer";
import StandardisationsAndAssociations from "./(sub-pages)/StdAndAss";
import Link from "next/link";
import WhoAreWeCarousel from "./(components)/WhoAreWeCarousel";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Desktop/Tablet Section (visible on sm and above, hidden on mobile) */}
      <section
        style={{ backgroundImage: "url('/Frame_20.png')" }}
        className="bg-no-repeat bg-cover bg-bottom w-full h-screen hidden sm:block"
      >
        <div className="lg:text-[5rem] text-[10vw] lg:pl-10 pl-3 pt-10 font-bold text-[#744d20]">
          Discover
        </div>
        <div className="lg:text-[5rem] text-[10vw] lg:pl-10 pl-3 font-bold text-[#744d20] mt-0 lg:-mt-[2rem]">
          Odisha&apos;s Heritage
        </div>
        <div className="pt-[2rem] lg:pt-[2rem] pl-[1rem] lg:pl-[3rem] mt-0 lg:-mt-[2rem] text-sm lg:text-xl font-semibold text-[#744d20]">
          OdishaPotli – Where Tradition Meets Handcrafted Elegance
        </div>

        <div className="px-[1rem] lg:px-12 mt-6 md:mt-10 lg:pb-[0.1rem] lg:-mb-5 text-[#744d20] text-sm sm:text-base md:text-lg leading-relaxed lg:text-left text-justify lg:max-w-2/3">
          OdishaPotli is your gateway to Odisha&apos;s rich heritage, offering a
          curated collection of handwoven sarees, handcrafted clothing, and
          traditional crafts, all meticulously created by skilled artisans. Our
          mission is to preserve age-old craftsmanship while empowering local
          artisans through fair trade and sustainable practices. Each purchase
          directly supports artisan livelihoods, ensuring the legacy of
          Odisha&apos;s exquisite artistry lives on.
        </div>

        <div className="flex justify-center items-center lg:justify-start">
          <Link href="/Shop/">
            <div className="text-center lg:mx-32 mx-0 py-3 lg:py-6 mt-6 lg:ml-[3rem] ml-0 lg:mt-[5rem] lg:pt-5 lg:pl-2 font-bold text-xl lg:text-3xl bg-[#97571c] hover:bg-[#7c4f2e] transition-colors duration-200 rounded-xl lg:w-[15rem] lg:h-[5rem] w-48 flex flex-row items-center justify-center hover:shadow-5xl">
              <button title="Explore!" onClick={() => {}}>
                Shop Now!
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* Mobile Section (visible on mobile, hidden on sm and above) */}
      <section className="bg-no-repeat bg-cover bg-bottom w-full h-screen sm:hidden flex flex-col justify-center px-4 bg-[#e8c49c]">
        <div className="lg:text-[5rem] text-[10vw] lg:pl-10 pl-3 -mt-16 font-bold text-[#744d20] text-left">
          Discover
        </div>
        <div className="lg:text-[5rem] text-[10vw] lg:pl-10 pl-3 font-bold text-[#744d20] mt-0 lg:-mt-[2rem]">
          Odisha&apos;s Heritage
        </div>

        <div
          style={{ backgroundImage: "url('Frame_20_mobile.png')" }}
          className="w-full h-2/5"
        ></div>
        <div className="pt-[2rem] lg:pt-[2rem] pl-[0.5rem] lg:pl-[3rem] mt-0 lg:-mt-[2rem] text-sm lg:text-xl font-semibold text-[#744d20]">
          OdishaPotli – Where Tradition Meets Handcrafted Elegance
        </div>

        <div className="text-[#744d20] pl-[0.5rem] text-md mt-4 leading-relaxed">
          Explore our curated collection of handwoven sarees and traditional
          crafts, crafted by Odisha&apos;s skilled artisans.
        </div>
          <Link href="/Shop/" >
            <div className="mt-6 py-3 w-40 bg-[#97571c] hover:bg-[#7c4f2e] transition-colors duration-200 rounded-lg font-bold text-lg text-white ml-[7rem] text-center">
              <button title="Explore!">Shop Now!</button>
            </div>
          </Link>
      </section>

      <WhoAreWeCarousel />

      <hr />

      <WhatOurCustomersHaveToSay />

      {/* <WelcomeToSocialsSection /> */}

      <StandardisationsAndAssociations />

      <div className="flex flex-row justify-center items-center font-bold">
        <div className="text-[6vw] text-black">
          <span className="text-[#97571c]">Contact</span> Us
        </div>
      </div>
      <Form />

      <Footer />
    </div>
  );
}

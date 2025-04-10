"use client";
import Navbar from "./(components)/Navbar";
import WhatOurCustomersHaveToSay from "./(sub-pages)/WhatOurCustomers";
import WhoAreWe from "./(sub-pages)/WhoAreWe";
import Form from "./(components)/Form";
import Footer from "./(sub-pages)/Footer";
import StandardisationsAndAssociations from "./(sub-pages)/StdAndAss";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <section
        style={{ backgroundImage: "url('/background.jpg')" }}
        className="bg-no-repeat bg-cover bg-bottom w-full h-screen"
      >
        <div className="lg:text-[5rem] text-[10vw] lg:pl-10 pl-3 pt-3 font-bold text-white">
          Discover
        </div>
        <div className="lg:text-[5rem] text-[10vw] lg:pl-10 pl-3 font-bold text-white">
          Odisha&apos;s Heritage
        </div>
        <div className="pt-[2rem] lg:pt-[3rem] pl-[1rem] lg:pl-[3rem] text-sm lg:text-xl font-semibold text-white">
          OdishaPotli – Where Tradition Meets Handcrafted Elegance
        </div>

        <div className="px-[1rem] lg:px-12 mt-6 md:mt-10 lg:pb-[0.1rem] lg:-mb-5 text-white text-sm sm:text-base md:text-lg leading-relaxed lg:text-left text-justify lg:max-w-3/4">
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
            <div className="text-center lg:mx-32 mx-0 py-3 lg:py-6 mt-6 lg:ml-[3rem] ml-0 lg:mt-[5rem] lg:pt-5 lg:pl-2 font-bold text-xl lg:text-3xl bg-green-400 hover:bg-green-500 transition-colors duration-200 rounded-xl lg:w-[15rem] lg:h-[5rem] w-48 flex flex-row items-center justify-center">
              <button title="Explore!" onClick={() => {}}>
                Explore Now!
              </button>
            </div>
          </Link>
        </div>
      </section>

      <WhoAreWe />

      <WhatOurCustomersHaveToSay />

      {/* <WelcomeToSocialsSection /> */}



      <StandardisationsAndAssociations />

      <div className="flex flex-row justify-center items-center font-bold">
        <div className="text-[6vw] text-black">
          <span className="text-amber-700">Contact</span> Us
        </div>
      </div>
      <Form />

      <Footer />
    </div>
  );
}

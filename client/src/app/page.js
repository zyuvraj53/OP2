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
      <section style={{ backgroundImage: "url('/background.jpg')" }} className="bg-no-repeat bg-cover bg-bottom w-full h-screen">
        <div className="lg:text-[5rem] text-[10vw] pt-5 p-[1rem] lg:p-[3rem] lg:pt-[6rem] font-bold text-white">
          Discover
        </div>
        <div className="lg:text-[5rem] text-[10vw] pt-5 lg:pt-4 pl-[1rem] lg:pl-[3rem] font-bold text-white">
          Odisha&apos;s Heritage
        </div>
        <div className="pt-[2rem] lg:pt-[3rem] pl-[1rem] lg:pl-[3rem] text-sm lg:text-xl font-semibold text-white">
          OdishaPotli – Where Tradition Meets Handcrafted Elegance
        </div>

        <div className="px-[1rem] lg:px-12 mt-6 md:mt-10 lg:pb-[0.1rem] lg:-mb-5 text-white text-sm sm:text-base md:text-lg leading-relaxed">
          OdishaPotli is your gateway to Odisha&apos;s rich heritage, offering a curated collection of handwoven sarees, handcrafted clothing, and traditional crafts, all meticulously created by skilled artisans. Our mission is to preserve age-old craftsmanship while empowering local artisans through fair trade and sustainable practices. Each purchase directly supports artisan livelihoods, ensuring the legacy of Odisha&apos;s exquisite artistry lives on. From the intricate weaves of Sambalpuri and Bomkai sarees to eco-friendly handcrafted apparel, our collection blends tradition with contemporary elegance. Committed to sustainability, we use natural materials and ethical production methods, making every piece an eco-conscious choice. Explore OdishaPotli and embrace the beauty of authentic craftsmanship while making a meaningful impact!
        </div>

        <Link href="/Shop/">
          <div className="text-center mx-32 py-6 mt-6 lg:ml-[3rem] lg:mt-[5rem] lg:pt-5 lg:pl-2 font-bold text-xl lg:text-3xl bg-green-400 hover:bg-green-500 transition-colors duration-200 rounded-xl lg:w-[15rem] lg:h-[5rem] flex items-center justify-center">
            <button title="Explore!" onClick={() => {}}>
              Explore Now!
            </button>
          </div>
        </Link>
      </section>

      <WhoAreWe />

      <WhatOurCustomersHaveToSay />

      {/* <WelcomeToSocialsSection /> */}

      <StandardisationsAndAssociations />

      <div className="flex flex-row justify-between font-bold">
        <div className="text-[10vw] pl-[25vw] text-black">
          <span className="text-amber-700">Contact</span> Us
        </div>
      </div>
      <Form />

      <Footer />
    </div>
  );
}
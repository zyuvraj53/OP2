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
        <div className="text-[3rem] lg:text-[5rem] pt-5 p-[1rem] lg:p-[3rem] lg:pt-[6rem] font-bold text-white">
          Discover
        </div>
        <div className="text-[3rem] lg:text-[5rem] pt-5 lg:pt-4 pl-[1rem] lg:pl-[3rem] font-bold text-white">
          Odisha&apos;s Heritage
        </div>
        <div className="pt-[2rem] lg:pt-[3rem] pl-[1rem] lg:pl-[3rem] text-sm lg:text-xl font-semibold text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nesciunt veniam!
        </div>

        <div className="px-[1rem] lg:px-12 mt-6 md:mt-10 lg:pb-[0.1rem] lg:-mb-5 text-white text-sm sm:text-base md:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt possimus fuga magnam culpa sed ab corporis cumque tenetur dicta veniam delectus, beatae harum eligendi? Natus amet at nisi commodi voluptatem facilis nemo autem quae ipsum, placeat suscipit molestiae rem sunt totam perspiciatis maiores magnam quo consequatur assumenda temporibus sequi illo repellat. Magnam ullam veniam repellat totam enim ex deleniti, pariatur inventore quisquam saepe ipsum itaque ad veritatis facilis rerum reiciendis nihil repudiandae accusantium adipisci necessitatibus voluptatem minima ducimus beatae! Cumque omnis ullam praesentium fugiat sint dolore rem sapiente officiis. Vitae libero quae sit odit sint consectetur doloremque suscipit iste. Deserunt.
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
        <div className="text-[5rem] pl-[50rem] text-black">
          <span className="text-amber-700">Contact</span> Us
        </div>
      </div>
      <Form />

      <Footer />
    </div>
  );
}
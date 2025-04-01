import FilledHeart from "../../(components)/(icons)/FilledHeart";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="min-w-full bg-[#fae5c3] text-lg mt-10 text-black">
      {/* Logo and Odisha Potli */}
      <div className="flex flex-row px-6 pt-5">
        <Link href="/">
          <img
            alt=""
            src="/Odisha_Potli_Logo.ico"
            className="w-full h-16 object-cover rounded-md mb-2"
          />
        </Link>
        <div className="text-3xl text-bold mt-4 pl-6">Odisha Potli</div>
      </div>

      {/* para and sections */}
      <div className="flex lg:flex-row flex-col justify-between">
        {/* Para */}
        <div className="lg:w-1/2 w-full lg:pl-6 pl-3 lg:pr-24 pr-3 pt-6 lg:text-left text-center text-xl text-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          nulla itaque, veritatis consectetur earum, autem perspiciatis illum
          libero aspernatur amet nam deleniti dolorum at sapiente atque
          accusantium quod minima sit!
        </div>

        {/* Sections */}
        <div className="flex lg:flex-row flex-col text-center justify-between lg:pr-16 gap-x-8">
          <div className="section-1 flex flex-col">
            <div className="lg:pb-6 pb-3 pt-6 text-bold">Explore</div>
            <div>
              <Link href="/Shop/category/mens-fashion">
                <div>
                  <button>Men&apos;s Fashion</button>
                </div>
              </Link>
              {/* <Link href="/Shop/category/womens-fashion">
                <div>
                  <button>Women&apos;s Fashion</button>
                </div>
              </Link> */}
              <Link href="/Shop/category/jewellery">
                <div>
                  <button>Jewellery</button>
                </div>
              </Link>
              <Link href="/Shop/category/accessories">
                <div>
                  <button>Accessories</button>
                </div>
              </Link>
              <Link href="/Shop/category/arts-crafts">
                <div>
                  <button>Art & Craft</button>
                </div>
              </Link>
              {/* <div>
                <button>Home Decor</button>
              </div> */}
              <Link href="/Shop/category/arts-crafts">
                <div>
                  <button>Traditional Toys</button>
                </div>
              </Link>
            </div>
          </div>
          <div className="section-2">
            <div className="lg:pb-6 pb-3 pt-6 text-bold">Community</div>

            <div>
              <Link href="Blogs">
                <div>
                  <button>Blogs</button>
                </div>
              </Link>
              <Link href="AboutUs">
                <div>
                  <button>Our Team</button>
                </div>
              </Link>
            </div>
          </div>
          <div className="section-3">
            <div className="lg:pb-6 pb-3 pt-6 text-bold">About Us</div>

            <div>
              <div>
                <button>Manifesto</button>
              </div>
              <div>
                <button>Partners</button>
              </div>
              <div>
                <button>Standardisations</button>
              </div>
              <div>
                <button>Association</button>
              </div>
              <Link href="/PrivacyPolicy">
                <div>
                  <button>Privacy Policy</button>
                </div>
              </Link>
              <Link href="/ShippingDeliveryPolicy">
                <div>
                  <button>Shipping & Delivery</button>
                </div>
              </Link>
              <Link href="/CookiePolicy">
                <div>
                  <button>Cookies Policy</button>
                </div>
              </Link>
              <Link href="/Cancellation&Refund">
                <div>
                  <button>Cancellation</button>
                </div>
              </Link>
            </div>
          </div>
          <div className="section-4 pb-6">
            <div className="lg:pb-6 pb-3 pt-6 text-bold">Socials</div>
            <div className="flex lg:flex-col flex-row justify-center items-center lg:gap-0 gap-6">
              <Link href="https://www.instagram.com/odishapotli?igsh=NmIzZ2FhcHI2YzZw">
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center">
                    <button className="flex flex-row justify-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-instagram-icon lucide-instagram"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="hidden md:block">Instagram</span>
                    </button>
                  </div>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/company/sarna-educational-and-cultural-services-llp/">
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center">
                    <button className="flex flex-row justify-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-linkedin-icon lucide-linkedin"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span className="hidden md:block">LinkedIn</span>
                    </button>
                  </div>
                </div>
              </Link>
              <Link href="https://www.youtube.com/@OdishaJourneys">
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center">
                    <button className="flex flex-row justify-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-youtube-icon lucide-youtube"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                      <span className="hidden md:block">Youtube</span>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call-Mail-Location */}
      <div className="lg:pl-6 text-xl lg:text-left text-center pb-6">
        <div>Tel: +917008099469 & +918144733341</div>
        <div>Email: contact@sarnaindia.in</div>
      </div>

      {/* Made with love */}
      <div className="flex items-center text-lg justify-center text-bold">
        Made with <FilledHeart /> from Odisha Potli
      </div>

      <hr className="my-4 border-1 border-black mx-12" />

      {/* Terms and Conditions */}
      <div className="flex lg:flex-row flex-col justify-between px-4 lg:text-justify text-center">
        <Link href="/TermsAndConditions">
          <div className="">Terms and Conditions</div>
        </Link>
        <div>&copy; All Rights Reserved for Odisha Potli, 2025</div>
      </div>
    </div>
  );
}

export default Footer;

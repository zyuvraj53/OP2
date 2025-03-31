import FilledHeart from '../../(components)/(icons)/FilledHeart'
import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div className='min-w-full bg-[#fae5c3] text-lg mt-10 text-black'>
      {/* Logo and Odisha Potli */}
      <div className='flex flex-row px-6 pt-5'>
        <Link href="/">
          <img
            alt=""
            src="/Odisha_Potli_Logo.ico"
            className="w-full h-16 object-cover rounded-md mb-2"
          />
        </Link>
        <div className='text-3xl text-bold mt-4 pl-6'>Odisha Potli</div>
      </div>

      {/* para and sections */}
      <div className='flex flex-row justify-between'>
        {/* Para */}
        <div className='w-1/2 pl-6 pr-24 pt-6 text-xl text-semibold'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nulla itaque, veritatis consectetur earum, autem perspiciatis illum libero aspernatur amet nam deleniti dolorum at sapiente atque accusantium quod minima sit!
        </div>

        {/* Sections */}
        <div className='flex flex-row justify-between pr-16 gap-x-8'>
          <div className='flex flex-col'>
            <div className='pb-6 text-bold'>
              Explore
            </div>
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
          <div>
            <div className='pb-6 text-bold'>
              Community
            </div>

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
          <div>
            <div className='pb-6 text-bold'>
              About Us
            </div>

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
              <Link
                href='/PrivacyPolicy'>
                <div>
                  <button>Privacy Policy</button>
                </div>
              </Link>
              <Link href='/ShippingDeliveryPolicy'>
                <div>
                  <button>Shipping & Delivery</button>
                </div>
              </Link>
              <Link href='/CookiePolicy'>
                <div>
                  <button>Cookies Policy</button>
                </div>
              </Link>
              <Link href='/Cancellation&Refund'>
                <div>
                  <button>Cancellation</button>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <div className='pb-6 text-bold'>
              Socials
            </div>
            <div>
              <Link href="https://www.instagram.com/odishapotli?igsh=NmIzZ2FhcHI2YzZw">
                <div>
                  <button>Instagram</button>
                </div>
              </Link>
              <div>
                <button>LinkedIn</button>
              </div>
              <div>
                <button>X (Formerly Twitter)</button>
              </div>
              <div>
                <button>Youtube</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-Mail-Location */}
      <div className='pl-6 text-xl'>
        <div>Tel: +917008099469 & +918144733341</div>
        <div>Email: contact@sarnaindia.in</div>
      </div>

      {/* Made with love */}
      <div className='flex items-center text-lg justify-center text-bold'>
        Made with <FilledHeart /> from Odisha Potli
      </div>

      <hr className="my-4 border-1 border-black mx-12" />

      {/* Terms and Conditions */}
      <div className='flex flex-row justify-between px-4'>
        <Link href='/TermsAndConditions'>
          <div className=''>
            Terms and Conditions
          </div>
        </Link>
        <div>
          &copy; All Rights Reserved for Odisha Potli, 2025
        </div>
      </div>
    </div >
  )
}

export default Footer
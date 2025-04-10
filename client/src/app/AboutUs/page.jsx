import React from 'react'
import WhoAreWe from '../(sub-pages)/WhoAreWe'
import Navbar from '../(components)/Navbar'
import MeetTheTeam from '../(sub-pages)/MeetTheTeam'
import AboutUsMarquee from '../(components)/(sub-components)/AboutUsMarquee'
import Footer from '../(sub-pages)/Footer'

function AboutUs() {
  return (
    <div className='bg-gray-100'>
      <Navbar />
        <WhoAreWe />
      <MeetTheTeam />

      <Footer />
    </div>
  )
}

export default AboutUs
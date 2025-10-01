import Footer from '@/components/Footer'
import NavbarOrganizer from '@/components/NavbarOrganizer'
import Finance from '@/components/organizer/Finance'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarOrganizer />
      <Finance />
      <Footer />
    </div>
  )
}

export default page

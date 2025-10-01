import Footer from '@/components/Footer'
import NavbarOrganizer from '@/components/NavbarOrganizer'
import Events from '@/components/organizer/Events'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarOrganizer />
      <Events />
      <Footer />
    </div>
  )
}

export default page

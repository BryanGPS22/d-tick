import Footer from '@/components/Footer'
import NavbarOrganizer from '@/components/NavbarOrganizer'
import CreateEvents from '@/components/organizer/CreateEvents'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarOrganizer />
      <CreateEvents />
      <Footer />
    </div>
  )
}

export default page

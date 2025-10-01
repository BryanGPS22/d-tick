import Footer from '@/components/Footer'
import NavbarAdmin from '@/components/NavbarAdmin'
import Organizer from '@/components/admin/Organizer'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarAdmin />
      <Organizer />
      <Footer />
    </div>
  )
}

export default page

import Footer from '@/components/Footer'
import NavbarAdmin from '@/components/NavbarAdmin'
import Reveneu from '@/components/admin/Reveneu'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarAdmin />
      <Reveneu />
      <Footer />
    </div>
  )
}

export default page

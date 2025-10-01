import Footer from '@/components/Footer'
import NavbarAdmin from '@/components/NavbarAdmin'
import Events from '@/components/admin/Events'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarAdmin />
      <Events />
      <Footer />
    </div>
  )
}

export default page

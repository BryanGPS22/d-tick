import Footer from '@/components/Footer'
import NavbarAdmin from '@/components/NavbarAdmin'
import Analytics from '@/components/admin/Analytics'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarAdmin />
      <Analytics />
      <Footer />
    </div>
  )
}

export default page

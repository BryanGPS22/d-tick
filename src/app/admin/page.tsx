import Footer from '@/components/Footer'
import NavbarAdmin from '@/components/NavbarAdmin'
import Isi from '@/components/admin/Isi'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarAdmin />
      <Isi />
      <Footer />
    </div>
  )
}

export default page

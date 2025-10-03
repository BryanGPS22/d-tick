import Navbar from '@/components/NavbarCustomer'
import React from 'react'
import Isi from "@/components/profile/Isi"
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div>
          <Navbar />
      <Isi />
      <Footer />
    </div>
  )
}

export default page

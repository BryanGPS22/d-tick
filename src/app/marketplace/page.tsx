import Navbar from '@/components/Navbar'
import React from 'react'
import Isi from "@/components/marketplace/Isi"
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

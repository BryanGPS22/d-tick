import Footer from '@/components/Footer'
import NavbarOrganizer from '@/components/NavbarOrganizer'
import OrganizerDashboard from '@/components/organizer/Dashboard'
import React from 'react'

const page = () => {
  return (
    <div>
          <NavbarOrganizer />
      <OrganizerDashboard />
      <Footer />
    </div>
  )
}

export default page

import React from 'react'
import SideBar from '../components/dashboardComponents/SideBar'
import Navbar from '../components/dashboardComponents/Navbar'
import DocumentCreationSection from '../components/dashboardComponents/DocumentCreationSection'
const DashBoardPage = () => {

  return (
    <>
      <Navbar />
      <section className={"dashboardContainer"}>
        <SideBar />
        <DocumentCreationSection/>
      </section>


    </>
  )
}

export default DashBoardPage
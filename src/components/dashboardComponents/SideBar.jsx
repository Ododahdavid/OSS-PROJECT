import React, { useState } from 'react'

const SideBar = () => {
    const [userDetails, setUserDetails] = useState({
        userName: "",
        organisationUserName:"",
        email: ""
    })
    return (
        <>

            <section className={"dashboardSideBar"}>

                <div className='sidebarTopHalf'>

                    <div className={"organisationDetailsDisplay"}>

                        <svg width="26" height="26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.844 7.875c-.138 1.906-1.552 3.375-3.094 3.375-1.542 0-2.959-1.468-3.094-3.375-.14-1.983 1.236-3.375 3.094-3.375 1.858 0 3.235 1.428 3.094 3.375Z"></path>
                            <path d="M15.75 14.25c-3.055 0-5.993 1.517-6.729 4.472-.097.391.148.778.55.778h12.358c.402 0 .646-.387.55-.778-.736-3.002-3.674-4.472-6.73-4.472Z"></path>
                            <path d="M9.375 8.716c-.11 1.522-1.253 2.722-2.484 2.722-1.232 0-2.377-1.2-2.485-2.722C4.294 7.132 5.406 6 6.891 6c1.484 0 2.596 1.161 2.484 2.716Z"></path>
                            <path d="M9.657 14.341c-.846-.387-1.778-.536-2.766-.536-2.437 0-4.786 1.211-5.374 3.572-.077.312.118.62.44.62h5.262"></path>
                        </svg>

                        <h2>Organisation Name</h2>

                    </div>

                    <br />

                    <button type='button' className={"sideSearchButton"}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727v0Z"></path>
                            <path d="M15.857 15.86 21 21.001"></path>
                        </svg>

                        search Documentations
                    </button>

                    <br />
                    <h4>
                        Recent Documentations

                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m5.25 8.625 6.75 6.75 6.75-6.75"></path>
                        </svg>

                    </h4>
                    <br />
                    <div className={"userDocumentationDisplay"}>
                        
                    </div>

                </div>

            </section>

        </>
    )
}

export default SideBar
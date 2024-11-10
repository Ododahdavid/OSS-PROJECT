import React, { useEffect, useState } from 'react'

const SideBar = () => {

    // state to manage user details to render on the sidebar
    const [userDetails, setUserDetails] = useState({
        userName: "",
        organisationUserName: "",
        email: ""
    })

    // function to get the user details from the local storage on mount of the page

    useEffect(() => {
        const userDetailsFromStorage = JSON.parse(localStorage.getItem('user'))
        if (userDetailsFromStorage) {
            setUserDetails(userDetailsFromStorage)
            console.log(userDetailsFromStorage)
        }
    }, [])

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

                        <h2>{userDetails.organisationUserName}</h2>

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



                </div>

                <br />

                <div className={"sideBarButtomHalf"}>

                    <div className={"userDetailsDisplay"}>

                        <div className={"userDisplayPicture"}>
                            {userDetails.userName && userDetails.userName[0].toUpperCase()}
                        </div>

                        <div className={"userDetailsMainDisplay"}>
                            <h3>{userDetails.userName}</h3>
                            <h6>{userDetails.email}</h6>
                        </div>


                    </div>

                    <div className={"logOutButton"}>
                        Sign Out

                        <svg width="26" height="26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 15.75v1.875a1.875 1.875 0 0 1-1.875 1.875h-7.5A1.875 1.875 0 0 1 3 17.625V6.375A1.875 1.875 0 0 1 4.875 4.5H12c1.036 0 2.25.84 2.25 1.875V8.25"></path>
                            <path d="M17.25 15.75 21 12l-3.75-3.75"></path>
                            <path d="M8.25 12h12"></path>
                        </svg>
                    </div>

                </div>

            </section>

        </>
    )
}

export default SideBar
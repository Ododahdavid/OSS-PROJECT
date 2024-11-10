// importing styles for styling
import "./styles/styles.css"
// importing dependencies
import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LogInPage.jsx"
const DashBoard = React.lazy(()=> import("./pages/DashBoardPage.jsx"))
function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
                <Route path="/signUpPage" element={<SignUpPage/>} />
                <Route path="/logInPage" element={<LoginPage/>} />
                <Route path="/dashBoard" element={<DashBoard/>}/>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

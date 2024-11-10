import React, { useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import LoginPage from "./LogInPage.jsx"
import toast, { Toaster } from "react-hot-toast";


const SignUpPage = () => {
    // State to manage form values and loading status
    const [signUpFormData, setsignUpFormData] = useState({
        organisationUserName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()

    // Handle input changes
    const handleInputValueChange = (event) => {
        const { name, value } = event.target;
        setsignUpFormData({ ...signUpFormData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic password confirmation check
        if (signUpFormData.password !== signUpFormData.confirmPassword) {
            
            toast.error("Passwords no do not match,  Try again", {
                style: {
                  background: "rgb(240, 139, 156)",
                },
              });
        }

        setIsSubmitting(true); // Disable button and show "Submitting"

        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organisationUserName: signUpFormData.organisationUserName,
                    userName: signUpFormData.userName,
                    email: signUpFormData.email,
                    password: signUpFormData.password,
                    confirmPassword: signUpFormData.confirmPassword
                }),
            });

            const result = await response.json();
            if (response.ok) {
                // alert('User registered successfully');
                toast.success("User Created Successfully", {
                    style: {
                      background: "rgb(144, 234, 96)",
                    },
                  });
                setTimeout(() => {
                    navigate("/logInPage")
                }, 2000)

                setsignUpFormData({
                    organisationUserName: '',
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }
                )
                // Reset form or redirect to another page
            } else {
                // alert(`Error: ${result.message || 'Something went wrong'}`);
                toast.error(`${result.message}`, {
                    style: {
                      background: "rgb(240, 139, 156)",
                    },
                  });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // alert('An error occurred. Please try again later.');
            toast.error("Oops! something went wrong,  Please try again later", {
                style: {
                  background: "rgb(240, 139, 156)",
                },
              });
        }

        setIsSubmitting(false); // Re-enable button after submission
    };

    return (
        <>
            <section className="signUpPageContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <br />
                    <label>Organisation Username:</label>
                    <input
                        name="organisationUserName"
                        value={signUpFormData.organisationUserName}
                        onChange={handleInputValueChange}
                        type="text"
                        placeholder="Organisation Username"
                        required
                    />
                    <br />
                    <label>Username:</label>
                    <input
                        name="userName"
                        value={signUpFormData.userName}
                        onChange={handleInputValueChange}
                        type="text"
                        placeholder="Username"
                        required
                    />
                    <br />
                    <label>Email:</label>
                    <input
                        name="email"
                        value={signUpFormData.email}
                        onChange={handleInputValueChange}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        name="password"
                        value={signUpFormData.password}
                        onChange={handleInputValueChange}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <br />
                    <label>Confirm Password:</label>
                    <input
                        name="confirmPassword"
                        value={signUpFormData.confirmPassword}
                        onChange={handleInputValueChange}
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />
                    <br />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                    <br />
                    <div className="or-container">
                        <hr className="line" /> or <hr className="line" />
                    </div>
                    <br />
                    <button type="button" className="githubSignUp">
                        Sign Up with Github
                    </button>
                    <br />
                    <p>
                        Already have an account?{' '}
                        <RouteLink to="/logInPage" className="loginLink">
                            Login
                        </RouteLink>
                    </p>
                </form>
                <Toaster position="top-center" reverseOrder={false} />

            </section>
        </>
    );
};

export default SignUpPage;

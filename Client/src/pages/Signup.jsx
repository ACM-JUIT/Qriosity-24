import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import pngimg from '../../public/logo-black.png';
import astro4 from '../../public/sam-williams-EHFXVkVe0gM-unsplash.jpg';

const passwordNotMatching = () => toast.error('Passwords do not match!!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const succesfulSignup = () => toast.success('Signup successful!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const generalError = () => toast.warn('Server error! Try again', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const userExistsError = () => toast.warn('User already exists!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(true);
    const spinnerRef = useRef(null);
    useEffect(() => {
      const spinner = spinnerRef.current;
      if (spinner) {
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    }, []);

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                passwordNotMatching();
                console.error("Passwords do not match");
                return;
            }

            const response = await fetch('http://localhost:3500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                succesfulSignup();
                console.log('User signed up successfully:', data);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
            } else {
                if (response.status === 400 && data.error === "Passwords do not match") {
                    passwordNotMatching();
                    console.error('Error signing up:', data.error);
                    setPassword('');
                    setConfirmPassword('');
                } else if (response.status === 400 && data.error === "User already exists") {
                    userExistsError();
                    console.error('Error signing up:', data.error);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    generalError();
                    console.error('Error signing up:', data.error);
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <>
        {
        loading ? (
            <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
                <div ref={spinnerRef} id="spinner" className="relative">
                    <l-quantum size="100" speed="2" color="white"></l-quantum>
                </div>
            </div>
        ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-950 to-gray-900 font-sans shadow-lg bg-no-repeat bg-cover">
        <div className="bg-gray-100 h-3/4 w-3/4 my-16 px-1 flex justify-center items-center">

            {/* Login Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="md:w-1/2 px-4 border-3 py-0 mt-4"
            >
            <h2 className='text-2xl mb-4'> Qriosity </h2>
            <img src={pngimg} className='h-32 mx-auto mt-0 md:order-2'/>
            <h1 className="text-4xl font-semibold mb-4 mx-auto my-auto text-center text-gray-700">Welcome !</h1>
            <h5 className='text-lg mx-auto text-center mb-12'>Please enter your details</h5>
            <div className="m-4 text-white p-2 rounded-lg shadow-md max-w-xxl flex-1 transition-all duration-300 justify-center">
                <form>
                    <div className="mb-4 px-6">
                        <label htmlFor="name" className="block text-gray-700 text-xl font-semibold">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Enter you name'
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label htmlFor="email" className="block text-gray-700 text-xl font-semibold">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Enter you email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label htmlFor="password" className="block text-gray-700 text-xl font-semibold">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Enter you password'
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-xl font-semibold">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder='Enter you password again'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}              
                        type="button"
                        onClick={handleSignUp}
                        className="mx-auto my-8 w-24 bg-green-500 hover:bg-green-600 text-white text-center p-2 rounded-md focus:outline-none focus:shadow-outline-green transition-all duration-300"
                    >
                        <p className='text-sm font-bold'>Sign Up</p>
                    </div>
                    <ToastContainer />
                </form>
                </div>
        </motion.div>
        {/* Image */}
            <div className='h-1/2 w-1/2 overflow-hidden'>
                <img src={astro4} className='object-cover w-full rounded-lg m-1 align-items justify-end' alt="Astronaut" />
            </div>
        </div>
        </div>
    )}
    </>
    );
};

export default SignUp;

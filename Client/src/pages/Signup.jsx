import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import pngimg from '../../public/logo-black.png';
import spacebg from '../assets/spacebg.jpg'
import '@fortawesome/fontawesome-free/css/all.css';

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

    const moveToLogin = async () => {
        navigate('/login')
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

        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-fuchsia-950 to-purple-600 font-sans shadow-lg bg-no-repeat bg-cover">
        <div className="bg-gray-100 h-[3/4] w-[4/5] my-16 flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.5),_0px_8px_24px_rgba(17,17,26,0.5),_0px_16px_56px_rgba(17,17,26,0.1)]">

        {/* Image */}
        <div className='h-[3/4] w-[1/2]'>
            <img src={spacebg} className='object-cover' alt="Space" />
        </div>

            {/* Login Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-1/2 px-4 border-3 py-0 mt-4"
            >
            {/* <h2 className='text-2xl mb-4'> Qriosity </h2> */}
            {/* <img src={pngimg} className='h-32 mx-auto mt-0 md:order-2'/> */}
            <h1 className="text-3xl font-semibold mb-4 text-gray-700">Welcome!</h1>
            {/* <h5 className='text-lg mx-auto text-center mb-12'>Please enter your details</h5> */}
            <div className="m-4 text-white p-2 rounded-lg shadow-md max-w-xxl flex-1 transition-all duration-300 justify-center">
                <form>
                    <div className="mb-4 px-6 flex bg-pink-400 rounded-full">
                        <label htmlFor="name" className="block text-gray-700 text-xl font-semibold w-12">
                            <i class="fas fa-user text-white"></i>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            className="w-full placeholder-white h-1/2 mt-1 p-1 bg-pink-400 focus:outline-none text-white"
                        />
                    </div>
                    <div className="mb-4 px-6 flex bg-pink-400 rounded-full">
                        <label htmlFor="email" className="block text-gray-700 text-xl font-semibold w-12">
                            <i class="fa fa-envelope text-white"></i>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full placeholder-white h-1/2 mt-1 p-1 bg-pink-400 focus:outline-none text-white"
                        />
                    </div>
                    <div className="mb-4 px-6 flex bg-pink-400 rounded-full">
                        <label htmlFor="password" className="block text-gray-700 text-xl font-semibold w-12">
                            <i class="fa fa-lock text-white"></i>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full placeholder-white h-1/2 mt-1 p-1 bg-pink-400 focus:outline-none text-white"
                        />
                    </div>
                    <div className="mb-4 px-6 flex bg-pink-400 rounded-full">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-xl font-semibold w-12">
                            <i class="fa fa-lock text-white"></i>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full placeholder-white h-1/2 mt-1 p-1 bg-pink-400 focus:outline-none text-white"
                        />
                    </div>
                    <div          
                        type="button"
                        onClick={handleSignUp}
                        className="mx-auto my-4 w-24 bg-purple-600 hover:bg-purple-700 text-white text-center p-2 rounded-md focus:outline-none focus:shadow-outline-green transition-all duration-300"
                    >
                        <p className='text-sm font-bold'>Sign Up</p>
                    </div>
                    <ToastContainer />
                </form>
            </div>
            <div className='signUpLink text-center flex flex-col items-center my-4 mx-auto'>
                <p className='text-xl'> Already have an account? </p>
                <p          
                    onClick={moveToLogin}
                    className="text-xl font-semibold text-blue-800"
                >
                    Login
                </p>
            </div>
        </motion.div>
        </div>
        </div>
    )}
    </>
    );
};

export default SignUp;

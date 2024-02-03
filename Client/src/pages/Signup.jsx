import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Astro from "../../src/assets/svg/Astronaut.svg";
import Ellipse2 from "../../src/assets/svg/Ellipse2.svg";
import LandingNavbar from '../common/components/LandingNavbar';
import '../index.css';

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

            const response = await fetch('https://qriosity-backend.onrender.com/signup', {
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

        <div className="main min-h-screen fixed inset-0 bg-cover overflow-hidden" style={{ backgroundImage: 'url("../../src/assets/low-angle-shot-mesmerizing-starry-sky 1.png")' }}>
        <LandingNavbar />
                            <div className="bg-[#0c0c0c] h-3/4 w-3/4 mx-auto my-auto flex justify-center item-center shadow-[0px_4px_16px_rgba(17,17,26,0.5),_0px_8px_24px_rgba(17,17,26,0.5),_0px_16px_56px_rgba(17,17,26,0.1)]">
                            <div className="imgdiv mx-auto my-auto hidden sm:block md:block w-full h-auto relative">
                            <img src={Ellipse2} alt="" className="absolute top-0 left-0 w-full h-auto z-0" />
                            <img src={Astro} alt="" className="animate__planet z-10 relative" />
                            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-3/4 my-4"
            >
                <div className=" mx-3 text-white p-2 shadow-md max-w-screen flex-1 transition-all duration-300">
                <h1 className="text-2xl sec-heading mb-4 text-[#a6c8d6]">Sign Up</h1>
                <form className=''>
                    <div className="mb-4 flex">
                        <label htmlFor="name" className="block text-[#a6c8d6] text-xl font-semibold w-12">
                            <i className="fas fa-user text-white py-3 mr-3"></i>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            className="w-[40vw] mb-5 px-0 py-2 font-semibold border-b-2 border-[#a6c8d6] outline-none bg-[#0c0c0c]"
                        />
                    </div>
                    <div className="mb-4  flex  ">
                        <label htmlFor="email" className="block text-[#a6c8d6] text-xl font-semibold w-12">
                            <i className="fa fa-envelope text-white py-3 mr-3"></i>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[40vw] mb-5 px-0 py-2 font-semibold  border-b-2 border-[#a6c8d6] outline-none bg-[#0c0c0c] "
                        />
                    </div>
                    <div className="mb-4  flex  ">
                        <label htmlFor="password" className="block text-[#a6c8d6] text-xl font-semibold w-12">
                            <i className="fa fa-lock text-white py-3 mr-3"></i>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[40vw] mb-5 px-0 py-2 font-semibold  border-b-2 border-[#a6c8d6] outline-none bg-[#0c0c0c] "
                        />
                    </div>
                    <div className="mb-4  flex ">
                        <label htmlFor="confirmPassword" className="block text-[#a6c8d6] text-xl font-semibold w-12">
                            <i className="fa fa-lock text-white py-3 mr-3"></i>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-[40vw] mb-5 px-0 py-2 font-semibold  border-b-2 border-[#a6c8d6] outline-none bg-[#0c0c0c] "
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
            <div className='signUpLink text-center flex flex-col items-center mx-auto'>
                <p className='text-lg font-thin text-[#a6c8d6]'> Already have an account? </p>
                <p
                    onClick={moveToLogin}
                    className="text-md font-thin text-[#6500E5]"
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

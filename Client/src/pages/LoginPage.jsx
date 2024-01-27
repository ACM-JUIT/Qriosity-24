import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pngimg from '../../public/logo-black.png';
import LandingNavbar from '../common/components/LandingNavbar';
import spacebg from '../assets/spacebg.jpg'
import { useLoginMutation } from '../app/api/apiSlice';
import { signIn } from '../redux/slices/userSlice';
import '@fortawesome/fontawesome-free/css/all.css';

const succesfulLogin = () => toast.success('Login successful!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const wrongPassword = () => toast.error('Wrong password!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const Login = () => {

  const dispatch = useDispatch();

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
  const [login] = useLoginMutation();

  const { isLoggedIn } = useSelector((state) => state.userSlice);
  useEffect(() => {
      if(isLoggedIn) {
        navigate("/leaderboard");
      }
  }, [isLoggedIn]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await login({ email, password }).unwrap();

            if (response) {

                succesfulLogin(); //toast
                dispatch(signIn(response))
                console.log('Checking for response', response)
                navigate('/portal')

            } else if(response.status === 401 && response.error === "Incorrect password") {
                wrongPassword(); //toast
                console.error('Error logging in:', response.status, response.error);
                console.log(response)
            } else {
                console.error('Error logging in:', response.status, response.error);
                console.log(response)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const moveToSignUp = async () => {
      navigate('/signup')
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
        <div className="bg-gray-100 h-3/4 w-3/4 my-16 flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.5),_0px_8px_24px_rgba(17,17,26,0.5),_0px_16px_56px_rgba(17,17,26,0.1)]">
    
    {/* Login Page Image */}
    <div className='h-full'>
      <img src={spacebg} className='object-cover w-full' alt="Space" />
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
    <h1 className="text-3xl font-semibold m-4 text-gray-700">Welcome Back!</h1>
    {/* <h5 className='text-lg mx-auto text-center mb-12'>Please enter your details</h5> */}
    <div className="m-4 text-white p-2 rounded-lg shadow-md max-w-xxl flex-1 transition-all duration-300 justify-center">
      <form>
        <div className="mb-4 px-6 flex bg-pink-400 rounded-full">
          <label htmlFor="email" className="block text-gray-700 text-xl font-semibold w-12">
            <i class="fa fa-envelope text-white"></i>
          </label>
          <input
            type="email"
            id="email"
            placeholder='Email'
            value={email}
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
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full placeholder-white h-1/2 mt-1 p-1 bg-pink-400 focus:outline-none text-white"
          />
        </div>
        <div
         whileHover={{ scale: 1.1 }}             
          type="button"
          onClick={handleLogin}
          className="mx-auto bg-purple-600 hover:bg-purple-700 text-white text-center p-2 focus:outline-none border-l border-r border-b border-black"
        >
          <p className='text-sm font-bold'>Login</p>
        </div>
                            
        <ToastContainer />
      </form>
    </div>
    <div className='signUpLink text-center flex flex-col items-center mt-8 mx-auto'>
      <p className='text-xl'> Don't have an account? </p>
      <p          
        onClick={moveToSignUp}
        className="text-xl font-semibold text-blue-800"
      >
        SignUp
      </p>
    </div>
    </motion.div>

  </div>
</div>
    )}
    </>
    );
};

export default Login;

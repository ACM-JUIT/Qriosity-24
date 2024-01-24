import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pngimg from '../../public/logo-black.png';
import astro from '../../public/nick-brunner-LXspKUjsgH0-unsplash.jpg';
import LandingNavbar from '../common/components/LandingNavbar';

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

const Login = ({ onLogin }) => {

  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
      if (isLoggedIn) router.push("/portal");
  }, [isLoggedIn]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                succesfulLogin();
                // console.log('User logged in successfully:', data);
                // onLogin(email);
                navigate('/portal')
            } else if(response.status === 401 && data.error === "Incorrect password") {
                wrongPassword();
                console.error('Error logging in:', data.error);
            } else {
                console.error('Error logging in:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        
        <div className="flex items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 font-sans" style={{ backgroundImage: 'url("../../public/background.png")', backdropFilter: 'blur(32px)' }}>
          < LandingNavbar/>
            <div className=" bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg h-screen w-screen m-8 flex opacity-100">
            <img src={astro} className='h-100 rounded-lg m-1 align-items opacity-100' alt="Astronaut"  />
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="md:w-1/2 p-8 border-3 mx-auto my-auto"
                >
    <img src={pngimg} className='h-32 mx-auto mt-0 md:order-2'/>
                    <h1 className="text-6xl font-semibold mb-4 mx-auto my-auto">Log in</h1>
                    <h5 className='text-2xl font-thin'>Enter your Email and password to proceed</h5>
                    <hr className='border-t border-gray-500 font-bold' />
    <div className="mt-10 text-white p-8 rounded-lg shadow-md max-w-xxl flex-1 transition-all duration-300 justify-center">
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-2xl">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-2xl">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none text-black focus:border-green-500 transition-all duration-300"
          />
        </div>
        <motion.button
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}              
          type="button"
          onClick={handleLogin}
          className=" mx-auto bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl focus:outline-none focus:shadow-outline-green transition-all duration-300"
        >
          Login
        </motion.button>
                            
        <ToastContainer />
      </form>
    </div>
    </motion.div>
  </div>
</div>

        
    );
};

export default Login;

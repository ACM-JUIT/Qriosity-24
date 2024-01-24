import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import astro2 from '../../public/adam-miller-dBaz0xhCkPY-unsplash.jpg';
import pngimg from '../../public/logo-black.png';
import astro from '../../public/nick-brunner-LXspKUjsgH0-unsplash.jpg';
import astro4 from '../../public/sam-williams-EHFXVkVe0gM-unsplash.jpg';
import astro3 from '../../public/spacex-OHOU-5UVIYQ-unsplash.jpg';
import { useLoginMutation } from '../app/api/apiSlice';
import { signIn } from '../redux/slices/userSlice';

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

    return (
        
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 font-sans shadow-lg bg-no-repeat bg-cover"
     style={{ backgroundImage: 'url("../../public/195750.jpg")' }}>
        <div className="bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg h-3/4 w-3/4 flex justify-center items-center">
        <div className='flex flex-row'>
          <div className="flex flex-col pr-2">
          <img src={astro} className='h-60 w-full rounded-lg m-1 align-items' alt="Astronaut" />
          <img src={astro2} className='h-60 w-full rounded-lg m-1 align-items' alt="Astronaut" />
            </div>
            <div className="flex flex-col pr-2">
          <img src={astro3} className='h-40 w-full  rounded-lg m-1 align-items' alt="Astronaut" />
          <img src={astro4} className='h-80 w-full rounded-lg m-1 align-items justify-end' alt="Astronaut" />
          </div>
          </div>
       
          
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="md:w-1/2 p-8 border-3 mx-auto my-auto"
                >
    <img src={pngimg} className='h-32 mx-auto mt-0 md:order-2'/>
    <h1 className="text-3xl font-semibold mb-4 mx-auto my-auto">Log in</h1>
    <h5 className='text-lg font-thin'>Enter your Email and password to proceed</h5>
    <hr className='border-t border-gray-500 font-bold' />
    <div className="mt-4 text-white p-2 rounded-lg shadow-md max-w-xxl flex-1 transition-all duration-300 justify-center">
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-xl">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-xl">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none text-black focus:border-green-500 transition-all duration-300"
          />
        </div>
        <motion.button
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}              
          type="button"
          onClick={handleLogin}
          className=" mx-auto bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl focus:outline-none focus:shadow-outline-green transition-all duration-300"
        >
          <p className='text-sm'>Login</p>
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

import '@fortawesome/fontawesome-free/css/all.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Astro from "../../public/svg/Astronaut.svg";
import Ellipse2 from "../../public/svg/Ellipse2.svg";
import { useLoginMutation } from '../app/api/apiSlice';
import LandingNavbar from '../common/components/LandingNavbar';
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

              <div className="main min-h-screen fixed inset-0 bg-cover overflow-hidden" style={{ backgroundImage: 'url("../../public/low-angle-shot-mesmerizing-starry-sky 1.png")' }}>
                <LandingNavbar />
                <div className="bg-[#0c0c0c] h-3/4 w-3/4 mx-auto my-auto flex justify-center item-center shadow-[0px_4px_16px_rgba(17,17,26,0.5),_0px_8px_24px_rgba(17,17,26,0.5),_0px_16px_56px_rgba(17,17,26,0.1)]">
    
    {/* Login Page Image */}
    <div className="imgdiv mx-auto my-auto hidden sm:block md:block w-full h-auto relative">
  <img src={Ellipse2} alt="" className="absolute top-0 left-0 w-full h-auto z-0" />
  <img src={Astro} alt="" className="animate__planet z-10 relative" />
</div>

    {/* Login Form */}
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="w-3/4 my-4"
    >
    
                    <div className="m-4 text-white p-2 rounded-lg shadow-md max-w-screen flex-1 transition-all duration-300 justify-center">
                    <h1 className="text-2xl sec-heading mb-4 text-[#a6c8d6]">Log In</h1>
      <form>
        <div className="mb-4 flex">
          <label htmlFor="email" className="block text-[#a6c8d6] text-xl font-semibold w-12">
            <i className="fa fa-envelope text-white py-3 mr-3"></i>
          </label>
          <input
            type="email"
            id="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[40vw] mb-5 px-0 py-2 font-semibold border-b-2 border-[#a6c8d6] outline-none bg-[#0c0c0c]"
          />
        </div>
        <div className="mb-4 flex">
          <label htmlFor="password" className="block text-gray-700 text-xl font-semibold w-12">
            <i className="fa fa-lock text-white py-3 mr-3"></i>
          </label>
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[40vw] mb-5 px-0 py-2 font-semibold border-b-2 border-[#a6c8d6] outline-none bg-[#0c0c0c]"
          />
        </div>
        <div
          type="button"
          onClick={handleLogin}
          className="mx-auto bg-purple-600 hover:bg-purple-700 text-white text-center p-2 focus:outline-none border-l border-r border-b border-black"
        >
          <p className='text-sm font-bold'>Login</p>
        </div>
        <ToastContainer />
      </form>
    </div>
    <div className=' text-center flex flex-col items-center mt-8 mx-auto'>
      <p className='text-lg font-thin text-[#a6c8d6]'> Don&apos;t have an account? </p>
      <p
        onClick={moveToSignUp}
        className="text-md font-thin text-[#6500E5]"
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

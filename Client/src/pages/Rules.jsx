import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import belt from '../../src/assets/svg/belt.svg';
import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';
import '../index.css';

const Rules = () => {
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

  const rulesData = [
    'People outside JUIT need to use their college IDs for entering the game.',
    'Register yourself on the QRIOSITY 4.0 website to access the questions using JUIT Solan Email ID only.',
    'Each question is a list of hints directing to a certain term or company or software, everything is related to the technical world. Internet is your comrade, go crazy.',
    '6 hours will be allotted (starting at 4 PM, 03/02/2024) to complete the whole quiz.',
    'Answers are NOT case sensitive.',
    'Write your answer in the given box. If the answer is correct, you\'ll be allowed to move to the next question. If not correct, keep trying, infinite tries are there.',
    'If the answer contains multiple words, remove white space. For example, if the answer is “United Airlines”, submit it as “unitedairlines” only.',
    'The answer can contain numerals too. For example, if the answer is “4chan”, submit it as “4chan” only.',
    'Ranks can be viewed on the real-time leaderboard. The leaderboard is updated every time a submission is made.',
    'Once the timer starts, it can\'t be paused. It is a race against time.',
    'To see yourself on the leaderboard, you have to register for Qriosity 4.0 using the provided link, or else your participation won\'t be considered.',
    'If any kind of cheating is found, you\'ll be disqualified, and the decision of the organizers will be final.',
  ];

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
          <div ref={spinnerRef} id="spinner" className="relative">
            <l-quantum size="100" speed="2" color="white"></l-quantum>
          </div>
        </div>
      ) : (
        <div className="min-h-screen inset-0 bg-cover overflow-hidden font-sans " style={{ backgroundImage: 'url("../../src/assets/low-angle-shot-mesmerizing-starry-sky 1.png")' }}>
            <LandingNavbar />
            <img
              src={belt}
              alt="Ast"
              className="absolute z-9 h-[45vh] w-[45vw] sm:h-[25vh] sm:w-[35vw] md:h-[20vh] md:w-[30vw] lg:h-[50vh] lg:w-[50vw] animate__planet "
            />
            <div
              className='rulesInfo m-4 mt-8 rounded-md backdrop-filter backdrop-blur-sm border border-gray-500 flex flex-col bg-opacity-50'
            >
            <motion.div
              layout
              animate={{ opacity: [0, 1], y: ['25%', '0%'], x: ['0%', '0%'] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              initial={{ opacity: 0, y: '0%', x: '0%' }}
              >
            <h1 className='text-5xl text-white font-bold my-8 flex justify-center item-center sec-heading'> Rules </h1>
            <ul className='rulesData leading-9 tracking-wide text-xl list-disc mx-12 p-4 text-white'>
              {rulesData.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
            <h1 className='text-3xl font-bold mb-8 flex justify-center item-center text-[#FDF0D1] sec-heading'> Happy Hunting!! </h1>
              </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rules;

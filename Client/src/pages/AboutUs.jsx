import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import setallite from '../../src/assets/svg/sattelite.svg';
import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';
import '../index.css';

const AboutUs = () => {
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

  const aboutUsData = [
    {
      title: 'About Qriosity 4.0',
      content: `ACM JUIT is excited to announce QRIOSITY 4.0, an exclusive online quiz contest designed to challenge your knowledge and logic across various tech domains. Prepare for a thrilling 6-hour competition where you will race against time, showcasing your ability to think creatively and solve diverse challenges. Harness the power of the internet as you embark on this exhilarating quest for answers. Get ready to dive deep into the realms of tech and let your Qriosity soar!`,
    },
    {
      title: 'About ACM-JUIT',
      content: `Welcome to the ACM Student Chapter at Jaypee University of Information Technology (JUIT), where we strive for collaborative excellence in the ever-evolving world of technology. Established in 2014 and headquartered in Solan, Himachal Pradesh, our dynamic community comprises 100+ dedicated members passionate about software development, technology, and innovation. Our chapter is committed to fostering a spirit of teamwork, offering a platform for learning through bootcamps, teaching sessions, and flagship events like Qriosity and Hache. We take pride in organizing competitions and fun activities tailored for freshmen, ensuring a holistic and enjoyable learning experience. At ACM-JUIT, our strength lies in the strong bond among our organizers. Led by teams specializing in Web development, App development, Operations, Public Relations, AI/ML, Competitive Programming, Design, IoT, and Fintech, our collaborative efforts create a vibrant community. Join us on this exciting journey of exploration, skill development, and camaraderie in technology. Explore more about our initiatives and events on our `,
      link: 'https://juit.acm.org/',
    },
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
              src={setallite}
              alt="Ast"
              className="absolute z-9 top-[7vh] left-[60vw] transform -translate-x-1/2 -translate-y-1/2 h-[45vh] w-[45vw] sm:h-[25vh] sm:w-[35vw] md:h-[20vh] md:w-[30vw] lg:h-[50vh] lg:w-[50vw] animate__planet"
            />
            <div className=' m-4 mt-8 rounded-md backdrop-filter backdrop-blur-sm border border-gray-500 flex flex-col bg-opacity-50'>
              <motion.div
              layout
              animate={{ opacity: [0, 1], y: ['25%', '0%'], x: ['0%', '0%'] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              initial={{ opacity: 0, y: '0%', x: '0%' }}
              >
              <h1 className='text-5xl font-bold my-8 flex justify-center item-center text-white sec-heading'> About Us </h1>
            <ul className='aboutUsData list-disc m-8'>
              {aboutUsData.map((item, index) => (
                <React.Fragment key={index}>
                  <h2 className='text-3xl font-bold m-4 mx-auto text-[#FDF0D1] sec-heading'>{item.title}</h2>
                  <p className="text-xl p-1 text-white">{item.content}</p>
                  {item.link && (
                    <p className='text-xl p-1 text-white'>
                      Explore more about our initiatives and events on our{' '}
                      <a href={item.link} target="_blank" className='font-semibold text-[#FDF0D1]' rel='noopener noreferrer'>
                        website
                      </a>
                    </p>
                  )}
                </React.Fragment>
              ))}
            </ul>
              </motion.div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUs;

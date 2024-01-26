import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';
import React, { useState, useEffect, useRef } from 'react';

function AboutUs() {

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

    <div className="aboutUs bg-cover bg-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 font-sans" style={{ backgroundImage: 'url("../../public/background.png")', backdropFilter: 'blur(32px)', backgroundRepeat: 'repeat' }}>
      <LandingNavbar />
      <div className='aboutUsInfo bg-gray-100 bg-opacity-80 rounded-md m-10 p-4 flex flex-col'>
        <h1 className='text-3xl underline font-bold m-4 mx-auto'> About Us </h1>
        <ul className='aboutUsData list-disc m-8'>
        <h2 className='text-2xl underline font-bold m-4 mx-auto'> About Qriosity 4.0 </h2>
        <p className="text-xl p-4">
        ACM JUIT is excited to announce QRIOSITY 4.0, an exclusive online quiz contest designed to challenge your knowledge and logic across various tech domains. Prepare for a thrilling 6-hour competition where you'll race against time, showcasing your ability to think creatively and solve diverse challenges. Harness the power of the internet as you embark on this exhilarating quest for answers. Get ready to dive deep into the realms of tech and let your Qriosity soar!
        </p>
        <br />
        <br />
        <br />
        <h2 className='text-2xl underline font-bold m-4 mx-auto'> About ACM-JUIT </h2>
        <p className='text-xl p-4'>
        Welcome to the ACM Student Chapter at Jaypee University of Information Technology (JUIT), where we strive for collaborative excellence in the ever-evolving world of technology. Established in 2014 and headquartered in Solan, Himachal Pradesh, our dynamic community comprises 100+ dedicated members passionate about software development, technology, and innovation. Our chapter is committed to fostering a spirit of teamwork, offering a platform for learning through bootcamps, teaching sessions, and flagship events like Qriosity and Hache. We take pride in organizing competitions and fun activities tailored for freshmen, ensuring a holistic and enjoyable learning experience.
        <br />
        <br />
        At ACM-JUIT, our strength lies in the strong bond among our organizers. Led by teams specializing in Web development, App development, Operations, Public Relations, AI/ML, Competitive Programming, Design, IoT, and Fintech, our collaborative efforts create a vibrant community. Join us on this exciting journey of exploration, skill development, and camaraderie in technology. Explore more about our initiatives and events on our <a href="https://juit.acm.org/" target="_blank" className='font-semibold text-gray-900 underline dark:text-black decoration-sky-500' rel='noopener noreferrer'>website</a>
        </p>
        </ul>
      </div>
    </div>
    )}
    </>
    );
};

export default AboutUs;
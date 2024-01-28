'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../../public/bgvideo2.mp4';
import styles from '../Styles/Landing.module.scss';
import Countdown from '../common/components/Countdown';
import LandingNavbar from '../common/components/LandingNavbar';
import '../index.css';
import useMousePosition from '../utils/useMousePosition';

// spiral
import 'ldrs/quantum';


const LandingPage = () => {
    const navigate = useNavigate();

    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleVideoLoad = () => {
        setVideoLoaded(true);
    };

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

    const handleGetStarted = () => {
        navigate('/login');
    };

    const { x, y } = useMousePosition();

    const [isHovered, setisHovered] = useState(false);
    const size = isHovered ? 500 : 40;

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
        <div className={styles.main}>
                            <LandingNavbar />
                            <video
                        className={styles.videoBackground}
                        autoPlay
                        loop
                        muted
                        onLoadedData={handleVideoLoad}
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                    </video>
            <motion.div
                className={styles.mask}
                animate={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{
                    type: 'tween',
                    ease: 'backOut',
                }}
            >
                <p
                    onMouseEnter={() => setisHovered(true)}
                    onMouseLeave={() => setisHovered(false)}
                    className='mb-7 text-7xl'
                >
                 Our 6 hour schedule is jam-packed with a brilliant & creative questionnaire
                </p>
                <p
  onMouseEnter={() => setisHovered(true)}
  onMouseLeave={() => setisHovered(false)}
  className="whitespace-pre-line break-words"
>
  <p className=" text-[#f472b6]">
    Don’t hesitate to go insane with your thinking and answers!
  </p>
  <p className="text-[#f472b6]">
    If you think you have got the skills to solve hidden clues and make sense out
    of random hints,
  </p>
  <p className='text-[#f472b6]'>
    this one is definitely for you.
  </p>
</p>

                <motion.button
                onMouseEnter={() => setisHovered(true)}
                onMouseLeave={() => setisHovered(false)}
                onClick={handleGetStarted}
                className={styles.buttons}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
            >
                Hop In!
            </motion.button>
            </motion.div>
            <div className={styles.body}>
            <Countdown/>
            </div>
            </div>
        )}
        </>
    );
};

export default LandingPage;

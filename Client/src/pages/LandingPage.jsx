'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Landing.module.scss';
import LandingNavbar from '../common/components/LandingNavbar';
import '../index.css';
import useMousePosition from '../utils/useMousePosition';

// spiral
import 'ldrs/quantum'


const LandingPage = () => {
    const navigate = useNavigate();

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
    const size = isHovered ? 400 : 40;

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
                    className='p-4'
                >
                    Embark on an intellectual journey where <span className='text-green-700'>every click is a clue</span> and every search takes you closer to victory. Think you have got what it takes? Dive into the cerebral adventure now!
                </p>
                <motion.button
                onMouseEnter={() => setisHovered(true)}
                onMouseLeave={() => setisHovered(false)}
                onClick={handleGetStarted}
                className={styles.buttons}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Hop In!
            </motion.button>
            </motion.div>
            <div className={styles.body}>
                <p className='p-4'>
                Unlock the Power of Your Mind: Join the <span><b>Qriosity</b></span> A mind-bending event where Google is your secret weapon and intelligence is your key to success. Are you ready to outsmart the challenge?
                </p>
            </div>
            </div>
        )}
        </>
    );
};

export default LandingPage;

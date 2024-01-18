'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Landing.module.scss';
import Footer from '../common/components/Footer';
import '../index.css';
import useMousePosition from '../utils/useMousePosition';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    const { x, y } = useMousePosition();

    const [isHovered, setisHovered] = useState(false);
    const size = isHovered ? 400 : 40;

    return (
        <>
        <div className={styles.main}>
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
                >
                    Embark on an intellectual journey where <span>every click is a clue</span> and every search takes you closer to victory. Think you've got what it takes? Dive into the cerebral adventure now!
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
                <p>
                Unlock the Power of Your Mind: Join the <span>Qriosity</span> A mind-bending event where Google is your secret weapon and intelligence is your key to success. Are you ready to outsmart the challenge?
                </p>
            </div>
            </div>
            <Footer/>
            </>
    );
};

export default LandingPage;

'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Landing.module.scss';
import '../index.css';
import useMousePosition from '../utils/useMousePosition';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/home');
    };

    const { x, y } = useMousePosition();

    const [isHovered, setisHovered] = useState(false);
    const size = isHovered ? 400 : 40;

    return (
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
                    Lorem ipsum <span>dolor sit amet consectetur adipisicing elit</span>.
                    Doloribus ipsam ratione nemo soluta,
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
                Get Started!
            </motion.button>
            </motion.div>
            <div className={styles.body}>
                <p>
                    Kuch toh likha hai. <br />
                    Or bhot kuch bhi likhna hai
                </p>
            </div>
        </div>
    );
};

export default LandingPage;

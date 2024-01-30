import 'animate.css';
import { motion } from 'framer-motion';
import 'ldrs/quantum';
import { useEffect, useRef, useState } from 'react';
import Q from '../../public/svg/Q.svg';
import mars from '../../public/svg/mars.svg';
import astroid1 from '../../public/svg/pngwing2.svg';
import astroid2 from '../../public/svg/pngwing4.svg';
import setallite from '../../public/svg/sattelite.svg';
import '../Styles/animations.css';
import Countdown from "../common/components/Countdown";
import LandingNavbar from "../common/components/LandingNavbar";



function LandingPage() {

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
                ) :
                    (
                        <div className="main min-h-screen fixed inset-0 bg-cover overflow-hidden" style={{ backgroundImage: 'url("../../public/low-angle-shot-mesmerizing-starry-sky 1.png")' }}>
                            <LandingNavbar />
                            <div className='flex flex-col'>
                                <Countdown />
                                <motion.div
                                    layout
                                    animate={{ opacity: [0, 1], y: ['50%', '0%'], x: ['0%', '0%'] }}
                                    transition={{ duration: 1.0, ease: 'easeInOut', delay: '1.0' }}
                                    initial={{ opacity: 0, y: '0%', x: '0%' }}
                                    className={`text-[#ffff] text-xl top-1/2 right-1/2 text-bold transform -translate-x-1/2 flex mx-auto items-center`}
                                >
                                    Clock is Ticking!
                                </motion.div>
                            </div>

                            <div className="item-container">
                                <div className="relative svgclass min-w-screen">
                                    <img
                                        src={astroid1}
                                        alt="Ast"
                                        className="absolute left-[65vw] transform -translate-x-1/2 -translate-y-1/2 h-[20vh] w-[20vh] sm:h-[15vh] sm:w-[15vh] md:h-[10vh] md:w-[10vh] lg:h-[8vh] lg:w-[8vh] rotate-15 animate__rotate"
                                    />
                    

                                    <img
                                        src={setallite}
                                        alt="Ast"
                                        className="absolute z-9 top-[20vh] left-[60vw] transform -translate-x-1/2 -translate-y-1/2 h-[45vh] w-[45vw] sm:h-[25vh] sm:w-[35vw] md:h-[20vh] md:w-[30vw] lg:h-[50vh] lg:w-[50vw] animate__floating"
                                    />


                                    <img
                                        src={astroid2}
                                        alt="Ast"
                                        className="absolute z-n1 top-[50vh] transform -translate-x-1/2 -translate-y-1/2 h-[15vh] w-[25vw] sm:h-[12vh] sm:w-[20vw] md:h-[10vh] md:w-[15vw] lg:h-[8vh] lg:w-[12vw] animate__floating"
                                    />
                                    <motion.div
                                        layout
                                        animate={{ opacity: [0, 1], y: ['50%', '0%'], x: ['0%', '0%'] }}
                                        transition={{ duration: 1.0, ease: 'easeInOut', delay: '0.5' }}
                                        initial={{ y: '0%', x: '0%' }}
                                        className='text-[#FDF0D1] text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl absolute top-[24vh] left-[20vw] sm:top-[10vh] md:top-[20vh] sm:left-[10vw] md:left-[20vw] text-bold transform -translate-x-1/2 flex items-center glow-text'
                                    >
                                        Our 6-hour schedule is jam-packed with a brilliant & creative questionnaire
                                    </motion.div>
                                </div>
                                <motion.div
                                    layout
                                    animate={{ y: ['50%', '0%'], x: ['0%', '0%'] }}
                                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                                    viewport={{ once: true }}
                                    initial={{ y: '0%', x: '0%' }}
                                    className='z-n1 text-[16vw] h-auto text-white absolute top-[38vh] left-[18vw] flex items-center'
                                >
                                    <span className='h-auto w-[18vw] text-white'>
                                        <img src={Q} alt="" className="mr-2 w-screen max-h-screen" />
                                    </span>
                                    <h1 className="ml-2 ">riosity</h1>
                                </motion.div>


                                <div className='top-1/2 left-1/4 right-1/4 absolute animate__rotate z-99'>
                                    <img
                                        src={mars}
                                        alt="Mars"
                                    />
                                </div>




                            </div>
                        </div>)}
        </>
        
    );
    }

    export default LandingPage;

import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../Styles/Home.css';
import Navbar from '../common/components/Navbar';
import { selectCurrentToken } from '../redux/slices/userSlice';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

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

    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3500/leaderboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch leaderboard. Status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setLeaderboard(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchData();
    });

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

        <div className='leaderboard-container bg-cover bg-center min-h-screen p-4' style={{backgroundImage: 'url("../../public/cropped-1920-1200-43865.jpg")'}}>
            <Navbar />
            <AnimatePresence mode='wait'>
            <h2 className="text-3xl font-semibold text-white mb-4 mt-8">Chart</h2>
        <div className="h-full w-full bg-white-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 p-4">
            
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-center text-gray-300 py-2 px-4 border-b">Rank</th>
                        <th className="text-center text-gray-300 py-2 px-4 border-b">Username</th>
                        <th className="text-center text-gray-300 py-2 px-4 border-b">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr key={index} className='names'>
                            <td className="text-white py-2 px-4 border-b">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                            </td>
                            <td className="text-white py-2 px-4 border-b">{user.name}</td>
                            <td className="text-white py-2 px-4 border-b">{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
                </AnimatePresence>
            </div>
    )}
    </>
    );
};

export default Leaderboard;

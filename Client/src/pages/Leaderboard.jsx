import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
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

        <div className='leaderboard-container bg-cover bg-center min-h-screen p-4 bg-[#0c0c0c]'>
            <Navbar />
            <AnimatePresence mode='wait'>
        <div className="h-full w-full bg-gray-900 rounded-md backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 p-4 mt-10">
            
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-center text-xl text-white py-2 px-4 border-b">Rank</th>
                        <th className="text-center text-xl text-white py-2 px-4 border-b">Username</th>
                        <th className="text-center text-xl text-white py-2 px-4 border-b">Top Positions</th>
                        <th className="text-center text-xl text-white py-2 border-b">Questions Solved</th>
                        <th className="text-center text-xl text-white py-2 px-4 border-b">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr key={index} className='names'>
                            <td className="text-white text-xl py-2 px-4 border-b">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                            </td>
                            <td className="text-white text-xl py-2 px-4 border-b">{user.name}</td>
                            <td className="text-white text-xl py-2 px-4 border-b">
                                {index === 0 ? '🟢' : index === 1 ? '🟢' : index === 2 ? '🟢' : index === 3 ? '🟢' :index === 4 ? '🟢' :index === 5 ? '🟢' : '🔴'}
                            </td>
                            <td className="text-white text-xl py-2 border-b">{user.points/10}</td>
                            <td className="text-white text-xl py-2 px-4 border-b">{user.points}</td>
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

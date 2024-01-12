import { useEffect, useState } from 'react';

interface User {
    name: string;
    points: number;
}

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<User[]>([]);

    useEffect(() => {
        // Fetch leaderboard data from the server
        fetch('http://localhost:3500/leaderboard')
            .then(response => response.json())
            .then(data => setLeaderboard(data))
            .catch(error => console.error('Error fetching leaderboard:', error));
    }, []);

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h2 className="text-3xl font-semibold text-white mb-4">Leaderboard</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left text-gray-300 py-2 px-4 border-b">Rank</th>
                        <th className="text-left text-gray-300 py-2 px-4 border-b">Username</th>
                        <th className="text-left text-gray-300 py-2 px-4 border-b">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr key={index}>
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
    );
}

export default Leaderboard;

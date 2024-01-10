import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User logged in successfully:', data);
            } else {
                console.error('Error logging in:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 font-sans">
            <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg max-w-md transition-all duration-300">
                <h2 className="text-3xl font-semibold mb-4">Log in</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded focus:outline-none focus:shadow-outline-blue transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

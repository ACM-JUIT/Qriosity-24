import { useState } from 'react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:3500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User signed up successfully:', data);
            } else {
                console.error('Error signing up:', data.error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg max-w-md transition-all duration-300">
                <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
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
                        <label htmlFor="email" className="block text-gray-300">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded focus:outline-none focus:shadow-outline-blue transition-all duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

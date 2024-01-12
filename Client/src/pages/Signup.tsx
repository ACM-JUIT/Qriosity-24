import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const passwordNotMatching = () => toast.error('Passwords do not match!!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const succesfulSignup = () => toast.success('Signup successful!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const generalError = () => toast.warn('Server error! Try again', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const userExistsError = () => toast.warn('User already exists!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                passwordNotMatching();
                console.error("Passwords do not match");
                return;
            }

            const response = await fetch('http://localhost:3500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                succesfulSignup();
                console.log('User signed up successfully:', data);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                if (response.status === 400 && data.error === "Passwords do not match") {
                    passwordNotMatching();
                    console.error('Error signing up:', data.error);
                    setPassword('');
                    setConfirmPassword('');
                    navigate('/login');
                } else if (response.status === 400 && data.error === "User already exists") {
                    userExistsError();
                    console.error('Error signing up:', data.error);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    generalError();
                    console.error('Error signing up:', data.error);
                }
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
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-300">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-500 rounded focus:outline-none text-black focus:border-blue-500 transition-all duration-300"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded focus:outline-none focus:shadow-outline-blue transition-all duration-300"
                    >
                        Sign Up
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default SignUp;

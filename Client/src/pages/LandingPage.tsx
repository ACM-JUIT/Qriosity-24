import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/home');
    };

    return (
    <div>
        <h1>Landing Page</h1>
            <button
                type="button"
                onClick={handleGetStarted}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Getting Started
            </button>
    </div>
    );
};

export default LandingPage;

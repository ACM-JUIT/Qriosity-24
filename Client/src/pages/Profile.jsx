import React, { useState, useEffect } from 'react';
import Login from './LoginPage';
import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/user?email=${Login.email}`);
        const userData = await userResponse.json();
        console.log(userResponse);
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (Login.email) {
      fetchUserData();
    }
  }, [Login.email]);


  const logout = () => {
    // logic 
    console.log('User logged out');
  };

  const login = () => {
    navigate('/login')
    console.log('');
  };

  return (
    <div className="profile Container bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <Navbar />
      <div className='userData bg-white rounded-md m-10 p-4 flex flex-col items-center'>
        {userData ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Welcome, {userData.username}!!</h1>
            <p>
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-bold">Points:</span> {userData.points}
            </p>
            <button
              className='mt-4 p-2 bg-red-500 text-white rounded-md' 
              onClick={logout}>
                Logout
            </button>
          </>
        ) : (
          <>
            <p className="font-bold" >User data not found!!</p>
            <button
              className='mt-4 p-2 bg-green-500 text-white rounded-md' 
              onClick={login}>
                Login
            </button>
          </> 
        )}
      </div>
  </div>
  );
}


export default Profile;
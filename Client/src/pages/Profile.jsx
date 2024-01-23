import React, { useState, useEffect } from 'react';
import Login from './LoginPage';
import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/user?email=${Login.email}`);
        const userData = await userResponse.json();
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

  return (
    <div className="profile Container bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <Navbar />
      <div className='userData'>
      {userData ? (
        <>
          <h1>Welcome, {userData.username}!!</h1>
            <p>
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-bold">Points:</span> {userData.points}
            </p>
          </>
        ) : (
          <p>User data not found.</p>
        )}
    </div>
    <button onClick={logout}>Logout</button>
  </div>
  );
}


export default Profile;
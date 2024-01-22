import React, { useState, useEffect } from 'react';
import Login from './LoginPage';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/user?email=${Login.email}`);
        const userData = await userResponse.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (Login.email) {
      fetchUserData();
    }
  }, [Login.email]);


  const logout = () => {
    // Your logout logic here
    console.log('User logged out');
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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

          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Profile;
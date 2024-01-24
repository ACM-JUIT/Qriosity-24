import React, { useEffect } from 'react';
import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, selectCurrentUser } from '../redux/slices/userSlice';
import { fetchProfile } from '../thunks/profileThunk';

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser.user)

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(signOut())
    navigate('/login')
    console.log('User logged out');
  };

  return (
    <div className="profile Container bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <Navbar />
      <div className='userData bg-white rounded-md m-10 p-4 flex flex-col items-center'>
        {currentUser ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Welcome {currentUser.user.name}!!</h1>
            <p>
              <span className="font-bold">Name:</span> {currentUser.user.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {currentUser.user.email}
            </p>
            <p>
              <span className="font-bold">Points:</span> {currentUser.user.points}
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
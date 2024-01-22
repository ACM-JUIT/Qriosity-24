import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';





function Profile() {
  return (
    <div className="profile Container bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <Navbar />
      <div className='userData p-4 mt-20 rounded-xl bg-white w-1/2 mx-auto flex-col items-center justify-center'>
        <h1 className='text-left mb-4'>Welcome, Username!!</h1>
            <p className="text-center mb-4">
                <span className="font-bold">Name:</span> name
            </p>
            <p className="text-center mb-4">
                <span className="font-bold">Email:</span> email@gmail.com
            </p>
            <p className="text-center mb-4">
                <span className="font-bold">Points:</span> 100
            </p>
      </div>
    </div>
  );
}
Profile();

export default Profile;
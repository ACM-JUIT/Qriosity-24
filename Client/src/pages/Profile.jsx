import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';

function Profile() {
  return (
    <div className="profile Container bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <Navbar />
      <div className='userData'>
        
      </div>
    </div>
  );
}

export default Profile;
import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';

function Rules() {
  return (
    <div className="rules bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <LandingNavbar />
      <div className='rulesInfo bg-gray-100 rounded-md m-10 p-4 flex flex-col'>
        <h1 className='text-3xl underline font-bold m-4 mx-auto'> Rules </h1>
        <ul className='rulesData list-decimal m-8'>
            <li>#</li>
            <li>#</li>
            <li>#</li>
            <li>#</li>
        </ul>
      </div>
    </div>
  );
}

export default Rules;
import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';

function AboutUs() {
  return (
    <div className="aboutUs bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <LandingNavbar />
      <div className='aboutUsInfo bg-gray-100 rounded-md m-10 p-4 flex flex-col'>
        <h1 className='text-3xl underline font-bold m-4 mx-auto'> About Us </h1>
        <ul className='aboutUsData list-disc m-8'>
            <li>#</li>
            <li>#</li>
            <li>#</li>
            <li>#</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
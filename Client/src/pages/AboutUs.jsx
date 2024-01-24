import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';

function AboutUs() {
  return (
    <div className="aboutUs bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <LandingNavbar />
      <div className='aboutUsInfo bg-gray-100 rounded-md m-10 p-4 flex flex-col'>
        <h1 className='text-3xl underline font-bold m-4 mx-auto'> About Us </h1>
        <ul className='aboutUsData list-disc m-8'>
        <h2 className='text-3xl underline font-bold m-4 mx-auto'> About ACM-JUIT </h2>
        <p className='text-xl'>
        Welcome to the ACM Student Chapter at Jaypee University of Information Technology (JUIT), where we strive for collaborative excellence in the ever-evolving world of technology. Established in 2014 and headquartered in Solan, Himachal Pradesh, our dynamic community comprises 100+ dedicated members passionate about software development, technology, and innovation. Our chapter is committed to fostering a spirit of teamwork, offering a platform for learning through bootcamps, teaching sessions, and flagship events like Qriosity and Hache. We take pride in organizing competitions and fun activities tailored for freshmen, ensuring a holistic and enjoyable learning experience.
        <br />
        <br />
        At ACM-JUIT, our strength lies in the strong bond among our organizers. Led by teams specializing in Web development, App development, Operations, Public Relations, AI/ML, Competitive Programming, Design, IoT, and Fintech, our collaborative efforts create a vibrant community. Join us on this exciting journey of exploration, skill development, and camaraderie in technology. Explore more about our initiatives and events on our <a href="https://juit.acm.org/" target="_blank" className='font-semibold text-gray-900 underline dark:text-black decoration-sky-500' rel='noopener noreferrer'>website</a>
        </p>
        <br />
        <br />
        <br />
        <h2 className='text-3xl underline font-bold m-4 mx-auto'> About Qriosity 4.0 </h2>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
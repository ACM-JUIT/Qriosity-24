import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';

function AboutUs() {
  return (
    <div className="aboutUs bg-cover bg-center min-h-screen p-4 font-sans" style={{ backgroundImage: 'url("../../public/195750.jpg")'}}>
      <LandingNavbar />
      <div className='aboutUsInfo m-4 h-full w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-800 flex flex-col text-white'>
        <h1 className='text-4xl font-bold m-4 mx-auto'> About Us </h1>
        <ul className='aboutUsData list-disc m-8'>
        <h2 className='text-4xl font-bold m-4 mx-auto'> About Qriosity 4.0 </h2>
        <p className="text-xl p-1">
        ACM JUIT is excited to announce QRIOSITY 4.0, an exclusive online quiz contest designed to challenge your knowledge and logic across various tech domains. Prepare for a thrilling 6-hour competition where you'll race against time, showcasing your ability to think creatively and solve diverse challenges. Harness the power of the internet as you embark on this exhilarating quest for answers. Get ready to dive deep into the realms of tech and let your Qriosity soar!
        </p>
        <br />
        <br />
        <br />
        <h2 className='text-4xl font-bold m-4 mx-auto'> About ACM-JUIT </h2>
        <p className='text-xl p-1'>
        Welcome to the ACM Student Chapter at Jaypee University of Information Technology (JUIT), where we strive for collaborative excellence in the ever-evolving world of technology. Established in 2014 and headquartered in Solan, Himachal Pradesh, our dynamic community comprises 100+ dedicated members passionate about software development, technology, and innovation. Our chapter is committed to fostering a spirit of teamwork, offering a platform for learning through bootcamps, teaching sessions, and flagship events like Qriosity and Hache. We take pride in organizing competitions and fun activities tailored for freshmen, ensuring a holistic and enjoyable learning experience.
        <br />
        <br />
        At ACM-JUIT, our strength lies in the strong bond among our organizers. Led by teams specializing in Web development, App development, Operations, Public Relations, AI/ML, Competitive Programming, Design, IoT, and Fintech, our collaborative efforts create a vibrant community. Join us on this exciting journey of exploration, skill development, and camaraderie in technology. Explore more about our initiatives and events on our <a href="https://juit.acm.org/" target="_blank" className='font-semibold text-blue-500 decoration-sky-500' rel='noopener noreferrer'>website</a>
        </p>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
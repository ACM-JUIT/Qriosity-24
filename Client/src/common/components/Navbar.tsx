import bgimg from '../../../public/download.png';
function Navbar() {
  return (
    <div className="font-montserrat">
      <nav>
        <img src={bgimg} alt="" className='h-28 pt-8 pr-8'/>
              <h1 className='text-white'>nav</h1>
    </nav>
      </div>
  )
}

export default Navbar;
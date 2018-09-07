import React from 'react'
import {Link} from 'react-router-dom'
import '../Header/Header.css'

const Header = () => {
  return(
    <div className='header'>
      <div className='logo'>LOGO</div>
      <div className='links'>
        <Link to='/'><button className='navlink' id='home'>Home</button></Link>
        <Link to='/sales'><button className='navlink'>Sales</button></Link>
        <Link to='/service'><button className='navlink'>Service</button></Link>
        <Link to='/about'><button className='navlink'>About</button></Link>
        <Link to='/contact'><button className='navlink'>Contact Us</button></Link>
      </div>
    </div>
  )
}

export default Header;
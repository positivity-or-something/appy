import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class Home extends Component{

  render(){
    return(
      <div>
        <Link to='/blades'><button className='blades_box'>Mower Blades</button></Link>
        <Link to='/mowers'><button className='mowers_box'>Zero Turn Mowers</button></Link>
        <Link to='/service'><button className='service_box'>Schedule Service</button></Link>
        <div className='carousel'>
        <Carousel
          animationSpeed={2000}
          autoPlay={7000}
          stopAutoPlayOnHover
          centered
          infinite>
          <img className='slide' src='https://media.50below.com/corporate/webdesign/merchslides/Hustler/8b257fb5-52db-4b1b-ac19-312b4ad49642.jpg' />
          <img className='slide' src='https://static.visionamp.org/rubix/20161019/orig_4e906dc57f3965bd31e57df93b5b81002b8d6c93.jpg' />
          <img className='slide' src='https://www.ewipower.com/sites/all/themes/theme321/images/BigDog_0717.jpg' />
        </Carousel>
        </div>
        <iframe className='map' title ='map' src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJBxjFLd7eTYYRxlCnKYHm_xc&key=AIzaSyC_swPRTg8ml90Dbg2Lww89KGsNPQfKUVc"></iframe>
      </div>
    )
  }
}

export default Home;
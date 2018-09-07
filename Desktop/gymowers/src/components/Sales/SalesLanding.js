import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SalesLanding extends Component{


  render(){
    return(
      <div>
        <Link to='/mowers'><div>Mowers</div></Link>
        <Link to='/blades'><div>Blades</div></Link>
      </div>
    )
  }
}

export default SalesLanding;
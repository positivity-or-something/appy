import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Cards.css'

class BladeCards extends Component{

  render(){
  let card = this.props.blades.map((blade, i) => {
    return(
      <div key={i} className='sales_card'>
        <img alt='blade' className='card_image' src={blade.img}></img>
        <Link to={`/details/${blade.product_type}/${blade.product_id}`}> <h4>{blade.title}</h4></Link>
        <p>${blade.price}</p>
      </div>
  )})
    return(
      <div className='sales_card_container'>{card}</div>
    )
  }
}

export default BladeCards;
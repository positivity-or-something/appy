import React, {Component} from 'react'
import './Cards.css'
import {Link} from 'react-router-dom'

class MowerCards extends Component{
  render(){
  let card = this.props.mowers.map((mower, i) =>{
   return(
    <div  key={i} className='sales_card'>
      <img alt='mower' className='card_image' src={mower.img}></img>
     <Link to={`/details/${mower.product_type}/${mower.product_id}`}><h4>{mower.title}</h4></Link>
      <p>${mower.price}</p>
    </div>
  )})
  
    return(
      <div  className='sales_card_container'>{card}</div>
    )
  }
}

export default MowerCards;
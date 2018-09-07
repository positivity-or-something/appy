import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Details.css'
import ReactPlayer from 'react-player'

class Details extends Component{

  render(){
    let deets =''
    if(this.props.match.params.type === "blade"){
      deets = this.props.blades.map(blade => {
        if(blade.product_id === parseInt(this.props.match.params.id, 10)){
          return(
            <div key={blade.product_id} className='details_content'>
              <div className='left_side'>
                <img alt='blade' className='deets_img' src={blade.img}/>
              </div>
              <div className='right_side'>
                <h1>{blade.title}</h1>
                <div className='price'>{blade.price}</div>
                <p className='desc'>{blade.description}</p>
                <button className='cart_button'>Add To Cart</button>
              </div>
            </div>
          )
        }})
    }else if(this.props.match.params.type === "mower"){
      deets = this.props.mowers.map(mower => {
        if(mower.product_id === parseInt(this.props.match.params.id, 10)){
          return(
            <div key={mower.product_id} className='details_content'>
              <div className='left_side'>
                <img alt='mower' className='deets_img' src={mower.img}/>
              </div>
              <div className='right_side'>
                <h1>{mower.title}</h1>
                <div className='price'>{mower.price}</div>
                <p className='desc'>{mower.description}</p>
                <button className='cart_button'>Add To Cart</button>
              </div>              
                {mower.brand === 'Hustler' ? <div className='video'><ReactPlayer url='https://www.youtube.com/watch?v=AYMU9TWWYxM' playing={true}/></div> : null}             
            </div>
          )
        }})
    }
    return(
      <div className='details_page'>
       <div>{deets}</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mowers: state.mowers,
    blades: state.blades
  }
}

export default connect(mapStateToProps)(Details);
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBlades} from '../../ducks/productReducer'
import BladeCards from '../Cards/BladeCards'
import '../Cards/Cards.css'

class BladeSales extends Component{

  componentDidMount(){
    this.props.getBlades()
  }


  render(){
    return(
      <div className='product_container'>
        <BladeCards blades={this.props.blades}/>
      </div>
    )
  }

}

function mapStateToProps(state){
  return{
    blades: state.blades
  }
}

export default connect(mapStateToProps, {getBlades})(BladeSales);
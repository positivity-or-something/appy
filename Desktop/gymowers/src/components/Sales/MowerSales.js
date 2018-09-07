import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMowers} from '../../ducks/productReducer'
import MowerCards from '../Cards/MowerCards'
import '../Cards/Cards.css'

class MowerSales extends Component{

  componentDidMount(){
    this.props.getMowers()
  }

  render(){
    return(
      <div className='product_container'>
        <div ><MowerCards mowers={this.props.mowers}/></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mowers: state.mowers
  }
}

export default connect(mapStateToProps, {getMowers})(MowerSales);
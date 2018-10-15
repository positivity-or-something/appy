import React from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

class Header extends React.Component{

  render(){
    console.log(this.props)
    return (
      <View>
        <Text>Header</Text>
      </View>
    )
  }
}

export default connect(state => state)(Header);
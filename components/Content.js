import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'


class Content extends Component{
  render(){
    console.log(this.props)
    return(
      <View>
        <Text>Content!!</Text>
      </View>
    )
  }
}

export default connect(state => state)(Content)
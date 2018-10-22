import React from 'react'
import {View, Text, StyleSheet, StatusBar} from 'react-native'
import { connect } from 'react-redux'
import { Avatar, Icon, Header } from "react-native-elements"
import NavigationBar from 'react-native-navbar'
import { Actions } from 'react-native-router-flux'

class Profile extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userContent: []
    }
  }

  componentDidMount(){
    let posts = this.props.content.filter(e => e.user_id === this.props.userId)
    this.setState({userContent: posts})
  }


  render(){
    // console.log(this.state)
    // console.log(this.props)
    return (
      <View>
        <Text>Profile</Text>
      </View>
    )
  }
}

export default connect(state => state)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 1,
    marginTop: 10
  }
});

//you have access to the entire current user object on this.props.user
//you have access to all posts by the current user in this.state.userContent
//I commented out the logs on 20 & 21, but they'll give you an idea of what data you have access to if you need anything else.

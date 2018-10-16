import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { connect } from 'react-redux'
import {getUsers} from '../../ducks/reducer'
import {Button, Header} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import LoginButton from '../header/LoginButton'

class Home extends React.Component{

  render(){
    return (
      <View>
        <Header style={styles.header}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'APPY', style: { color: '#fff' } }}
        rightComponent={<LoginButton/>}
        />
        <View style={styles.container}>
          <Text style={styles.text}>Home</Text>
          <Button 
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          title="Content Link" onPress={() => {
            this.props.getUsers()
            Actions.content({postId: 2})
          }}>Content Link</Button>
          <Button 
           buttonStyle={{
            marginTop: 50,
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "700" }}
          title="New Post" onPress={() => {
            Actions.post()
          }}>New Post</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 30
  },
  header:{
    flex: 1
  }
});

export default connect(state => state, {getUsers})(Home);
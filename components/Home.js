import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'

class Home extends React.Component{

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <Button title="Click Me!!" onPress={() => {
          alert('Clicked Button!!')
          Actions.content()
          }}>Click Me!!</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    flex: 1,
    backgroundColor: 'red',
    fontSize: 130
  }
});

export default connect(state => state)(Home);
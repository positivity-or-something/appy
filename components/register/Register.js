import React, { Component } from "react";
<<<<<<< HEAD
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { Actions } from "react-native-router-flux";
=======
import {View, TextInput, StyleSheet, Button, Text} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import axios from 'axios'
import {setUser} from '../../ducks/reducer'

>>>>>>> master

class Register extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: true,
      userName: "Username",
      passWord: "Password",
      firstName: "First Name",
      email: "Email",
      photoUrl: "Need Firebase or S3 for this!!"
    };
  }

  setUser() {
    let body = {
      firstName: this.state.firstName,
      userName: this.state.userName,
      passWord: this.state.passWord,
      email: this.state.email,
      photoUrl: this.state.photoUrl
    };
    axios
      .post(`http://localhost:3001/api/user`, body)
      .then(res => this.props.setUser(res.data[0].id))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <TextInput
          placeholder={this.state.userName}
          onChangeText={text => this.setState({ userName: text })}
        />
        <TextInput
          placeholder={this.state.passWord}
          onChangeText={text => this.setState({ passWord: text })}
        />
        {this.state.currentUser ? (
          <View style="none">
            <Button title="Login" onPress={() => this.setUser()} />
=======
        <TextInput autoCapitalize='none' placeholder={this.state.userName} onChangeText={(text) => this.setState({userName: text})}/>
        <TextInput autoCapitalize='none' placeholder={this.state.passWord} onChangeText={(text) => this.setState({passWord: text})}/>
        {
          this.state.currentUser ?
          <View style='none'>
            <Button title="Login" onPress={() => {
              this.setUser()
              Actions.home()
              }}></Button>
>>>>>>> master
            <Text>First Time Here?</Text>
            <Button
              title="Register"
              onPress={() => this.setState({ currentUser: false })}
            />
            <Button title="Home" onPress={() => Actions.home()}>
              Home
            </Button>
          </View>
<<<<<<< HEAD
        ) : (
          <View style="none">
            <TextInput
              placeholder={this.state.firstName}
              onChangeText={text => this.setState({ firstName: text })}
            />
            <TextInput
              placeholder={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <TextInput placeholder={this.state.photoUrl} />
            <Button title="Submit" onPress={() => this.setUser()} />
=======
          :
          <View style='none'>
            <TextInput placeholder={this.state.firstName} onChangeText={(text) => this.setState({firstName: text})}/>
            <TextInput placeholder={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
            <TextInput placeholder={this.state.photoUrl}/>
            <Button title="Submit" onPress={() => {
              this.setUser()
              Actions.home()}}>
            </Button>
>>>>>>> master
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  state => state,
  { setUser }
)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  condText: {
    flex: 1
  }
});

import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { ImagePicker, Camera, Permissions } from "expo";
import { accessKey, secretKey } from "../../keys";
import { RNS3 } from "react-native-aws3";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: true,
      userName: "Username",
      passWord: "Password",
      firstName: "First Name",
      email: "Email",
      photoUrl: "Need Firebase or S3 for this!!",
      photoName: "",
      photoType: ""
    };

    this.imagePermission = this.imagePermission.bind(this);
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

  async imagePermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      console.log("PERMISSION GRANTED");
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!result.cancelled) {
        const config = {
          keyPrefix: "s3/",
          bucket: "groupprojappy",
          region: "us-east-1",
          accessKey: accessKey,
          secretKey: secretKey,
          successActionStatus: 201
        };
        let file = {
          uri: result.uri,
          name: result.fileName,
          type: "image/png"
        };
        RNS3.put(file, config).then(response =>
          this.setState({ photoUrl: response.body.postResponse.location })
        );
      }
    } else {
      throw new Error("Permissions not granted");
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <TextInput autoCapitalize='none' placeholder={this.state.userName} onChangeText={(text) => this.setState({userName: text})}/>
        <TextInput autoCapitalize='none' placeholder={this.state.passWord} onChangeText={(text) => this.setState({passWord: text})}/>
        {
          this.state.currentUser ?
          <View style='none'>
            <Button title="Login" onPress={() => {
              this.setUser()
              Actions.home()
              }}></Button>
=======
        <TextInput
          autoCapitalize="none"
          placeholder={this.state.userName}
          onChangeText={text => this.setState({ userName: text })}
        />
        <TextInput
          autoCapitalize="none"
          placeholder={this.state.passWord}
          onChangeText={text => this.setState({ passWord: text })}
        />
        {this.state.currentUser ? (
          <View>
            <Button
              title="Login"
              onPress={() => {
                this.setUser();
                Actions.home();
              }}
            />
>>>>>>> master
            <Text>First Time Here?</Text>
            <Button
              title="Register"
              onPress={() => this.setState({ currentUser: false })}
            />
          </View>
<<<<<<< HEAD
          :
          <View style='none'>
            <TextInput placeholder={this.state.firstName} onChangeText={(text) => this.setState({firstName: text})}/>
            <TextInput placeholder={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
            <TextInput placeholder={this.state.photoUrl}/>
            <Button title="Submit" onPress={() => {
              this.setUser()
              Actions.home()}}>
            </Button>
=======
        ) : (
          <View>
            <TextInput
              placeholder={this.state.firstName}
              onChangeText={text => this.setState({ firstName: text })}
            />
            <TextInput
              placeholder={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <TouchableOpacity onPress={this.imagePermission}>
              <Text>Select Image</Text>
            </TouchableOpacity>
            <Button
              title="Submit"
              onPress={() => {
                this.setUser();
                Actions.home();
              }}
            />
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

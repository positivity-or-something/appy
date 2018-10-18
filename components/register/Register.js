import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
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
      photoUrl: "Need Firebase or S3 for this!!"
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
      .post(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/user",
        body
      )
      .then(res => this.props.setUser(res.data[0].id))
      .catch(err => console.log(err));
  }

  async imagePermission(gallery) {
    let result = "";
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA,
      Permissions.AUDIO_RECORDING
    );
    if (status === "granted") {
      if (gallery) {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3]
        });
      } else {
        result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
      }
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
          name: `${this.state.firstName}s pic`,
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
            <Text>First Time Here?</Text>
            <Button
              title="Register"
              onPress={() => this.setState({ currentUser: false })}
            />
          </View>
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
            <Icon onPress={() => this.imagePermission()} name="camera-alt" />
            <Icon onPress={() => this.imagePermission(true)} name="image" />
            <Button
              title="Submit"
              onPress={() => {
                this.setUser();
                Actions.home();
              }}
            />
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

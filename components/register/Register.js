import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Platform
} from "react-native";
import { Icon, CheckBox } from "react-native-elements";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
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
      interests: '',
      motivation: false,
      achievement: false,
      lifestyle: false,
      work: false,
      determination: false,
      inspiration: false,
      positiveVibes: false,
      entrepreneur: false,
      happy: false,
      celebration: false
    };

    this.imagePermission = this.imagePermission.bind(this);
  }

  setUser() {
    let body = {
      firstName: this.state.firstName,
      userName: this.state.userName,
      passWord: this.state.passWord,
      email: this.state.email,
      photoUrl: this.state.photoUrl,
      interests: this.state.interests
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
        let fileNum = Math.random() * 9999
        let file = {
          uri: result.uri,
          name: `${this.state.firstName}s pic ${fileNum}`,
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
    console.log(this.state)
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
            <CheckBox 
              center
              title='Motivation'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.motivation}
              onPress={() => {
              this.setState({motivation: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Motivation`}) 
              : this.setState({interests: `Motivation`})}}/>
              <CheckBox 
              center
              title='Achievement'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.achievement}
              onPress={() => {
                this.setState({achievement: true});
                this.state.interests ? 
                this.setState({interests: `${this.state.interests},Achievement`})
                : this.setState({interests: `Achievement`})}}/>
              <CheckBox 
              center
              title='Lifestyle'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.lifestyle}
              onPress={() => {
              this.setState({lifestyle: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Lifestyle`}) 
              : this.setState({interests: `Lifestyle`})}}/>
              <CheckBox 
              center
              title='Work'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.work}
              onPress={() => {
              this.setState({work: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Work`})
              : this.setState({interests: `Work`})}}/>
              <CheckBox 
              center
              title='Determination'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.determination}
              onPress={() => {
              this.setState({determination: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Determination`}) 
              : this.setState({interests: `Determination`})}}/>
              <CheckBox 
              center
              title='Inspiration'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.inspiration}
              onPress={() => {
              this.setState({inspiration: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Inspiration`})
              : this.setState({interests: `Inspiration`})}}/>
              <CheckBox 
              center
              title='PositiveVibes'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.positiveVibes}
              onPress={() => {
              this.setState({positiveVibes: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},PositiveVibes`}) 
              : this.setState({interests: `PositiveVibes`})}}/>
              <CheckBox 
              center
              title='Entrepreneur'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.entrepreneur}
              onPress={() => {
              this.setState({entrepreneur: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Entrepreneur`})
              : this.setState({interests: `Entrepreneur`})}}/>
               <CheckBox 
              center
              title='Happy'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.happy}
              onPress={() => {
              this.setState({happy: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Happy`}) 
              : this.setState({interests: `Happy`})}}/>
              <CheckBox 
              center
              title='Celebration'
              iconType='material'
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              checked={this.state.celebration}
              onPress={() => {
              this.setState({celebration: true});
              this.state.interests ? 
              this.setState({interests: `${this.state.interests},Celebration`})
              : this.setState({interests: `Celebration`})}}/>
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

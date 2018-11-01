import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
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
      interests: "",
      motivation: false,
      achievement: false,
      lifestyle: false,
      work: false,
      determination: false,
      inspiration: false,
      positiveVibes: false,
      entrepreneur: false,
      happy: false,
      celebration: false,
      fullHeight: Dimensions.get("window").height,
      fullWidth: Dimensions.get("window").width
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
        let fileNum = Math.random() * 9999;
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
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainer}
          autoCapitalize="none"
          placeholder={this.state.userName}
          onChangeText={text => this.setState({ userName: text })}
        />
        <TextInput
          style={styles.inputContainer}
          autoCapitalize="none"
          placeholder={this.state.passWord}
          onChangeText={text => this.setState({ passWord: text })}
        />
        {this.state.currentUser ? (
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setUser();
                Actions.home();
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: "#81DAF5",
                    alignSelf: "center",
                    marginBottom: 15
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {/* <Button
              title="Login"
              onPress={() => {
                this.setUser();
                Actions.home();
              }}
            /> */}
            <Text style={{ fontSize: 22, alignSelf: "center" }}>
              First Time Here?
            </Text>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ currentUser: false })}
            >
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: "#81DAF5",
                    alignSelf: "center",
                    marginTop: 15
                  }}
                >
                  Register
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                style={styles.inputContainer}
                placeholder={this.state.firstName}
                onChangeText={text => this.setState({ firstName: text })}
              />
              <TextInput
                style={styles.inputContainer}
                placeholder={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ padding: 15 }}>
                  <Icon
                    onPress={() => this.imagePermission()}
                    name="camera-alt"
                  />
                </View>
                <View style={{ padding: 15 }}>
                  <Icon
                    onPress={() => this.imagePermission(true)}
                    name="image"
                  />
                </View>
              </View>
            </View>
            <Text style={{alignSelf: 'center', fontSize: 20, textDecorationLine: 'underline'}}>Pick top interests</Text>
            <ScrollView>
              <View
                style={{
                  width: this.state.fullWidth - 40,
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row'
                }}
              >
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Motivation"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.motivation}
                    onPress={() => {
                      this.setState({ motivation: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Motivation`
                          })
                        : this.setState({ interests: `Motivation` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Achievement"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.achievement}
                    onPress={() => {
                      this.setState({ achievement: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Achievement`
                          })
                        : this.setState({ interests: `Achievement` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Lifestyle"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.lifestyle}
                    onPress={() => {
                      this.setState({ lifestyle: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Lifestyle`
                          })
                        : this.setState({ interests: `Lifestyle` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Work"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.work}
                    onPress={() => {
                      this.setState({ work: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Work`
                          })
                        : this.setState({ interests: `Work` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Determination"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.determination}
                    onPress={() => {
                      this.setState({ determination: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Determination`
                          })
                        : this.setState({ interests: `Determination` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Inspiration"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.inspiration}
                    onPress={() => {
                      this.setState({ inspiration: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Inspiration`
                          })
                        : this.setState({ interests: `Inspiration` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#PositiveVibes"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.positiveVibes}
                    onPress={() => {
                      this.setState({ positiveVibes: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},PositiveVibes`
                          })
                        : this.setState({ interests: `PositiveVibes` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Entrepreneur"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.entrepreneur}
                    onPress={() => {
                      this.setState({ entrepreneur: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Entrepreneur`
                          })
                        : this.setState({ interests: `Entrepreneur` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Happy"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.happy}
                    onPress={() => {
                      this.setState({ happy: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Happy`
                          })
                        : this.setState({ interests: `Happy` });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.CheckBox}
                    left
                    title="#Celebration"
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checked={this.state.celebration}
                    onPress={() => {
                      this.setState({ celebration: true });
                      this.state.interests
                        ? this.setState({
                            interests: `${this.state.interests},Celebration`
                          })
                        : this.setState({ interests: `Celebration` });
                    }}
                  />
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setUser();
                    Actions.home();
                  }}
                >
                  <View style={{width: dime.fullWidth - 50}}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: "#81DAF5",
                        alignSelf: 'center',
                        marginTop: 15
                      }}
                    >
                      Submit
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
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

const dime = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80
  },
  condText: {
    flex: 1
  },
  inputContainer: {
    padding: 15,
    fontSize: 22
  },
  touchText: {
    fontSize: 22,
    color: "#81DAF5"
  },
  CheckBox: {
    flex: .5,
    maxWidth: dime.fullWidth * .4,
    minWidth: dime.fullWidth * .4
  }
});

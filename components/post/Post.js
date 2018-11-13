import React, { Component } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Text
} from "react-native";
import { Icon, CheckBox } from "react-native-elements";
import axios from "axios";
import moment from "moment";
import { ImagePicker, Permissions } from "expo";
import { accessKey, secretKey } from "../../keys";
import { RNS3 } from "react-native-aws3";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { updateContent } from "../../ducks/reducer";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      postBody: "Post Body",
      photoUrl: "",
      Motivation: false,
      Achievement: false,
      Lifestyle: false,
      Happy: false,
      Work: false,
      Determination: false,
      Inspiration: false,
      PositiveVibes: false,
      Entrepreneur: false,
      Celebration: false,
      tags: [],
      interest: ""
    };
  }

  post() {
    let body = {
      id: this.props.userId,
      subject: '',
      postBody: this.state.postBody,
      timeStamp: moment(),
      category: "post",
      image: this.state.photoUrl,
      interest: this.state.interest
    };
    axios
      .post(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/post",
        body
      )
      .then(response => this.props.updateContent(response.data))
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
          name: `post pic ${fileNum}`,
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
          style={styles.inputs}
          multiline={true}
          numberOfLines={50}
          placeholder={this.state.postBody}
          onChangeText={text => this.setState({ postBody: text })}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ padding: 15 }}>
            <Icon onPress={() => this.imagePermission()} name="camera-alt" />
          </View>
          <View style={{ padding: 15 }}>
            <Icon onPress={() => this.imagePermission(true)} name="image" />
          </View>
        </View>
        <ScrollView>
              <View
                style={{
                  width: dime.fullWidth - 40,
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: "space-between"
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
              </View>
            </ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            this.post();
            Actions.home();
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 22,
                color: "#81DAF5",
                alignSelf: "center",
                marginTop: 10
              }}
            >
              Submit Post
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default connect(
  state => state,
  { updateContent }
)(Post);

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
    justifyContent: "center"
  },
  sideBySide: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputs: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 15,
    height: 300,
    width: dime.fullWidth - 5
  },
  CheckBox: {
    flex: .5,
    maxWidth: dime.fullWidth * .4,
    minWidth: dime.fullWidth * .4
  }
});

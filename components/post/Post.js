import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Platform } from "react-native";
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
      subject: "Subject",
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
      subject: this.state.subject,
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
      <View>
        <CheckBox
          center
          title="Motivation"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.motivation}
          onPress={() => {
            this.setState({ motivation: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Motivation`
                })
              : this.setState({ interest: `Motivation` });
          }}
        />
        <CheckBox
          center
          title="Achievement"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.achievement}
          onPress={() => {
            this.setState({ achievement: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Achievement`
                })
              : this.setState({ interest: `Achievement` });
          }}
        />
        <CheckBox
          center
          title="Lifestyle"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.lifestyle}
          onPress={() => {
            this.setState({ lifestyle: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Lifestyle`
                })
              : this.setState({ interest: `Lifestyle` });
          }}
        />
        <CheckBox
          center
          title="Work"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.work}
          onPress={() => {
            this.setState({ work: true });
            this.state.interest
              ? this.setState({ interest: `${this.state.interest},Work` })
              : this.setState({ interest: `Work` });
          }}
        />
        <CheckBox
          center
          title="Determination"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.determination}
          onPress={() => {
            this.setState({ determination: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Determination`
                })
              : this.setState({ interest: `Determination` });
          }}
        />
        <CheckBox
          center
          title="Inspiration"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.inspiration}
          onPress={() => {
            this.setState({ inspiration: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Inspiration`
                })
              : this.setState({ interest: `Inspiration` });
          }}
        />
        <CheckBox
          center
          title="PositiveVibes"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.positiveVibes}
          onPress={() => {
            this.setState({ positiveVibes: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},PositiveVibes`
                })
              : this.setState({ interest: `PositiveVibes` });
          }}
        />
        <CheckBox
          center
          title="Entrepreneur"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.entrepreneur}
          onPress={() => {
            this.setState({ entrepreneur: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Entrepreneur`
                })
              : this.setState({ interest: `Entrepreneur` });
          }}
        />
        <CheckBox
          center
          title="Happy"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.happy}
          onPress={() => {
            this.setState({ happy: true });
            this.state.interest
              ? this.setState({ interest: `${this.state.interest},Happy` })
              : this.setState({ interest: `Happy` });
          }}
        />
        <CheckBox
          center
          title="Celebration"
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={this.state.celebration}
          onPress={() => {
            this.setState({ celebration: true });
            this.state.interest
              ? this.setState({
                  interest: `${this.state.interest},Celebration`
                })
              : this.setState({ interest: `Celebration` });
          }}
        />
      </View>
        <TextInput
          placeholder={this.state.subject}
          onChangeText={text => this.setState({ subject: text })}
        />
        <TextInput
          placeholder={this.state.postBody}
          onChangeText={text => this.setState({ postBody: text })}
        />
        <Icon onPress={() => this.imagePermission()} name="camera-alt" />
        <Icon onPress={() => this.imagePermission(true)} name="image" />
        <Button
          onPress={() => {
            this.post();
            Actions.home();
          }}
          title="Submit Post"
        />
      </View>
    );
  }
}

export default connect(
  state => state,
  { updateContent }
)(Post);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

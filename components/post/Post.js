import React, { Component } from "react";
import {View, TextInput, Button, StyleSheet, Platform} from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import moment from 'moment'
import { ImagePicker, Permissions } from "expo";
import { accessKey, secretKey } from "../../keys";
import { RNS3 } from "react-native-aws3";
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { updateContent } from '../../ducks/reducer'

class Post extends Component {
  constructor() {
    super();
    this.state = {
      subject: 'Subject',
      postBody: 'Post Body',
      photoUrl: ''
    };
  }

post(){
  let body = {
    id: this.props.userId,
    subject: this.state.subject,
    postBody: this.state.postBody,
    timeStamp: moment(),
    category: 'post',
    image: this.state.photoUrl
  }
  axios.post('http://' + (Platform.OS === 'ios' ? 'localhost' : '172.31.98.128') + ':3001/api/post', body)
  .then((response) => this.props.updateContent(response.data))
  .catch(err => console.log(err))
}

async imagePermission(gallery) {
  let result = ''
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA, Permissions.AUDIO_RECORDING);
  if (status === "granted") {
    if(gallery){
       result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] });
    }else{
       result = await ImagePicker.launchCameraAsync({allowsEditing: true})
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
        name: `${this.state.firstName}s post pic`,
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
        <TextInput placeholder={this.state.subject} onChangeText={(text) => this.setState({subject: text})}/>
        <TextInput placeholder={this.state.postBody} onChangeText={(text) => this.setState({postBody: text})}/>
        <Icon onPress={() => this.imagePermission()} name='camera-alt'/>
        <Icon onPress={() => this.imagePermission(true)} name='image'/>  
        <Button onPress={() => {
          this.post()
          Actions.home()}} title="Submit Post"></Button>
      </View>
    );
  }
}

export default connect(state => state, { updateContent })(Post)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
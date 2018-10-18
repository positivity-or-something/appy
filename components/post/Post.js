import React, { Component } from "react";
import {View, TextInput, Button, StyleSheet} from 'react-native'
import axios from 'axios'
import moment from 'moment'

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      subject: 'Subject',
      postBody: 'Post Body'
    };
  }

post(){
  let body = {
    id: this.props.userId,
    subject: this.state.subject,
    postBody: this.state.postBody,
    timeStamp: moment(),
    category: 'post'
  }
  axios.post('http://localhost:3001/api/post', body)
  .then((response) => console.log(response))
  .catch(err => console.log(err))
}

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder={this.state.subject} onChangeText={(text) => this.setState({subject: text})}/>
        <TextInput placeholder={this.state.postBody} onChangeText={(text) => this.setState({postBody: text})}/>
        <Button onPress={() => this.post()} title="Submit Post"></Button>
      </View>
    );
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
  }
});
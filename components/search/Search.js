import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text,
  Alert
} from "react-native";
import axios from "axios";
import { Modal } from "react-native-router-flux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      words: " "
    };
    this.handleWords = this.handleWords.bind(this);
  }
  componentDidMount = () => {};

  handleWords(e) {
    this.setState({ words: e });
  }
  render() {
    // console.warn(this.state);
    let show = this.state.post.map((e, i) => {
      // setTimeout(function() {
      if (!this.state.post[0]) {
        return <Test>Alert.alert("No search match")</Test>;
      }
      //     Alert.alert("No search match.");
      // }, 5000);

      return <Text key={i}>{e.body}</Text>;
    });

    return (
      <View style={{ width: 250, height: 25, backgroundColor: "gray" }}>
        <TextInput
          onChangeText={text => {
            text.length > 0 ? this.props.handleAll(text) : this.props.hideSearch();
          }}
          type="text"
          fontSize={20}
          color="white"
          // value={this.state.post}
        />

        <Text>{show}</Text>
      </View>
    );
  }
}

export default Search;

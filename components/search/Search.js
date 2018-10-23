import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text
} from "react-native";
import axios from "axios";

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

  handleAll(text) {
    // let search1 = {
    //   { text }
    // };
    axios
      .post(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/words",
        { text }
      )
      .then(response => {
        // console.log(response);
        this.setState({ post: response.data });
      });
  }

  handleWords(e) {
    this.setState({ words: e });
  }
  render() {
    // console.warn(this.state);
    let show = this.state.post.map((e, i) => {
      return <Text key={i}>{e.body}</Text>;
    });

    return (
      <View style={{width: 250, height: 25, backgroundColor: 'red'}}>
        <TextInput
          onChangeText={text => {
            text.length > 0 ?
            this.handleAll(text)
            :this.props.hideSearch()
          }}
          type="text"
          // value={this.state.post}
        />
        {/* <Button
          title="search"
          onPress={() => {
            this.handleAll(this.state.words);
          }}
        > */}

        {/* </Button> */}
        <Text>{show}</Text>
      </View>
    );
  }
}

export default Search;

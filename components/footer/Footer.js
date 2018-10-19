import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon } from "react-native-elements";

class footer extends Component {
  onButtonPress = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };
  render() {
    return (
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-end",
          backgroundColor: "orange",
          borderColor: "black"
        }}
      >
        <Icon name="home" onPress={() => Actions.home()} />
        <Icon name="person" onPress={this.onButtonPress} />
        <Icon name="comment" onPress={() => Actions.post()} />
      </View>
    );
  }
}

export default footer;

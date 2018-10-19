import React, { Component } from "react";
import { Platform, StyleSheet, View, Text, Image, Button } from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon } from "react-native-elements";

class footer extends Component {
  render() {
    return (
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "yellow",
          borderColor: "black"
        }}
      >
        <Icon name="home" onPress={() => Actions.home()} />
        <Icon name="person" />
        <Icon name="comment" onPress={() => Actions.post()} />
      </View>
    );
  }
}

export default footer;

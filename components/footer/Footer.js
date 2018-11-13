import React, { Component } from "react";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon } from "react-native-elements";

class footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: 40,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-end",
          backgroundColor: "#81DAF5",
          borderColor: "black",
          paddingBottom: 8
        }}
      >
        <Icon color='white' name="home" onPress={() => Actions.home()} />
        <Icon
          color='white'
          name="sentiment-satisfied"
          onPress={() => this.props.toggleModal()}
        />
        <Icon color='white' name="create" onPress={() => Actions.post()} />
      </View>
    );
  }
}

export default footer;

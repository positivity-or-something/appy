import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";

class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Icon name="photo_camera" />
        <Text style={{ fontSize: 30, fontFamily }}>Appy</Text>
        <Icon name="person_add" />
        <Icon name="vertical_align_top" />
      </View>
    );
  }
}

export default connect(state => state)(Header);

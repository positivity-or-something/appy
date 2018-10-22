import React, { Component } from "react";
import { Button, CheckBox } from "react-native-elements";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";

import axios from "axios";
class RadB extends Component {
  constructor() {
    super();
    this.state = {
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
  sendTags() {
    let tags = {
      all: this.state.interest
    };

    axios
      .post(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/words",
        tags
      )
      .then(response => {
        console.log(response);
        this.setState({ tags: response.data });
      });
  }
  render() {
    return (
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
        <Button
          onPress={() => Actions.post({ interest: this.state.interest })}
        />
      </View>
    );
  }
}
export default RadB;

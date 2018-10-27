import React from "react";
import { Button, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { fonts } from "../styles/styles";

const LoginButton = () => {
  return (
    <Button
      style={styles.button}
      backgroundColor="transparent"
      color="white"
      title="Login"
      onPress={() => Actions.register()}
    >
      Login
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlignVertical: "bottom",
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 18
  }
});

export default LoginButton;
